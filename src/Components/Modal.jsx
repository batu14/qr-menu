import React from "react";
import { useSelector } from "react-redux";

const Modal = ({ children, isOpen = false, setIsOpen }) => {
  const toggleHandel = (e) => {
    if (e.target.classList.contains("modal-container")) {
      setIsOpen(false);
    } else {
      e.stopPropagation();
    }
  };
  if (isOpen) {
    return (
      <div
        onClick={(e) => {
          toggleHandel(e);
        }}
        className={`fixed inset-0 p-4 md:p-0 modal-container bg-black/50 bg-opacity-50 flex justify-center items-center top-0 left-0 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    );
  }
};

export default Modal;
