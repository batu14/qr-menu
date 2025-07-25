import React, { useRef, useState } from "react";
import classNames from "classnames";

const FileInput = ({
  label,
  accept,
  multiple = false,
  maxSize = 5, // MB cinsinden
  error,
  helperText,
  onChange,
  required = false,
  className,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (!files.length) return;

    const file = files[0];
    // Dosya boyutu kontrolü (MB cinsinden)
    if (file.size > maxSize * 1024 * 1024) {
      setPreview(null);
      if (onChange) {
        onChange({ error: `Dosya boyutu ${maxSize}MB'dan küçük olmalıdır` });
      }
      return;
    }

    // Önizleme oluşturma (resim dosyaları için)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    if (onChange) {
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const baseStyles =
    "w-full border-2 border-dashed rounded-lg p-6 transition-colors duration-200";
  const getStateStyles = () => {
    if (error) return "border-red-500 bg-red-50";
    if (isDragging) return "border-blue-500 bg-blue-50";
    return "border-gray-300 hover:border-blue-400 bg-gray-50";
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={classNames(baseStyles, getStateStyles(), className)}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
              onChange(e),
              setPreview(e.target.files[0])
          }}
          {...props}
        />

        <div className="text-center">
          {preview ? (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(preview)}
                alt="Önizleme"
                className="mx-auto max-h-48 rounded-lg object-contain"
              />
            </div>
          ) : (
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Dosya yüklemek için tıklayın
            </span>{" "}
            veya sürükleyip bırakın
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {accept
              ? `Desteklenen formatlar: ${accept}`
              : "Tüm dosya formatları desteklenir"}
          </p>
          <p className="text-xs text-gray-500">
            Maksimum dosya boyutu: {maxSize}MB
          </p>
        </div>
      </div>

      {(error || helperText) && (
        <p
          className={classNames(
            "mt-1.5 text-sm",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default FileInput;
