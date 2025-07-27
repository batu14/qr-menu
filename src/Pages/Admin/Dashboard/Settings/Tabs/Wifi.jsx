import React, { useState } from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
import { FaSave } from "react-icons/fa";

const Wifi = () => {
  const [wifi, setWifi] = useState({
    ssid: "",
    password: "",
  });
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
        <Button variant="primary" onClick={() => console.log(wifi)}>
          <FaSave />
          <span>Kaydet</span>
        </Button>
      </div>
    </div>
  );
};

export default Wifi;
