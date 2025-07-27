import React, { useState } from "react";
import Message from "../../../../Components/Message";
import { FaPlus } from "react-icons/fa";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/Modal";
import SocialModal from "../../../../Modals/SocialModal";
import Table from "../../../../Components/Table";
import { socialData } from "../../../../MockData/Datas";

const Social = () => {
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "image", render: (row) => row.image },
    { header: "link", render: (row) => row.link },
  ];

  const deleteAction = (id) => {
    console.log(id);
  };
  const editAction = (id) => {
    console.log(id);
  };

  return (
    <div className="w-full flex-col h-screen flex items-start justify-start gap-4 ml-4">
      <div className="w-full flex items-center justify-end">
        <Button onClick={() => setIsOpen(true)}>
          <FaPlus />
          Yeni Ekle
        </Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SocialModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
