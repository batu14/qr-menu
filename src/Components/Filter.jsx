import React from "react";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

const Filter = ({ view, onViewChange, onSearch, searchValue = "" }) => {
  return (
    <div className="w-full bg-white border-b sticky top-0 z-20">
      <div className="w-full mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Arama Alanı */}
          <div className="flex-1  relative">
            <input
              type="text"
              placeholder="Yemek ara..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full  pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            {/* Filtre Butonu */}

            {/* Görünüm Değiştirici */}
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => onViewChange("grid")}
                className={`p-1.5 rounded ${
                  view === "grid"
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <HiViewGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => onViewChange("list")}
                className={`p-1.5 rounded ${
                  view === "list"
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <HiViewList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
