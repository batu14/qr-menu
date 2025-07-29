import React, { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../../../Components/Table";
import Modal from "../../../../Components/Modal";
import CategoryAddModal from "../../../../Modals/CategoryAddModal";
import LangSelector from "../../../../Components/LangSelector";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const index = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const langCode = useSelector((state) => state.adminLang.lang);


  const getCategories = () => {
    const formData = new FormData();
    formData.append("action", "get_categories");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", localStorage.getItem("adminLang"));
    fetch(`${import.meta.env.VITE_API_URL}Api/Category.php`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        setCategories(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    getCategories();
  }, [langCode]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "image", render: (row) => row.image },
  ];

  const deleteAction = (row) => {
    const formData = new FormData();
    formData.append("action", "delete_category");
    formData.append("token", localStorage.getItem("token"));
    formData.append("id", row.id);
    fetch(`${import.meta.env.VITE_API_URL}Api/Category.php`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status == 200){
        toast.success(data.message);
        setCategories(categories.filter((category) => category.id !== row.id));
      }else{
        toast.error(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const editAction = (row) => {
    setSelectedCategory(row);
    setIsModalOpen(true);
  };
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 p-4">
      <Toaster />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <CategoryAddModal
          getCategories={getCategories}
          data={{
            title: selectedCategory?.title,
            image: selectedCategory?.image,
            id: selectedCategory?.id,
            preview : null
          } || []}
          setIsOpen={setIsModalOpen}
        />
      </Modal>
      <div className="w-full flex items-center justify-end">
        <LangSelector />
      </div>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl hidden md:block font-bold">Kategoriler</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus />
          <span>Kategori Ekle</span>
        </Button>
      </div>
      <Table
        data={categories}
        column={columns}
        deleteAction={deleteAction}
        editAction={editAction}
      />
    </div>
  );
};

export default index;
