import React from "react";
import InputComp from "../../../../../Components/InputComp";
import Button from "../../../../../Components/Button";
const Content = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2">
        <InputComp label="Başlık" name="title" type="text" />
        <InputComp label="Açıklama" name="description" type="text" />
        <InputComp label="Yönlendirme yazısı" name="link" type="text" />
        <InputComp label="Adres" name="address" type="text" />
      </div>

      <div className="w-full flex items-center justify-end">
        <Button>Kaydet</Button>
      </div>
    </div>
  );
};

export default Content;
