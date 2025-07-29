import React, { useState, useEffect } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAdminLang } from "../Reducers/AdminLangReducer";
import { toast } from "react-hot-toast";

const LangSelector = () => {
  const [languages, setLanguages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({});
  const dispatch = useDispatch();
  const adminLang = useSelector((state) => state.adminLang.lang);

  const getLanguages = () => {
    const formData = new FormData();
    formData.append("action", "get_languages");
    formData.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}Api/Language.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          console.log(data.data);
          setLanguages(data.data);
          setSelectedLang(data.data.find((lang) => lang.code === adminLang));
        } else {
          toast.error(data.message);
        }
      });
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    console.log(selectedLang);
  }, [adminLang]);

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    dispatch(setAdminLang(lang.code));
  };

  return (
    <div className="w-full flex items-start h-9.5 justify-end border-b border-gray-400 pb-0">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <FaGlobe className="text-gray-500" />
          <span className="text-sm font-medium flex items-center gap-2">
            <p className="text uppercase font-medium "> {selectedLang.code}</p>
            <p className="text font-medium "> {selectedLang.name}</p>
          </span>
          <FaChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            {languages.map(
              (lang) => (
                console.log(lang),
                (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    style={
                      lang.isActive ? { display: "flex" } : { display: "none" }
                    }
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                      selectedLang.code === lang.code
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    <span className="text-base">{lang.code}</span>
                    <span>{lang.name}</span>
                  </button>
                )
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LangSelector;
