import React, { useState } from 'react';
import Button from '../../../../Components/Button';
import Table from '../../../../Components/Table';
import Modal from '../../../../Components/Modal';
import { languageData } from '../../../../MockData/Datas';
import LanguageModal from '../../../../Modals/LanguageModal';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Language = () => {
  const [languages, setLanguages] = useState(languageData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);

 
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "code", render: (row) => row.code },
    { header: "name", render: (row) => row.name },
    { header: "isDefault", render: (row) => row.isDefault == true ? <FaCheck className="text-green-500" size={20} /> : <ImCross className="text-red-500" size={20} /> },
  ];

  const deleteAction = (id) => {
    console.log(id);
  };
  const editAction = (id) => {
    console.log(id);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dil Yönetimi</h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600"
        >
          Yeni Dil Ekle
        </Button>
      </div>

      <Table
          data={languages}
          column={columns}
          editAction={editAction}
          deleteAction={deleteAction}
        />

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <LanguageModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          
        
        />
      </Modal>
    </div>
  );
};




export default Language;