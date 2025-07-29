import React, { useRef, useState, useCallback, useEffect } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";

const FileInput = ({
 logo,
 setLogo,
 preview,
 setPreview,
 data,
}) => {
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

 

  const handleRemove = () => {
    setLogo(null);
    setPreview(null);
  };

  useEffect(() => {
    if (data && data.image) {
      setPreview(import.meta.env.VITE_API_URL+"Api/" + data.image);
    }
  }, [data]);


  return (
    <div className="w-full flex flex-col items-center gap-6">
        <label
          htmlFor="file"
          className="relative w-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
        >
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
            {preview && preview != "" && preview != null && preview != "null" ? (
              <div className="flex flex-col items-center gap-6 relative group">
                <img
                  src={preview}
                  alt="Logo önizleme"
                  className="w-full md:w-1/2 aspect-square rounded-lg object-cover shadow-lg transition-transform group-hover:scale-95"
                />
                <div className="absolute inset-0 bg-black/50 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <MdCloudUpload className="text-4xl text-white" />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove();
                  }}
                  className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <MdDelete className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <MdCloudUpload className="text-4xl text-blue-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-700">
                    Logo Yükle
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    PNG, JPG veya JPEG (maksimum 2MB)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Önerilen boyut: 512x512px
                  </p>
                </div>
              </div>
            )}
          </div>
        </label>

        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
  );
};


export default FileInput;