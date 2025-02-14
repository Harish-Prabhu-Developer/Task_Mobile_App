//Switch.jsx
import React from "react";

const Switch = ({ checked, onChange,activeColor="bg-green-500",inActiveColor="bg-gray-400" ,color="bg-white"}) => {
   return (
    <div
      className={`w-12 h-6 flex items-center shadow-lg rounded-full p-1 cursor-pointer transition-all ${checked ? activeColor : inActiveColor}`}
      onClick={onChange}
    >
      <div
        className={`w-5 h-5 rounded-full ${color} shadow-md transform transition-all ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
