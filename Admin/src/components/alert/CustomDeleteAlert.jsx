import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CustomDeleteAlert = ({ onCancel, onDelete, onOpen,title,message,buttonText }) => {
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onCancel();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onCancel]);
  return (
    <>
      {onOpen &&(
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg md:max-w-sm md:w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:text-white hover:bg-red-500 transition-colors">
              <IoClose size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            {message}
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default CustomDeleteAlert;
