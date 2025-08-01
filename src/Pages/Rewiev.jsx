import React, { useState ,useEffect} from 'react'
import { HiOutlineStar, HiStar, HiArrowLeft } from "react-icons/hi"
import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import { Toaster,toast } from 'react-hot-toast';

const Rewiev = () => {
  const langCode = useSelector((state) => state.lang.langCode);


  const [translation, setTranslation] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});


  useEffect(()=>{

    const formdata = new FormData();
    formdata.append("action","get_review_translation");
    formdata.append("langCode",langCode);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`,{
      method:"POST",
      body:formdata
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status == 200){
        console.log(data.data[0])
        setTranslation(data.data[0]);
      }
    })


  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'İsim gerekli';
    if (!formData.lastName.trim()) newErrors.lastName = 'Soyisim gerekli';
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    if (!formData.rating) newErrors.rating = 'Lütfen puan verin';

    if (Object.keys(newErrors).length === 0) {
      const formdata = new FormData();
      formdata.append("action","add_review");
      formdata.append("name",formData.firstName);
      formdata.append("surname",formData.lastName);
      formdata.append("mail",formData.email);
      formdata.append("comment",formData.comment);
      formdata.append("rating",formData.rating);
      fetch(`${import.meta.env.VITE_API_URL}Api/General.php`,{
        method:"POST",
        body:formdata
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.status == 200){
          toast.success(data.message);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            rating: 0,
            comment: ''
          });
        }else{
          toast.error(data.message);
        }
      })
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster/>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link 
            to="/menu" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span></span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Başlık */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{
              translation && translation.title ? translation.title : "Değerlendirmenizi Paylaşın"
            }</h1>
            <p className="text-gray-600">{
              translation && translation.subtitle ? translation.subtitle : "Deneyiminiz bizim için değerli"
            }</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Yıldızlar */}
            <div className="space-y-2">
              <div className="flex justify-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, rating: star }));
                      if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
                    }}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    {star <= (hoverRating || formData.rating) ? (
                      <HiStar className="w-10 h-10 text-yellow-400" />
                    ) : (
                      <HiOutlineStar className="w-10 h-10 text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm text-center">{errors.rating}</p>
              )}
            </div>

            {/* Form Alanları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {
                    translation && translation.name ? translation.name : "İsim"
                  }
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? 'border-red-300' : 'border-gray-200'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                  placeholder={
                    translation && translation.name ? translation.name : "İsminizi girin"
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {
                    translation && translation.surname ? translation.surname : "Soyisim"
                  }
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? 'border-red-300' : 'border-gray-200'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                  placeholder={
                    translation && translation.surname ? translation.surname : "Soyisminizi girin"
                  }
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {
                  translation && translation.mail ? translation.mail : "E-posta"
                }
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                placeholder={
                  translation && translation.mail ? translation.mail : "E-posta adresinizi girin"
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {
                  translation && translation.comment ? translation.comment : "Yorumunuz (Opsiyonel)"
                }
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder={
                  translation && translation.comment ? translation.comment : "Deneyiminizi paylaşın..."
                }
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all active:scale-[0.99] text-sm"
            >
                {
                  translation && translation.button ? translation.button : "Değerlendirmeyi Gönder"
                }
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            {
              translation && translation.security ? translation.security : "Bilgileriniz gizli tutulacak ve yalnızca hizmet kalitemizi artırmak için kullanılacaktır."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Rewiev