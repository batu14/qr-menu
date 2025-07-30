import React, { useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";
import { toast ,Toaster} from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const ReviewTranslate = () => {
  const adminLang = useSelector((state) => state.adminLang.lang);
  const [reviewTranslate, setReviewTranslate] = useState({
    title: "",
    subtitle: "",
    name: "",
    surname: "",
    email: "",
    comment: "",
    buttonText: "",
    privacyPolicy: "",
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("langCode", adminLang);
    formData.append("action", "rewiew_translation");
    formData.append("token", localStorage.getItem("token"));
    formData.append("title", reviewTranslate.title);
    formData.append("subtitle", reviewTranslate.subtitle);
    formData.append("name", reviewTranslate.name);
    formData.append("surname", reviewTranslate.surname);
    formData.append("email", reviewTranslate.email);
    formData.append("comment", reviewTranslate.comment);
    formData.append("buttonText", reviewTranslate.buttonText);
    formData.append("security", reviewTranslate.privacyPolicy);
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
    formData.append("action", "get_review_translation");
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
          label="Alt Başlık"
          value={reviewTranslate.subtitle}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, subtitle: e.target.value })
          }
        />
        <InputComp
          label="Ad"
          value={reviewTranslate.name}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, name: e.target.value })
          }
        />
        <InputComp
          label="Soyad"
          value={reviewTranslate.surname}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, surname: e.target.value })
          }
        />
        <InputComp
          label="Email"
          value={reviewTranslate.email}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, email: e.target.value })
          }
        />
        <InputComp
          label="Yorum"
          value={reviewTranslate.comment}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, comment: e.target.value })
          }
        />
        <InputComp
          label="Buton Metni"
          value={reviewTranslate.buttonText}
          onChange={(e) =>
            setReviewTranslate({
              ...reviewTranslate,
              buttonText: e.target.value,
            })
          }
        />
        <InputComp
          label="Gizlilik Politikası"
          value={reviewTranslate.privacyPolicy}
          onChange={(e) =>
            setReviewTranslate({
              ...reviewTranslate,
              privacyPolicy: e.target.value,
            })
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

export default ReviewTranslate;
