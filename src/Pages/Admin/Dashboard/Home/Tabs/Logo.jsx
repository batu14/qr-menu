import React, { useState } from "react";
import FileInput from "../../../../../Components/FileInput";
import Button from "../../../../../Components/Button";

const Logo = () => {
  const [logo, setLogo] = useState(null);
  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <FileInput
        label="Logo"
        onChange={(e) =>
          setLogo(e.target.files[0])
        }
        placeholder="Logo giriniz"
      />
      <div className="w-full flex items-center justify-end">
        <Button>Kaydet</Button>
      </div>
    </div>
  );
};

export default Logo;
