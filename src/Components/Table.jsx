import React from "react";
import classNames from "classnames";
import Button from "./Button";
import { TbEdit, TbTrash } from "react-icons/tb";

const Table = ({
  deleteAction,
  editAction,
  data,
  column,
  linkHeaders = [], // Link olarak render edilecek header'ların array'i
  className,
  striped = true,
  hover = true,
  bordered = false,
  compact = false,
}) => {
  if (!data?.length) {
    return (
      <div className="w-full text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Veri bulunamadı</p>
      </div>
    );
  }

  const tableStyles = classNames(
    "min-w-full divide-y divide-gray-200 bg-white",
    bordered && "border border-gray-200",
    className
  );

  const thStyles = classNames(
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    compact ? "py-2" : "py-3"
  );

  const tdStyles = classNames("px-6", compact ? "py-2" : "py-4");

  const trStyles = classNames(
    hover && "hover:bg-gray-50 transition-colors duration-200"
  );

  const renderCellContent = (col, row) => {
    const content = col.render(row);
    const contentString = content?.toString() || "";
    const isLink = linkHeaders.includes(col.header);

    const isImage = () => {
      if (!contentString) return false;

      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
      if (imageExtensions.some(ext => contentString.toLowerCase().includes(ext))) return true;

      const imageServices = [
        'localhost',
        'images.unsplash.com',
        'cdn.pixabay.com',
        'images.pexels.com',
        'i.imgur.com',
        'media.getty',
        'cloudinary.com',
        'amazonaws.com',
        'googleusercontent.com',
        'fbcdn.net',
        'cdninstagram.com'
      ];
      if (imageServices.some(service => contentString.includes(service))) return true;

      const urlParams = new URLSearchParams(contentString.split('?')[1] || '');
      return urlParams.has('format') || urlParams.has('fit') || urlParams.has('crop') || urlParams.has('w') || urlParams.has('h');
    };

    if (isImage()) {
      const imageUrl = contentString.startsWith("uploads")
        ? import.meta.env.VITE_API_URL + "Api/" + contentString
        : contentString;

      return (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={col.header} 
            className="w-24 h-24 object-cover rounded"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <div 
            className="hidden text-xs text-gray-500 break-all"
            style={{ display: 'none' }}
          >
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Resim yüklenemedi - Linke git
            </a>
          </div>
        </div>
      );
    }

    if (isLink && contentString) {
      return (
        <a 
          href={contentString} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {contentString}
        </a>
      );
    }

    return content;
  };

  return (
    <>
      {/* Masaüstü görünüm */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow w-full">
        <table className={tableStyles}>
          <thead className="bg-gray-50">
            <tr>
              {column &&
                column.map((col, index) => (
                  <th key={index} scope="col" className={thStyles}>
                    {col.header || col}
                  </th>
                ))}
              <th scope="col" className={thStyles}>
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(
                  trStyles,
                  striped && rowIndex % 2 === 0 && "bg-gray-50"
                )}
              >
                {column &&
                  column.map((col, colIndex) => (
                    <td key={colIndex} className={tdStyles}>
                      {renderCellContent(col, row)}
                    </td>
                  ))}
                <td className={tdStyles}>
                  <div className="flex space-x-2">
                    <Button variant="danger" size="sm" onClick={() => deleteAction(row)}>
                      <TbTrash className="mr-1" /> Sil
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => editAction(row)}>
                      <TbEdit className="mr-1" /> Düzenle
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil görünüm */}
      <div className="md:hidden space-y-4 w-full">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={classNames(
              "bg-white rounded-lg shadow p-4",
              striped && rowIndex % 2 === 0 && "bg-gray-50",
              bordered && "border border-gray-200"
            )}
          >
            {column &&
              column.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={classNames(
                    "flex justify-between items-center py-2",
                    colIndex !== 0 && "border-t border-gray-100"
                  )}
                >
                  <span className="text-sm font-medium text-gray-500">
                    {col.header || col}
                  </span>
                  <span className="text-sm text-gray-900">
                    {renderCellContent(col, row)}
                  </span>
                </div>
              ))}
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <Button variant="danger" size="sm" onClick={() => deleteAction(row)}>
                <TbTrash className="mr-1" /> Sil
              </Button>
              <Button variant="primary" size="sm" onClick={() => editAction(row)}>
                <TbEdit className="mr-1" /> Düzenle
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
