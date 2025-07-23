import React, { useState } from 'react'
import { HiOutlineStar, HiStar, HiArrowLeft } from "react-icons/hi"
import { Link } from 'react-router'

const Rewiev = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rating: 0,
    comment: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

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
      console.log('Form gönderildi:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link 
            to="/menu" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Menüye Dön</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Başlık */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Değerlendirmenizi Paylaşın</h1>
            <p className="text-gray-600">Deneyiminiz bizim için değerli</p>
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
                  İsim
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? 'border-red-300' : 'border-gray-200'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                  placeholder="İsminizi girin"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soyisim
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? 'border-red-300' : 'border-gray-200'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                  placeholder="Soyisminizi girin"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200`}
                placeholder="E-posta adresinizi girin"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yorumunuz (Opsiyonel)
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Deneyiminizi paylaşın..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all active:scale-[0.99] text-sm"
            >
              Değerlendirmeyi Gönder
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Bilgileriniz gizli tutulacak ve yalnızca hizmet kalitemizi artırmak için kullanılacaktır.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Rewiev