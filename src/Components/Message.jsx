import React from "react";
import classNames from "classnames";
import { FaInfoCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";

const Message = ({ text, variant }) => {
  const baseStyles = "p-4 rounded-md w-full flex items-center gap-2";

  const variants = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div className={classNames(baseStyles, variants[variant])}>
      {variant === "info" && <FaInfoCircle />}
      {variant === "success" && <FaCheckCircle />}
      {variant === "error" && <FaTimesCircle />}
      {variant === "warning" && <FaExclamationTriangle />}
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Message;
