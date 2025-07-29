import React, { useEffect } from "react";
import FileInput from "../../../../../Components/FileInput";

const Image = ({ logo, setLogo, preview, setPreview }) => {
  



  return (
    <div className="flex flex-col gap-4 w-full">
      <FileInput
        logo={logo}
        setLogo={setLogo}
        preview={preview}
        setPreview={setPreview}
        data={[]}
      />
      {/* <div className="w-full flex items-center justify-start">
        <Message variant="info" text="Ürün resmini seçiniz" />
      </div> */}
    </div>
  );
};

export default Image;
