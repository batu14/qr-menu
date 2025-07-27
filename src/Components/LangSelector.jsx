import React, { useState } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

const languages = [
  {
    code: "tr",
    name: "Türkçe",
    flag: "🇹🇷",
  },
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
  },
];

const LangSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    // Burada dil değişikliği için gerekli işlemleri yapabilirsiniz
    // Örneğin: i18n.changeLanguage(lang.code)
  };

  return (
    <div className="w-full flex items-start h-9.5 justify-end border-b border-gray-400 pb-0">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <FaGlobe className="text-gray-500" />
          <span className="text-sm font-medium">
            {selectedLang.flag} {selectedLang.name}
          </span>
          <FaChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                  selectedLang.code === lang.code
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LangSelector;
