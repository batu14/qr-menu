import React, { useEffect, useState } from "react";
import Message from "../../../../Components/Message";
import { FaPlus } from "react-icons/fa";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/Modal";
import SocialModal from "../../../../Modals/SocialModal";
import Table from "../../../../Components/Table";
import { toast, Toaster } from "react-hot-toast";

const Social = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialData, setSocialData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "name", render: (row) => row.name },
    { header: "link", render: (row) => row.link },
  ];

  const getSocials = () => {
    const formData = new FormData();
    formData.append("action", "get_socials");
    formData.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setSocialData(data.data);
        }
      });
  };

  useEffect(() => {
    
    getSocials();
  }, []);

  useEffect(() => {
    if(isEdit){
      setSelectedSocial(null);
      setIsEdit(false);
    }
  }, [isOpen]);

  const deleteAction = (row) => {
    const formData = new FormData();
    formData.append("action", "delete_social");
    formData.append("token", localStorage.getItem("token"));
    formData.append("id", row.id);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          getSocials();
        }else{
          toast.error(data.message);
        }
      });
  };
  const editAction = (row) => {
    setSelectedSocial(row);
    setIsEdit(true);
    setIsOpen(true);
    
  };

  return (
    <div className="w-full flex-col h-screen flex items-start justify-start gap-4 ml-4">
      <Toaster />
      <div className="w-full flex items-center justify-end">
        <Button onClick={() => setIsOpen(true)}>
          <FaPlus />
          Yeni Ekle
        </Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SocialModal
          getSocials={getSocials}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedSocial={selectedSocial}
        />
      </Modal>
      <div className="w-full flex items-start justify-start">
        <Table
          links={["link"]}
          data={socialData}
          column={columns}
          deleteAction={deleteAction}
          editAction={editAction}
        />
      </div>
    </div>
  );
};

export default Social;
