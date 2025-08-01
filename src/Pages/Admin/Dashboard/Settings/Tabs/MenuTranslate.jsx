import React, { useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const MenuTranslate = () => {
  const adminLang = useSelector((state) => state.adminLang.lang);
  const [reviewTranslate, setReviewTranslate] = useState({
    title: "",
    language: "",
    wifi: "",
    rate:"",
    social:"",
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("langCode", adminLang);
    formData.append("action", "menu_translation");
    formData.append("token", localStorage.getItem("token"));
    formData.append("title", reviewTranslate.title);
    formData.append("language", reviewTranslate.language);
    formData.append("wifi", reviewTranslate.wifi);
    formData.append("rate", reviewTranslate.rate);
    formData.append("social", reviewTranslate.social);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("action", "get_menu_translation");
    formData.append("token", localStorage.getItem("token"));
    formData.append("langCode", adminLang);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setReviewTranslate(data.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminLang]);

  return (
    <div className="w-full  flex flex-col items-start justify-start gap-2">
      <div className="w-full flex flex-col items-start justify-start gap-2 md:grid md:grid-cols-2">
        <InputComp
          label="Başlık"
          value={reviewTranslate.title}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, title: e.target.value })
          }
        />
        <InputComp
          label="Dil"
          value={reviewTranslate.language}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, language: e.target.value })
          }
        />
        <InputComp
          label="Wifi"
          value={reviewTranslate.wifi}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, wifi: e.target.value })
          }
        />
        <InputComp
          label="Değerlendirme"
          value={reviewTranslate.rate}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, rate: e.target.value })
          }
        />
        <InputComp
          label="Sosyal Medya"
          value={reviewTranslate.social}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, social: e.target.value })
          }
        />
      </div>
      <div className="w-full flex items-center justify-end gap-2">
        <Button variant="primary" onClick={handleSubmit}>
          <FaSave />
          <span>Kaydet</span>
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default MenuTranslate;
