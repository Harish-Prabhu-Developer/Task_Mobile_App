//Switch.jsx
import React from "react";

const Switch = ({ checked, onChange }) => {
    console.log("checked",checked);
   return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${checked ? "bg-green-500" : "bg-gray-400"}`}
      onClick={onChange}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
