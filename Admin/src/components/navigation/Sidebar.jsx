import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { IoFolderOpenSharp, IoLogOut } from "react-icons/io5";
import { FaUserPlus, FaTasks } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import profileImage from "../../assets/images/profile.png";
import companyLogo from "../../assets/images/comanylogo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    { id: "tasks", name: "Tasks", icon: <FaTasks /> },
  ];

  const linkClasses =
    "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-600 text-white";
  const activeLinkClasses =
    "flex items-center gap-4 p-3 rounded-lg bg-blue-600 text-white";

  return (
    <div className="flex h-full">
      {/* Sidebar Container */}
      <div
        className={`${
          isOpen ? "w-72" : "w-20"
        } bg-gradient-to-t from-cyan-950 to-blue-800 text-white transition-all duration-300 flex flex-col items-start relative h-full shadow-lg`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Company Logo and Name */}
        <div className="flex items-center gap-4 px-4 mt-6 transition-all duration-300">
          <img
            src={companyLogo}
            alt="Company Logo"
            className={`transition-all duration-300 rounded-md ${
              isOpen ? "w-10 h-10" : "w-8 h-8"
            }`}
          />
          <h1
            className={`text-xl font-bold text-white transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            SWOMB
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="mt-10 w-full flex flex-col gap-4 px-4">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={({ isActive }) =>
                isActive ? activeLinkClasses : linkClasses
              }
            >
              <i
                className={`text-2xl transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </i>
              <span
                className={`transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Profile Section with Logout */}
        <div className="mt-auto w-full">
          {/* Profile */}
          <div className="flex items-center justify-between gap-4 px-4 py-4 transition-all duration-300">
            <img
              src={profileImage}
              alt="Profile"
              className={`rounded-full border-4 border-white transition-all duration-300 ${
                isOpen ? "w-12 h-12" : "w-8 h-8"
              }`}
            />
            <div
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              <h2 className="text-sm font-semibold">John Doe</h2>
              <p className="text-xs text-yellow-300">Admin</p>
            </div>
            {/* Logout */}
            <div
              className="p-4 transition-all duration-300 bg-transparent rounded-lg hover:bg-yellow-200"
              onClick={() => alert("Are you sure you want to log out?")}
            >
              <IoLogOut size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
