import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { IoFolderOpenSharp } from "react-icons/io5";
import { FaUserPlus,FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Project", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "User", icon: <FaUserPlus /> },
    { id: "tasks", name: "Task", icon: <FaTasks /> },
  ];
  return (
    <div className="flex">
      <div
        className={`${isOpen ? "w-64" : "w-16"}
              bg-cyan-950 h-screen text-white transition-width duration-300 flex flex-col items-start relative`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <nav className="mt-10">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative group p-2"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to={`/${item.id}`} className="flex items-center px-4 py-2 hover:bg-red-700 transition-colors">
              
                <i className="text-2xl mr-4">{item.icon}</i>
                {isOpen && <span className="font-light">{item.name}</span>}
              
              </Link>
              {!isOpen && hoveredItem === item.id && (
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
