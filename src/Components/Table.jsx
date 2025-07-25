import React from "react";
import classNames from "classnames";
import Button from "./Button";
import { TbEdit, TbTrash } from "react-icons/tb";

const Table = ({
  deleteAction,
  editAction,
  data,
  column,
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

  const tdStyles = classNames("px-6 ", compact ? "py-2" : "py-4");

  const trStyles = classNames(
    hover && "hover:bg-gray-50 transition-colors duration-200"
  );

  return (
    <>
      {/* Desktop View */}
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
                      {col.render(row).toString().includes("https") ? (
                        <img src={col.render(row)} alt={col.header} className="w-24 aspect-square" />
                      ) : (
                        col.render(row)
                      )}
                     
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

      {/* Mobile View */}
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
                    {col.render(row).toString().includes("https") ? (
                      <img src={col.render(row)} alt={col.header} className="w-24 aspect-square" />
                    ) : (
                      col.render(row)
                    )}
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
