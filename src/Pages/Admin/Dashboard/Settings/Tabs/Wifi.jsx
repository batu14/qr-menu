import React, { useEffect, useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Wifi = () => {


  const [wifi, setWifi] = useState({
    ssid: "",
    password: "",
  });

  useEffect(() => {
    const formData = new FormData();
    formData.append("action", "get_wifi");
    formData.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setWifi(data.data[0]);
        }
      });
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("action", "update_wifi");
    formData.append("token", localStorage.getItem("token"));
    formData.append("ssid", wifi.ssid);
    formData.append("password", wifi.password);
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
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
      <InputComp
        label="SSID"
        value={wifi.ssid}
        onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
      />
      <InputComp
        label="Şifre"
        value={wifi.password}
        onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
      />
      <div className="w-full flex items-center justify-end gap-2">
        <Button variant="primary" onClick={handleSubmit}>
          <FaSave />
          <span>Kaydet</span>
        </Button>
      </div>
    </div>
  );
};

export default Wifi;
