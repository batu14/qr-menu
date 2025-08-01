import React, { useEffect, useState, useCallback } from "react";
import Button from "../../../../Components/Button";
import { FaPlus, FaSave } from "react-icons/fa";
import Table from "../../../../Components/Table";
import Modal from "../../../../Components/Modal";
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
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const langCode = useSelector((state) => state.adminLang.lang);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState([]);
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

  const [logo, setLogo] = useState("");
  const [preview, setPreview] = useState("");

  const [values, setValues] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
  });

  const [product, setProduct] = useState(initialProduct);

  const getProducts = () => {
    const formData = new FormData();
    formData.append("action", "get_products");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", langCode);
    fetch(`${import.meta.env.VITE_API_URL}Api/Product.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [langCode]);
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "image", render: (row) => row.image },
  ];

  const deleteAction = (row) => {
    const formData = new FormData();
    formData.append("action", "delete_product");
    formData.append("token", localStorage.getItem("token"));
    formData.append("id", row.id);
    fetch(`${import.meta.env.VITE_API_URL}Api/Product.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          getProducts();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editAction = (row) => {
    console.log(row);
    setIsEdit(true);
    setProduct({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      time: row.time,
      image: row.image,
      categoryId: row.category,
      ingredients: JSON.parse(row.ingredients),
      allergens: JSON.parse(row.allergens),
      isActive: row.isActive,
    });
    setLogo(row.image);
    setPreview(row.image);
    const v = JSON.parse(row.vvalues);
    setValues({
      calories: v.calories,
      protein: v.protein,
      fat: v.fat,
      carbohydrate: v.carbohydrate,
    });
    setActiveTabIndex(0);
    setIsModalOpen(true);
  };

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
      content: (
        <Image
          isEdit={isEdit}
          logo={logo}
          setLogo={setLogo}
          preview={preview}
          setPreview={setPreview}
        />
      ),
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

  const submitProduct = () => {
    const formData = new FormData();
    if (isEdit) {
      formData.append("action", "update_product");
    } else {
      formData.append("action", "create_product");
    }
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", localStorage.getItem("adminLang"));

    if (isEdit) {
      formData.append("id", product.id);
    }
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price);
    formData.append("time", product.time);
    if (!logo.toString().includes("uploads/product_images")) {
      formData.append("image", logo);
    }
    formData.append("values", JSON.stringify(values));
    formData.append("ingredients", JSON.stringify(product.ingredients));
    formData.append("allergens", JSON.stringify(product.allergens));
    formData.append("isActive", 1);
    fetch(`${import.meta.env.VITE_API_URL}Api/Product.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          getProducts();
          handleCloseModal();
          setProduct(initialProduct);
          setLogo("");
          setPreview("");
          setValues({
            calories: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
          });
          setActiveTabIndex(0);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4 p-4">
      <Toaster />
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
              {activeTabIndex === tabs.length - 1 && !isEdit && (
                <Button
                  onClick={() => {
                    submitProduct();
                  }}
                >
                  <FaPlus />
                  <span>Ürün Ekle</span>
                </Button>
              )}
              {isEdit && activeTabIndex === tabs.length - 1 && (
                <Button
                  onClick={() => {
                    submitProduct();
                  }}
                >
                  <FaSave />
                  <span>Ürünü Kaydet</span>
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
        data={products}
        column={columns}
        deleteAction={deleteAction}
        editAction={editAction}
      />
    </div>
  );
};

export default ProductPage;
