import React, { useEffect, useState } from "react";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";
import FileInput from "../Components/FileInput";
import { FaSave } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const CategoryAddModal = ({ data, setIsOpen, getCategories }) => {
  
  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("action", isEdit ? "update_category" : "create_category");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", localStorage.getItem("adminLang"));
    formData.append("title", title);
    if(!logo.toString().includes("uploads/category_images")){
      formData.append("image", logo);
    }
    if(isEdit){
      formData.append("id", data.id);
      

    }
    fetch(`${import.meta.env.VITE_API_URL}Api/Category.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status == 200){
          toast.success(data.message);
          setIsOpen(false);
          getCategories();
        }else{
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(data.id != null){
      setIsEdit(true);
    }
    if(data){

      setTitle(data.title);
      setLogo(data.image);
      setPreview(import.meta.env.VITE_API_URL+"Api/" + data.image);
    }
  }, [data]);

  return (
    <div className="p-4 max-w-2xl w-full bg-white rounded-md flex flex-col items-start justify-start gap-4">
      <Toaster />
      <h1 className="text-2xl font-bold">Kategori Ekle</h1>
      <div className="w-full flex flex-col items-center justify-between gap-4">
        <div className="w-full flex flex-col items-center justify-start gap-2">
          <InputComp
            label="Kategori Adı"
            type="text"
            id="title"
            className="w-full p-2 rounded-md border border-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FileInput
            logo={logo}
            setLogo={setLogo}
            preview={preview}
            setPreview={setPreview}
            data={data}
          />
        </div>
        <div className="w-full flex items-center justify-end">
          <Button
            className={"flex items-center justify-center gap-2"}
            onClick={()=>{
              handleSave();
            }}
          >
            <FaSave />
            <span>Kaydet</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddModal;
