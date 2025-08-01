import React, { useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";
import { toast ,Toaster} from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const DetailTranslate = () => {
  const adminLang = useSelector((state) => state.adminLang.lang);
  const [reviewTranslate, setReviewTranslate] = useState({
    button: "",
    kalori: "",
    protein: "",
    karbonhidrat: "",
    yag: "",
    vvalues:"",
    allergens:"",

  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("langCode", adminLang);
    formData.append("action", "detail_translation");
    formData.append("token", localStorage.getItem("token"));
    formData.append("button", reviewTranslate.button);
    formData.append("kalori", reviewTranslate.kalori);
    formData.append("protein", reviewTranslate.protein);
    formData.append("karbonhidrat", reviewTranslate.karbonhidrat);
    formData.append("yag", reviewTranslate.yag);
    formData.append("vvalues", reviewTranslate.vvalues);
    formData.append("allergens", reviewTranslate.allergens);
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
    formData.append("action", "get_detail_translation");
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
          label="Buton"
          value={reviewTranslate.button}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, button: e.target.value })
          }
        />
        <InputComp
          label="Kalori"
          value={reviewTranslate.kalori}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, kalori: e.target.value })
          }
        />
        <InputComp
          label="Protein"
          value={reviewTranslate.protein}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, protein: e.target.value })
          }
        />
        <InputComp
          label="Karbonhidrat"
          value={reviewTranslate.karbonhidrat}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, karbonhidrat: e.target.value })
          }
        />
        <InputComp
          label="Yağ"
          value={reviewTranslate.yag}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, yag: e.target.value })
          }
        />
        <InputComp
          label="İçindekiler"
          value={reviewTranslate.vvalues}
          onChange={(e) =>
            setReviewTranslate({ ...reviewTranslate, vvalues: e.target.value })
          }
        />
        <InputComp
          label="Alerjenler"
          value={reviewTranslate.allergens}
          onChange={(e) =>
            setReviewTranslate({
              ...reviewTranslate,
              allergens: e.target.value,
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

export default DetailTranslate;
