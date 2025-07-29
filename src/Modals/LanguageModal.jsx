import React, { useEffect, useState } from "react";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";
import { toast, Toaster } from "react-hot-toast";
import Switch from "../Components/Switch";
const LanguageModal = ({
  isOpen,
  setIsOpen,

  data,
  getLanguages,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (data) {
      setIsEdit(true);
      setCode(data.code);
      setName(data.name);
      setIsActive(data.isActive == 1 ? true : false);
    }
  }, [data]);

  useEffect(() => {
   if(Object.keys(data).length == 0){
    setIsEdit(false);
   }
  }, [data]);

  const handleSubmit = () => {
    console.log(isActive);
    const formData = new FormData();
    formData.append("action", isEdit ? "update_language" : "create_language");
    formData.append("token", localStorage.getItem("token"));
    formData.append("code", code);
    formData.append("name", name);
    formData.append("isActive", isActive ? 1 : 0);
    if (isEdit) {
      formData.append("id", data.id);
    }

    fetch(`${import.meta.env.VITE_API_URL}Api/Language.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          getLanguages();
          toast.success(data.message);
          setIsOpen(false);
          setIsEdit(false);
          setCode("");
          setName("");
          setIsActive(false);
        } else {
          toast.error(data.message);
          setIsEdit(false);
        }
      });
  };

  return (
    <div className="w-full h-full flex items-start justify-start flex-col gap-4 bg-white rounded-lg p-4">
      <Toaster />
      <h1 className="text-2xl font-bold w-full border-b border-black pb-4 ">
        {isEdit ? "Dil Güncelle" : "Dil Ekle"}
      </h1>
      <div className="w-full flex items-center justify-start gap-2">
        <InputComp
          label="Dil Kodu"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="tr, en, de, fr..."
          required
        />
      </div>
      <div className="w-full flex items-center justify-start gap-2">
        <InputComp
          label="Dil Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Türkçe, English, Deutsch..."
          required
        />
      </div>
      <div className="w-full flex items-center justify-start gap-2">
        <Switch value={isActive} setValue={setIsActive} />
      </div>
      <div className="w-full flex items-center justify-end gap-2 mt-4">
        <Button
          type="button"
          onClick={() => setIsOpen(false)}
          className="bg-gray-500 hover:bg-gray-600"
        >
          İptal
        </Button>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          {isEdit ? "Güncelle" : "Ekle"}
        </Button>
      </div>
    </div>
  );
};

export default LanguageModal;
