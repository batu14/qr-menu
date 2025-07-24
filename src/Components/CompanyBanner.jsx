import React from 'react'

const CompanyBanner = () => {
  return (
    <div className="relative w-full h-20 bg-white border-b">
      {/* Logo Container */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
          <span className="text-xl font-bold text-white">L</span>
        </div>
        
        {/* İşletme Adı */}
        <div>
          <h1 className="text-gray-900 text-lg font-semibold">Lezzet Durağı</h1>
          <p className="text-gray-500 text-sm">Restaurant & Cafe</p>
        </div>
      </div>

      {/* Sağ Bilgiler */}
      {/* <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>4.8</span>
          <span>★</span>
          <span className="text-gray-400">(250+)</span>
        </div>
      </div> */}
    </div>
  );
};

export default CompanyBanner;