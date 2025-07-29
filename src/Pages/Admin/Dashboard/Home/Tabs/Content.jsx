import React, { useEffect, useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { Toaster, toast } from "react-hot-toast";

const Content = ({ data }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [phone, setPhone] = useState("");

  // data değiştiğinde input'lara yeni değerleri yansıt
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setLocation(data.location || "");
      setLink(data.link || "");
      setPhone(data.phone || "");
    }
  }, [data]);

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("action", "update_landing");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("langCode", localStorage.getItem("adminLang"));
    formdata.append("title", title);
    formdata.append("location", location);
    formdata.append("link", link);
    formdata.append("phone", phone);

    fetch(`${import.meta.env.VITE_API_URL}Api/Landing.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2">
        <InputComp
          label="Başlık"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputComp
          label="Konum"
          name="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <InputComp
          label="Yönlendirme yazısı"
          name="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <InputComp
          label="Telefon"
          name="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Toaster />
      </div>

      <div className="w-full flex items-center justify-end">
        <Button onClick={handleSubmit}>Kaydet</Button>
      </div>
    </div>
  );
};

export default Content;
