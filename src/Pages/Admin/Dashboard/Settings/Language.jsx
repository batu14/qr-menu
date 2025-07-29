import React, { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import Table from "../../../../Components/Table";
import Modal from "../../../../Components/Modal";
import LanguageModal from "../../../../Modals/LanguageModal";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Toaster, toast  } from "react-hot-toast";

const Language = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [languages, setLanguages] = useState([]);

  const getLanguages = () => {
    const formData = new FormData();
    formData.append("action", "get_languages");
    formData.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}Api/Language.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLanguages();
  }, []);

  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "code", render: (row) => row.code },
    { header: "name", render: (row) => row.name },
    {
      header: "Aktif",
      render: (row) =>
        row.isActive == true ? (
          <FaCheck
            
            className="text-green-500"
            size={20}
          />
        ) : (
          <ImCross
           
            className="text-red-500"
            size={20}
          />
        ),
    },
  ];

  useEffect(() => {
    if(isModalOpen == false){
      setSelectedLanguage(null);
    }
  }, [isModalOpen]);

  const deleteAction = (row) => {
    const formData = new FormData();
    formData.append("action", "delete_language");
    formData.append("token", localStorage.getItem("token"));
    formData.append("id", row.id);
    fetch(`${import.meta.env.VITE_API_URL}Api/Language.php`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status == 200){
        toast.success(data.message);
        getLanguages();
      }else{
        toast.error(data.message);
      }
    })
  };
  const editAction = (row) => {
    setSelectedLanguage(row);
    setIsModalOpen(true);
  };

  const changeActive = (id) => {
    console.log(id);
  };

  return (
    <div className="p-6 w-full">
      <Toaster></Toaster>
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

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <LanguageModal
          getLanguages={getLanguages}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          data={selectedLanguage || {}}
        />
      </Modal>
    </div>
  );
};

export default Language;
