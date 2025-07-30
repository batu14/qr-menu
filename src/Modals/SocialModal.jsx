import React, { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";
import { toast, Toaster } from "react-hot-toast";

const SocialModal = ({ isOpen, setIsOpen, isEdit, setIsEdit, selectedSocial, getSocials }) => {
  const [socials, setSocials] = useState([
    "facebook",
    "instagram",
    "x",
    "youtube",
    "tiktok",
    "linkedin",
    "pinterest",
    "snapchat",
    "reddit",
    "telegram",
    "whatsapp",
  ]);

  const [name, setName] = useState("");
  const [socialLink, setSocialLink] = useState("");

  useEffect(() => {
    
    if(isEdit){
      setSocialLink(selectedSocial.link);
      getSocials();
      
    }
  }, [isEdit]);


  const handleSubmit = () => {

    if(!socialLink.toString().includes('https')){
      toast.error("Lütfen geçerli bir link giriniz");
      return;
    }

    if(!name){
      toast.error("Lütfen bir sosyal medya seçiniz");
      return;
    }

    const formData = new FormData();
    formData.append("action", isEdit ? "update_social" : "add_social");
    formData.append("token", localStorage.getItem("token"));
    formData.append("name", name.value);
    formData.append("link", socialLink);
    formData.append("id", isEdit ? selectedSocial.id : null);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          setIsOpen(false);
          getSocials();
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <div>
      <div className="w-full h-full flex items-start  justify-start flex-col gap-4 bg-white rounded-lg p-4">
        <Toaster />
        <h1 className="text-2xl font-bold w-full border-b border-black pb-4 ">
          Sosyal Medya
        </h1>
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <Dropdown
            className="w-full"
            options={socials.map((social) => ({
              label: social,
              value: social,
            }))}
            selectedOption={name}
            onSelect={setName}
          />
          <InputComp
            label="Sosyal Medya Linki"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
          />
          <div className="w-full flex items-center justify-end">
            <Button onClick={handleSubmit}>{isEdit ? "Güncelle" : "Ekle"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
