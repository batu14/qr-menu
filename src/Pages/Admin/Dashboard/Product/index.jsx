import React, { useEffect, useState, useCallback } from "react";
import Button from "../../../../Components/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../../../Components/Table";
import Modal from "../../../../Components/Modal";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../../../../Reducers/CategoryReducer";
import { foods } from "../../../../MockData/Datas";
import General from "./Tabs/General";
import { CiTextAlignLeft } from "react-icons/ci";
import Image from "./Tabs/Image";
import Ingredients from "./Tabs/Ingredients";
import Values from "./Tabs/Values";
import Allergens from "./Tabs/Allergens";
import { CiImageOn } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdOutlineDangerous } from "react-icons/md";
import LangSelector from "../../../../Components/LangSelector";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Initial product state
  const initialProduct = {
    title: "",
    description: "",
    price: 0,
    time: 0,
    image: "",
    categoryId: "",
    ingredients: [],
    allergens: [],
    isActive: true,
  };

  const [values, setValues] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
  });

  const [product, setProduct] = useState(initialProduct);

  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "image", render: (row) => row.image },
  ];

  const deleteAction = (row) => {
    console.log(row);
  };

  const editAction = useCallback(
    (row) => {
      console.log("Edit action called with:", row);
      setProduct(row); // Önce product'ı set et
      setActiveTabIndex(1); // Düzenleme tabına geç
      setIsModalOpen(true); // Sonra modal'ı aç
      dispatch(setCategoryId(row.id));
    },
    [dispatch]
  );

  const handleAddProduct = useCallback(() => {
    setProduct(initialProduct); // Yeni ürün için temiz state
    setActiveTabIndex(0); // Ürün ekle tabına geç
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Modal kapandıktan sonra state'i temizle
    setTimeout(() => {
      setProduct(initialProduct);
      setActiveTabIndex(0);
    }, 300); // Animation için bekle
  }, []);

  const handleProductChange = useCallback((updater) => {
    console.log("handleProductChange called");
    setProduct((prevProduct) => {
      const newProduct =
        typeof updater === "function" ? updater(prevProduct) : updater;
      console.log("Previous product:", prevProduct);
      console.log("New product:", newProduct);
      return newProduct;
    });
  }, []);

  const tabs = [
    {
      title: "Ürün bilgileri",
      content: (
        <General
          key={`add-${product.id || "new"}`}
          product={product}
          setProduct={handleProductChange}
        />
      ),
      icon: <CiTextAlignLeft />,
    },
    {
      title: "Resim",
      content: <Image product={product} setProduct={setProduct} />,
      icon: <CiImageOn />,
    },
    {
      title: "Besin Değerleri",
      content: <Values values={values} setValues={setValues} />,
      icon: <IoFastFood />,
    },
    {
      title: "İçindekiler",
      content: <Ingredients product={product} setProduct={setProduct} />,
      icon: <GiForkKnifeSpoon />,
    },
    {
      title: "Alerjenler",
      content: <Allergens product={product} setProduct={setProduct} />,
      icon: <MdOutlineDangerous />,
    },
  ];

  const stepHandler = (index, type, e) => {
    if (type === "next") {
      if (index < tabs.length - 1) {
        setActiveTabIndex(index + 1);
        e.target.disabled = false;
      }
    } else if (type === "back") {
      if (index === 0) {
        e.target.disabled = true;
      }
      if (index > 0) {
        setActiveTabIndex(index - 1);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 p-4">
      <Modal isOpen={isModalOpen} setIsOpen={handleCloseModal}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl">
          <div className="flex flex-col gap-4 p-6 w-full">
            <div className=" gap-2 border-b pb-4 hidden md:flex">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 ${
                    activeTabIndex === index
                      ? "border-b-2 border-blue-500 text-blue-600 flex items-center gap-2"
                      : "text-gray-600 flex items-center gap-2"
                  }`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab.icon}
                  <span className="text-sm whitespace-nowrap">{tab.title}</span>
                </button>
              ))}
            </div>

            <div className="w-full min-h-[300px]">
              {tabs[activeTabIndex].content}
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button variant="secondary" onClick={handleCloseModal}>
                İptal
              </Button>
              <Button
                onClick={(e) => {
                  stepHandler(activeTabIndex, "back", e);
                }}
              >
                Geri
              </Button>
              <Button
                onClick={(e) => {
                  stepHandler(activeTabIndex, "next", e);
                }}
              >
                İlerle
              </Button>
              {activeTabIndex === tabs.length - 1 && (
                <Button
                  onClick={() => {
                    handleAddProduct();
                  }}
                >
                  <FaPlus />
                  <span>Ürün Ekle</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <LangSelector />

      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl hidden md:block font-bold">Ürünler</h1>
        <Button onClick={handleAddProduct}>
          <FaPlus />
          <span>Ürün Ekle</span>
        </Button>
      </div>

      <Table
        data={foods}
        column={columns}
        deleteAction={deleteAction}
        editAction={editAction}
      />
    </div>
  );
};

export default ProductPage;
