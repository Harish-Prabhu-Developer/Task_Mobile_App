import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { ImMenu } from "react-icons/im";
import { IoFolderOpenSharp, IoLogOut, IoClose } from "react-icons/io5";
import { FaUserPlus, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

import profileImage from "../../assets/images/profile.png";

export const Mobilenavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MENU_ITEMS = [
    { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
    { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
    { id: "users", name: "Users", icon: <FaUserPlus /> },
    { id: "tasks", name: "Tasks", icon: <FaTasks /> },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-cyan-950 to-blue-800 p-4 text-white shadow-md">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl block sm:hidden focus:outline-none"
        >
          {isMenuOpen ? <IoClose /> : <ImMenu />}
        </button>

        {/* Title */}
        <div className="flex">
          <h1 className="text-lg font-bold">Mobile Navbar</h1>
        </div>

        {/* Profile Button */}
        <div
          className="ml-4 cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute rounded-lg top-16 left-2 bg-cyan-900 shadow-lg z-10 w-36 md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 text-white hover:border-yellow-200 rounded-lg transition-all"
              >
                <i className="text-lg">{item.icon}</i>
                <span className="text-md font-medium text-yellow-500">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute rounded-lg top-16 right-2 bg-cyan-950 shadow-lg z-10 w-40 md:hidden">
          {/* Profile Section */}
          <div className="flex items-center gap-2 p-3 border-b border-yellow-200">
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">John Doe</h2>
              <p className="text-xs text-yellow-200">Admin</p>
            </div>
          </div>
          {/* Edit Button */}
          <div
            className="flex border-b border-yellow-200 items-center justify-center p-2 text-yellow-500 hover:bg-blue-100 cursor-pointer rounded-t-lg transition-all"
            onClick={() => {
              alert("open");
              setIsProfileOpen(false);
            }}
          >
            <div className="text-md text-center font-medium">Edit</div>
          </div>
          {/* Logout Button */}
          <div
            className="flex items-center gap-2 justify-center p-2 text-red-500 hover:bg-red-100 cursor-pointer rounded-b-lg transition-all"
            onClick={() => {
              alert("Are you sure you want to logout?");
              setIsProfileOpen(false);
            }}
          >
            <IoLogOut size={24} />
            <span className="text-md font-medium">Logout</span>
          </div>
        </div>
      )}
    </>
  );
};
