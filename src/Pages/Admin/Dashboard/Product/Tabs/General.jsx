import React, { useEffect, useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import TextAreaCom from "../../../../../Components/TextAreaCom";
import { useSelector } from "react-redux";
const General = ({ product, setProduct }) => {

  const adminLang = useSelector((state) => state.adminLang.lang);


  useEffect(() => {
    const formData = new FormData();
    formData.append("action", "get_categories");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", adminLang);
    fetch(`${import.meta.env.VITE_API_URL}Api/Category.php`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status == 200){
        setCategories(data.data);
      }
    })
  }, []);

  const [categories, setCategories] = useState([]);


  return (
    <div className="flex flex-col gap-4 w-full">
  
      <InputComp
        label="Ürün Adı"
        type="text"
        value={product?.title || ""}
        onChange={(e)=>setProduct((prev)=>({...prev,title:e.target.value}))}
        placeholder="Ürün adını giriniz"
      />
      <TextAreaCom
        label="Ürün Açıklaması"
        value={product?.description || ""}
        onChange={(e)=>setProduct((prev)=>({...prev,description:e.target.value}))}
        placeholder="Ürün açıklamasını giriniz"
      />

      <select className="w-full border border-gray-300 p-2 rounded-md" onChange={(e)=>setProduct((prev)=>({...prev,categoryId:e.target.value}))}>
        <option value="">Kategori seçiniz</option>
        {categories.map((category)=>(
          <option key={category.id} value={category.title}>{category.title}</option>
        ))}
      </select>

      <InputComp
        label="Ürün Fiyatı"
        type="number"
        value={product?.price || ""}
        onChange={(e)=>setProduct((prev)=>({...prev,price:e.target.value}))}
        placeholder="Ürün fiyatını giriniz"
      />
      <InputComp
        label="Hazırlanma Süresi"
        type="number"
        value={product?.time || ""}
        onChange={(e)=>setProduct((prev)=>({...prev,time:e.target.value}))}
        placeholder="Hazırlanma süresini giriniz"
      />

      
      
    </div>
  );
};

export default General;
