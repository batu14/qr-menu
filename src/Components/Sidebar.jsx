import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineStar, HiOutlineWifi, HiChevronDown } from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { HiOutlineLanguage } from "react-icons/hi2";
import { FaInstagram, FaFacebookF, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'TR', label: 'Türkçe', flag: '🇹🇷' });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const wifiPassword = "LezzetDuragi2024";
  const languages = [
    { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'AR', label: 'العربية', flag: '🇸🇦' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'FR', label: 'Français', flag: '🇫🇷' }
  ];

  const socialLinks = [
    { icon: FaInstagram, url: 'https://instagram.com/lezzetduragi', label: 'Instagram' },
    { icon: FaFacebookF, url: 'https://facebook.com/lezzetduragi', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com/lezzetduragi', label: 'Twitter' }
  ];

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  const commonIconClasses = "w-4 h-4";
  const sectionHeaderClasses = "flex items-center gap-1.5 text-gray-700 mb-2 text-sm";
  const buttonBaseClasses = "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm";

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-150">
        <HiOutlineMenu className="w-5 h-5 text-white" />
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" onClick={() => setIsOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Menü</h2>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <IoCloseOutline className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <div className={sectionHeaderClasses}>
              <HiOutlineLanguage className={commonIconClasses} />
              <span className="font-medium">Dil Seçimi</span>
            </div>
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className={`${buttonBaseClasses} bg-gray-50 hover:bg-gray-100`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{selectedLang.flag}</span>
                  <span className="font-medium text-gray-700">{selectedLang.label}</span>
                </div>
                <HiChevronDown className={`${commonIconClasses} text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-48 overflow-auto">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => handleLangSelect(lang)}
                      className={`${buttonBaseClasses} hover:bg-gray-50 ${selectedLang.code === lang.code ? 'bg-gray-50' : ''}`}>
                      <span className="text-sm">{lang.flag}</span>
                      <span className={`font-medium ${selectedLang.code === lang.code ? 'text-gray-900' : 'text-gray-600'}`}>
                        {lang.label}
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
              <span className="font-medium">Wifi Şifresi</span>
            </div>
            <button onClick={copyWifiPassword} className={`${buttonBaseClasses} bg-gray-50 hover:bg-gray-100`}>
              <span className="font-mono text-gray-600 text-sm">{wifiPassword}</span>
              <span className="text-xs font-medium text-gray-500">{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
            </button>
          </div>
          <Link to="/review" className={sectionHeaderClasses + " py-4"}>
            <HiOutlineStar className={commonIconClasses} />
            <span className="font-medium">Bizi değerlendirin</span>

          </Link>

          <div>
            <div className={sectionHeaderClasses}>
              <FaInstagram className={commonIconClasses} />
              <span className="font-medium">Sosyal Medya</span>
            </div>
            <div className="grid grid-cols-2 p-4 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-700" />
                  <span className="text-xs font-medium text-gray-600">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
