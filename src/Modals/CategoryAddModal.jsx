import React from "react";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";
import FileInput from "../Components/FileInput";
import { FaSave } from "react-icons/fa";

const CategoryAddModal = ({ setIsOpen }) => {
  return (
    <div className="p-4 max-w-2xl w-full bg-white rounded-md flex flex-col items-start justify-start gap-4">
      <h1 className="text-2xl font-bold">Kategori Ekle</h1>
      <div className="w-full flex flex-col items-center justify-between gap-4">
        <div className="w-full flex flex-col items-center justify-start gap-2">
          <InputComp
            label="Kategori Adı"
            type="text"
            id="title"
            className="w-full p-2 rounded-md border border-gray-300"
          />
          <FileInput
            label="Kategori Resmi"
            type="file"
            id="image"
            className="w-full p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="w-full flex items-center justify-end">
          <Button
            className={"flex items-center justify-center gap-2"}
            onClick={() => setIsOpen(false)}
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
