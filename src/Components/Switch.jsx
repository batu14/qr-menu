import React from "react";

const Switch = ({ value, setValue }) => {
  const classNames =
    "w-10 h-5 bg-gray-300 transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer";
  const activeClassNames = "bg-green-500";
  const inactiveClassNames = "bg-gray-500";

  const activeDivClassNames = "justify-end";
  const inactiveDivClassNames = "justify-start";

  return (
    <div
      className={`flex items-center gap-2 ${
        value ? activeDivClassNames : inactiveDivClassNames
      }`}
    >
      <span
        onClick={() => setValue(!value)}
        className={`${classNames} ${
          value ? activeClassNames : inactiveClassNames
        }`}
      >
        <span className={`w-4 h-4 bg-white rounded-full transition-all duration-300`}></span>
      </span>
      <span>{value ? "Aktif" : "Pasif"}</span>
    </div>
  );
};

export default Switch;
