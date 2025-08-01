import React from "react";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";
const Home = () => {

  const [data, setData] = useState(null);

  const getData =()=>{
    const formData = new FormData();
    formData.append("action", "get_data");    
    fetch(`${import.meta.env.VITE_API_URL}Api/Landing.php`, {
      method: "POST",
      body: formData,
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.data[0])
      setData(data.data[0])
    })
  }

  useEffect(()=>{
    getData();
  },[])

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div
          style={{
            backgroundImage: `url(${import.meta.env.VITE_API_URL+'Api/' + data?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-32 h-32 bg-white border-2 border-gray-200 rounded-3xl flex items-center justify-center shadow-lg">
            <div className="text-gray-800 text-4xl font-bold">
             {data && data.image == null && <div className="text-gray-800 text-4xl font-bold">{data.title.charAt(0)}</div>}
            </div>
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {data && data.title}
          </h1>
        </div>

        {/* Menü Butonu */}
        <div className="pt-4">
          <button
            onClick={() => navigate("/menu")}
            className="max-w-sm mx-auto bg-gray-900 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            {data && data.link}
          </button>
        </div>

        {/* Alt Bilgi */}
        <div className="pt-8 space-y-2">
          <p className="text-sm text-gray-500">
            📍 {data && data.location}
          </p>
          <p className="text-sm text-gray-500">📞 {data && data.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
