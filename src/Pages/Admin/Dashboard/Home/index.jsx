import React, { useEffect, useState } from "react";
import Tab from "../../../../Components/Tab";
import { useSelector, useDispatch } from "react-redux";
import Content from "./Tabs/Content";
import { MdOutlineTextSnippet } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import Logo from "./Tabs/Logo";
import { setActiveTab } from "../../../../Reducers/TabReducer";
import LangSelector from "../../../../Components/LangSelector";

const Index = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);
  const langCode = useSelector((state) => state.adminLang.lang);

  const [data, setData] = useState(null);

  const requestData = () => {
    const formdata = new FormData();
    formdata.append("action", "get_landing");
    formdata.append("token", localStorage.getItem("token"));
    formdata.append("lang", localStorage.getItem("adminLang"));

    fetch(`${import.meta.env.VITE_API_URL}Api/Landing.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setData(data.data[0]);
        } else {
          
          setData([
            {
              title: "boş",
              location: "boş",
              link: "boş",
              phone: "boş",
              image: "boş",
            },
          ]);
        }
      });
  };

  useEffect(() => {
    dispatch(setActiveTab("İçerik Alanı"));
    requestData();
  }, []);

  useEffect(() => {
    requestData();
  }, [langCode]);

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
    "İçerik Alanı": <Content data={data} />,
    Logo: <Logo data={data} />,
  };

  return (
    <div className="w-full flex-col h-full flex items-start justify-start gap-4">
      <div className="w-full flex flex-col items-start justify-start gap-2 border-b border-gray-400 p-4">
        <div className="w-full flex items-center justify-end">
          <LangSelector />
        </div>
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

export default Index;
