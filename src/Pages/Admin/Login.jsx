import React, { useState, useEffect } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../Reducers/AuthReducer";

// Giriş işlemi için API çağrısı
const loginUser = async (formData) => {
  const formdata = new FormData();
  formdata.append("name", formData.name);
  formdata.append("password", formData.password);
  formdata.append("action", "login");

  const response = await fetch(import.meta.env.VITE_API_URL + "Auth.php", {
    method: "POST",
    body: formdata,
  });

  const data = await response.json(); // JSON yanıtı al

  if (!response.ok || data.status === 400) {
    throw new Error(data.message || "Giriş başarısız");
  }

  return data;
};


// const isSetup =  () => {
//   const formdata = new FormData();
//   formdata.append("action", "setup");
//   fetch(import.meta.env.VITE_API_URL + "Api/Dbmanager.php",{
//     method: "POST",
//     body: formdata
//   }).then(res => res.json()).then(data => {
//     if(data.status === 1){
//       return true;
//     }else{
//       return false;
//     }
//   })
// }






const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setToken(data.token));
      navigate("/dashboard/home"); 

    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.password) {
      toast.error("Tüm alanları doldurun.");
      return;
    }
    mutation.mutate(formData);
  };

  // useEffect(() => {
  //   isSetup()
  // }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster position="bottom-center" />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-white">L</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Yönetici Girişi</h2>
          <p className="text-sm text-gray-500">
            Lezzet Durağı yönetim paneline hoş geldiniz
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                placeholder="Kullanıcı Adı"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                ) : (
                  <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={mutation.isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {mutation.isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
