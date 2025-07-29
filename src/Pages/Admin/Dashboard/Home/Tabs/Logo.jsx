import React, { useEffect, useState } from "react";
import Button from "../../../../../Components/Button";
import { CiImageOn } from "react-icons/ci";
import { Toaster, toast } from "react-hot-toast";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import FileInput from "../../../../../Components/FileInput";

const Logo = ({ data }) => {

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleSave = () => {
    if (!logo) {
      toast.error("Logo seçilmedi");
      return;
    }
    const formData = new FormData();
    formData.append("action", "update_landing_image");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", localStorage.getItem("adminLang"));
    formData.append("logo", logo);

    fetch(`${import.meta.env.VITE_API_URL}Api/Landing.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success("Logo başarıyla güncellendi");
        } else {
          toast.error("Bir hata oluştu");
        }
      })
      .catch(() => toast.error("Bir hata oluştu"));
  };

  return (
    <div className="w-full  mx-auto flex flex-col items-start justify-start gap-8">
      <Toaster position="top-right" />

      
      <FileInput
        logo={logo}
        setLogo={setLogo}
        preview={preview}
        setPreview={setPreview}
        data={data}
       
      />

      <div className="w-full flex items-center justify-end gap-3">
        <Button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium"
        >
          <MdCloudUpload className="text-xl" />
          Logoyu Kaydet
        </Button>
      </div>
    </div>
  );
};

export default Logo;
