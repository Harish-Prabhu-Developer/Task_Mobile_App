import React from "react";

const CustomLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
      <div className="text-center text-white font-bold p-4 "> Please Wait!</div>
    </div>
  );
};

export default CustomLoading;
