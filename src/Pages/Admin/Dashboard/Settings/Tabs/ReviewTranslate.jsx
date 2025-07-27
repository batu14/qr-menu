import React, { useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";

const ReviewTranslate = () => {
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
        <Button variant="primary" onClick={() => console.log(reviewTranslate)}>
          <FaSave />
          <span>Kaydet</span>
        </Button>
      </div>
    </div>
  );
};

export default ReviewTranslate;
