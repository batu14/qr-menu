import React, { useState } from "react";
import Dropdown from "../Components/Dropdown";
import InputComp from "../Components/InputComp";
import Button from "../Components/Button";

const SocialModal = ({ isOpen, setIsOpen }) => {
  const [socials, setSocials] = useState([
    "facebook",
    "instagram",
    "x",
    "youtube",
    "tiktok",
    "linkedin",
    "pinterest",
    "snapchat",
    "reddit",
    "telegram",
    "whatsapp",
  ]);

  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialLink, setSocialLink] = useState("");
  return (
    <div>
      <div className="w-full h-full flex items-start  justify-start flex-col gap-4 bg-white rounded-lg p-4">
        <h1 className="text-2xl font-bold w-full border-b border-black pb-4 ">
          Sosyal Medya
        </h1>
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          <Dropdown
            className="w-full"
            options={socials.map((social) => ({
              label: social,
              value: social,
            }))}
            selectedOption={selectedSocial}
            onSelect={setSelectedSocial}
          />
          <InputComp
            label="Sosyal Medya Linki"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
          />
          <div className="w-full flex items-center justify-end">
            <Button onClick={() => setIsOpen(false)}>Ekle</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
