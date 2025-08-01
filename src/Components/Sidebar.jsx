import React, { useState, useEffect } from "react";
import {
  HiOutlineMenu,
  HiOutlineStar,
  HiOutlineWifi,
  HiChevronDown,
} from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineLanguage } from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLangCode } from "../Reducers/LangReducer";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null); // Changed to null initially
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const [translation, setTranslation] = useState();
  const wifiPassword = "LezzetDuragi2024";

  const langCode = useSelector((state) => state.lang.langCode);
  const [socialLinks, setSocialLinks] = useState([]);

  const dispatch = useDispatch();

  const getLanguages = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("action", "getLanguages");
    fetch(`${import.meta.env.VITE_API_URL}Api/Language.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setLanguages(data.data);
          // Set default language if none selected
          if (!selectedLang && data.data.length > 0) {
            setSelectedLang(data.data[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getTranslation = () => {
    const formdata = new FormData();
    formdata.append("action", "getTranslation_menu");
    formdata.append("langCode", langCode);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setTranslation(data.data[0]);
        }
      });
  };

  const getSocialLinks = () => {
    const formdata = new FormData();
    formdata.append("action", "getSocialLinks");
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setSocialLinks(data.data);
        }
      });
  };

  useEffect(() => {
    getTranslation();
  }, [langCode]);

  

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commonIconClasses = "w-4 h-4";
  const sectionHeaderClasses =
    "flex items-center gap-1.5 text-gray-700 mb-2 text-sm";
  const buttonBaseClasses =
    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm";

  useEffect(() => {
    getLanguages();
    getSocialLinks();
  }, []);




  const socialİtem =(s)=>{
    switch(s){
      case "instagram":
        return <FaInstagram className="w-5 h-5 text-gray-700" />
      case "facebook":
        return <FaFacebookF className="w-5 h-5 text-gray-700" />
      case "twitter":
        return <FaTwitter className="w-5 h-5 text-gray-700" />
      default:
        return null;
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-150"
      >
        <HiOutlineMenu className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            {translation && translation.title ? translation.title : "Menü"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <div className={sectionHeaderClasses}>
              <HiOutlineLanguage className={commonIconClasses} />
              <span className="font-medium">
                {translation && translation.language ? translation.language : "Dil Seçimi"}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`${buttonBaseClasses} bg-gray-50 hover:bg-gray-100`}
                disabled={isLoading}
              >
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <span className="text-sm text-gray-500">Yükleniyor...</span>
                  ) : (
                    <>
                      <span className="text-sm capitalize">
                        {selectedLang?.code || "Seçiniz"}
                      </span>
                      <span className="font-medium text-gray-700">
                        {selectedLang?.name || "Seçiniz"}
                      </span>
                    </>
                  )}
                </div>
                <HiChevronDown
                  className={`${commonIconClasses} text-gray-500 transition-transform ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && languages.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-48 overflow-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        dispatch(setLangCode(lang.code));
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                      className={`${buttonBaseClasses} hover:bg-gray-50 ${
                        selectedLang?.code === lang.code ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="text-sm capitalize">{lang.code}</span>
                      <span
                        className={`font-medium ${
                          selectedLang?.code === lang.code
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={sectionHeaderClasses}>
              <HiOutlineWifi className={commonIconClasses} />
              <span className="font-medium">
                {translation && translation.wifi
                  ? translation.wifi
                  : "Wifi Şifresi"}
              </span>
            </div>
            <button
              onClick={copyWifiPassword}
              className={`${buttonBaseClasses} bg-gray-50 hover:bg-gray-100`}
            >
              <span className="font-mono text-gray-600 text-sm">
                {wifiPassword}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {copied ? "Kopyalandı!" : "Kopyala"}
              </span>
            </button>
          </div>
          <Link to="/review" className={sectionHeaderClasses + " py-4"}>
            <HiOutlineStar className={commonIconClasses} />
            <span className="font-medium">
              {translation && translation.rate
                ? translation.rate
                : "Bizi değerlendirin"}
            </span>
          </Link>

          <div>
            <div className={sectionHeaderClasses}>
              <FaInstagram className={commonIconClasses} />
              <span className="font-medium">
                {translation && translation.social
                  ? translation.social
                  : "Sosyal Medya"}
              </span>
            </div>
            <div className="grid grid-cols-2 p-4 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {socialİtem(social.name)}
                  <span className="text-xs font-medium text-gray-600">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
