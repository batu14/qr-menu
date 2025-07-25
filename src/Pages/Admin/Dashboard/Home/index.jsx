import React, { useEffect } from "react";
import Tab from "../../../../Components/Tab";
import { useSelector, useDispatch } from "react-redux";
import Content from "./Tabs/Content";
import { MdOutlineTextSnippet } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Logo from "./Tabs/Logo";
import { setActiveTab } from "../../../../Reducers/TabReducer";

const index = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("İçerik Alanı"));
  }, []);
  const tabs = [
    {
      name: "İçerik Alanı",
      icon: MdOutlineTextSnippet,
    },
    {
      name: "Logo",
      icon: CiImageOn,
    },
  ];

  const content = {
    "İçerik Alanı": <Content />,
    "Logo": <Logo />,
  };
  return (
    <div className="w-full flex-col h-full flex items-start justify-start gap-4">
      <div className="w-full flex flex-col items-start justify-start  gap-2 border-b border-gray-400 p-4">
        <h1 className="text-2xl md:hidden font-bold">
          {activeTab
            ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
            : "İçerik Alanı"}
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
