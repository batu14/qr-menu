import React, { useState } from "react";
import Button from "../../../../Components/Button";
import { FaPlus } from "react-icons/fa";
import { categoriesData } from "../../../../MockData/Datas";
import Table from "../../../../Components/Table";
import Modal from "../../../../Components/Modal";
import CategoryAddModal from "../../../../Modals/CategoryAddModal";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../../../Reducers/CategoryReducer";
const index = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "image", render: (row) => row.image },
    
  ];

  const deleteAction = (row) => {
    console.log(row);
  };

  const editAction = (row) => {
    setIsModalOpen(true);
    dispatch(setCategoryId(row.id));
  };
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 p-4">
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <CategoryAddModal setIsOpen={setIsModalOpen} />
      </Modal>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl hidden md:block font-bold">Kategoriler</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus />
          <span>Kategori Ekle</span>
        </Button>
      </div>
      <Table data={categoriesData} column={columns} deleteAction={deleteAction} editAction={editAction} />
    </div>
  );
};

export default index;
