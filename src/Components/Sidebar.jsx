import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineStar, HiOutlineWifi, HiChevronDown } from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { HiOutlineLanguage } from "react-icons/hi2";
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

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
  };

  return (
    <>
      {/* Menü Butonu */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-150"
      >
        <HiOutlineMenu className="w-6 h-6 text-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Menü</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoCloseOutline className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Dil Seçici Dropdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <HiOutlineLanguage className="w-5 h-5" />
              <span className="font-medium">Dil Seçimi</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{selectedLang.flag}</span>
                  <span className="font-medium text-gray-700">{selectedLang.label}</span>
                </div>
                <HiChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                  isLangOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 max-h-60 overflow-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                        selectedLang.code === lang.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className={`font-medium ${
                        selectedLang.code === lang.code ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Değerlendirme */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <HiOutlineStar className="w-5 h-5" />
                <span className="font-medium">Değerlendirmeler</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <HiOutlineStar 
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400" 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">(4.8)</span>
                </div>
                <span className="text-sm text-gray-500">250+ değerlendirme</span>
              </div>
              
              <Link 
                to="/review"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <HiOutlineStar className="w-5 h-5" />
                <span className="font-medium">Bizi Değerlendirin</span>
              </Link>
            </div>
          </div>

          {/* Wifi Şifresi */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <HiOutlineWifi className="w-5 h-5" />
              <span className="font-medium">Wifi Şifresi</span>
            </div>
            <button
              onClick={copyWifiPassword}
              className="w-full flex items-center justify-between gap-4 bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="font-mono text-gray-600">{wifiPassword}</span>
              <span className="text-sm font-medium text-gray-500">
                {copied ? 'Kopyalandı!' : 'Kopyala'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Lezzet Durağı</h3>
              <p className="text-sm text-gray-500">Restaurant & Cafe</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
