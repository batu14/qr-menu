import React, { useState } from "react";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";

const LanguageModal = ({
  isOpen,
  setIsOpen,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
  });

  return (
    <div className="w-full h-full flex items-start justify-start flex-col gap-4 bg-white rounded-lg p-4">
      <h1 className="text-2xl font-bold w-full border-b border-black pb-4 ">
        Dil Ekle
      </h1>
      <div className="w-full flex items-center justify-start gap-2">
        <InputComp
          label="Dil Kodu"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          placeholder="tr, en, de, fr..."
          required
        />
      </div>
      <div className="w-full flex items-center justify-start gap-2">
        <InputComp
          label="Dil Adı"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Türkçe, English, Deutsch..."
          required
        />
      </div>
      <div className="w-full flex items-center justify-end gap-2 mt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600"
        >
          İptal
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          {initialData ? "Güncelle" : "Ekle"}
        </Button>
      </div>
    </div>
  );
};

export default LanguageModal;
