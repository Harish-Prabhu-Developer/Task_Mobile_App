import React, { useState, useRef, useEffect } from "react";
import { getInitials, GETROLE } from "../utils";
import { getUniqueColor } from "../utils/logoIntoName";

const UserInfo = ({ user,styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const handleMouseEnter = () => {
    setTimeout(() => setIsOpen(true), 200); // Delay popover open
  };
  
  const handleMouseLeave = () => {
    setTimeout(() => setIsOpen(false), 200); // Delay popover close
  };
  

  return (
    <div className="relative px-4" ref={popoverRef}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      {/* Button to open popover */}
      <button
        className="inline-flex items-center outline-none"
      >
        <span>
          {getInitials(user?.name)}
        </span>
      </button>

      {/* Popover Content */}
      {isOpen && (
        <div className={`absolute left-1/2 ${styles} z-10 mt-3 w-80 max-w-sm bg-white shadow-lg rounded-lg p-4 animate-fade-in`}>
          <div className="flex justify-center items-center gap-4">
            <div className={`w-10 h-10 ${getUniqueColor(user?.name)} rounded-full text-white flex items-center justify-center text-lg`}>
              <span className="text-center font-bold">
                {getInitials(user?.name)}   
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-black text-xl font-bold">{user?.name}</p>
              <span className="text-base text-gray-500">{GETROLE(user)}</span>
              <span className="text-blue-500">
                {user?.email ?? "email@example.com"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
