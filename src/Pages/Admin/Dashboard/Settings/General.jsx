import React, { useEffect } from "react";
import Tab from "../../../../Components/Tab";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../../../Reducers/TabReducer";
import LangSelector from "../../../../Components/LangSelector";
import { FaWifi } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import Wifi from "./Tabs/Wifi";
import ReviewTranslate from "./Tabs/ReviewTranslate";

const index = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("Kablosuz Ağ"));
  }, []);
  const tabs = [
    {
      name: "Kablosuz Ağ",
      icon: FaWifi,
    },
    {
      name: "Değerlendirme çevirileri",
      icon: FaLanguage,
    },
  ];

  const content = {
    "Kablosuz Ağ": <Wifi />,
    "Değerlendirme çevirileri": <ReviewTranslate />,
  };
  return (
    <div className="w-full flex-col h-full flex items-start justify-start gap-4">
      <div className="w-full flex flex-col items-start justify-start  gap-2 border-b border-gray-400 p-4">
        <div className="w-full flex items-center justify-end">
          <LangSelector />
        </div>
        <h1 className="text-2xl md:hidden font-bold">
          {activeTab
            ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
            : "Genel Ayarlar"}
        </h1>
        <Tab tabs={tabs} />
      </div>
      <div className="w-full flex items-start justify-start p-4">
        {content[activeTab]}
      </div>
    </div>
  );
};

export default index;
