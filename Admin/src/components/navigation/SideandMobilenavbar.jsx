//SideandMobilenavbar.jsx
import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { FaUserPlus, FaTasks, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { MdDone, MdEdit } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { IoFolderOpenSharp, IoLogOut, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/auth/authSlice";
import { IMAGES } from "../../Config";
import Switch from "../auth/Switch";
const MENU_ITEMS = [
  { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
  { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
  { id: "users", name: "Users", icon: <FaUserPlus /> },
  {
    id: "tasks",
    name: "Tasks",
    icon: <FaTasks />,
    subMenu: [
      {
        id: "todos-tasks",
        name: "Todos Tasks",
        path: "/tasks/todos",
        icon: <RiTodoFill />,
      },
      {
        id: "in-progress-tasks",
        name: "In Progress Tasks",
        path: "/tasks/in-progress",
        icon: <GrInProgress />,
      },
      {
        id: "completed-tasks",
        name: "Completed Tasks",
        path: "/tasks/completed",
        icon: <MdDone />,
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [ShowProfileDialog,setShowProfileDialog]= useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const linkClasses =
  "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-600 text-white";
  const activeLinkClasses =
    "flex items-center gap-4 p-3 rounded-lg bg-blue-600 text-white";


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
    <div className="flex h-full">
      <div
        className={`${
          isOpen || isProfileHovered ? "w-72" : "w-20"
        } bg-gradient-to-t from-cyan-950 to-blue-800 text-white transition-all duration-300 flex flex-col relative h-full shadow-lg`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          if (!isProfileHovered) setIsOpen(false);
        }}
      >
        {/* Logo & Title */}
        <div className="flex items-center gap-4 px-4 mt-6">
          <img
            src={IMAGES.companyLogo}
            alt="Company Logo"
            className={`rounded-md ${isOpen ? "w-10 h-10" : "w-8 h-8"}`}
          />
          <h1
            className={`text-xl font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            SWOMB
          </h1>
        </div>

        {/* Navigation Menu */}
          <nav className="mt-6 w-full flex flex-col gap-2 px-4">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) =>
                  isActive ? activeLinkClasses : linkClasses
                }
              >
                <i className="text-2xl">{item.icon}</i>
                <span
                  className={`transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>

              </NavLink>         
            ))}
          </nav>
        

        {/* Profile Section */}
        <div
          className="mt-auto w-full px-4 py-4 bg-blue-900 rounded-t-lg"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => {
            setIsProfileHovered(false);
            setIsOpen(false);
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <img
              src={IMAGES.profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div
              className={`transition-opacity ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-sm font-semibold">John Doe</h2>
              <p className="text-xs text-yellow-300">Admin</p>
            </div>
            <button
              className="p-2 bg-transparent rounded-lg hover:bg-yellow-200"
              onClick={() => setShowProfileDialog(true)}
            >
              <MdEdit size={20} />
            </button>
          </div>

          {/* TFA Toggle */}
          <div className="flex items-center justify-between mt-2 pt-2 transition-all duration-300 ">
            <span
              className={`transition-opacity font-bold ${!isOpen && "hidden"}`}
            >
              TFA
            </span>
            <div className={`transition-all duration-300 shadow-lg`}>
              <Switch
                checked={tfaEnabled}
                onChange={() => setTfaEnabled(!tfaEnabled)}
              />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className={`flex items-center justify-center gap-4 w-full p-3 bg-red-800 hover:bg-red-600 transition-all duration-700 text-white 
            ${isOpen && "opacity-100"}`}
          onClick={handleLogout}
        >
          <IoLogOut size={24} />
          <p className={`transition-opacity ${!isOpen && "hidden"}`}>Logout</p>
        </button>
      </div>
    </div>
   {/* Profile Dialog */}
   {ShowProfileDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button className="p-2 text-gray-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" onClick={() => setShowProfileDialog(false)}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mt-4">
              <img src={IMAGES.profileImage} alt="Profile" className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-md" />
              <h2 className="text-lg font-bold text-gray-800 mt-2">you@swomb.app</h2>
              <p className="text-md text-yellow-600 mt-1">Admin</p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">Name</label>
                <input type="text" className="w-2/3 p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">Password</label>
                <input type="password" className="w-2/3 p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">Phone</label>
                <input type="text" className="w-2/3 p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">TFA</label>
                <Switch checked={tfaEnabled} onChange={() => setTfaEnabled(!tfaEnabled)} />
              </div>
              <button className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-950 transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Mobilenavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkClasses =
    "flex items-center gap-4 text-white rounded-md transition-all";
  const activeLinkClasses =
    "flex items-center gap-4 text-yellow-300 bg-blue-800 rounded-md transition-all";
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/login", { replace: true });
      setIsProfileOpen(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center bg-gradient-to-r from-cyan-950 to-blue-800 p-2 text-white shadow-md w-full fixed top-0">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl block sm:hidden focus:outline-none"
        >
          {isMenuOpen ? <IoClose /> : <ImMenu />}
        </button>

        <div className="flex gap-4">
          <img
            src={IMAGES.companyLogo}
            alt="Company Logo"
            className="w-7 h-7 rounded-lg border-2 border-gray-300"
          />
          <h1 className="text-lg font-bold">SWOMB</h1>
        </div>

        <button
          className="ml-4 cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img
            src={IMAGES.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed rounded-lg top-16 left-2 bg-blue-700 shadow-lg z-10 w-36 md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLinkClasses : linkClasses
                }
              >
                <i className="text-lg">{item.icon}</i>
                <span className="text-md font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {isProfileOpen && (
        <div className="fixed rounded-lg top-16 right-2 bg-blue-700 shadow-lg z-10 w-40 md:hidden">
          <div className="flex items-center gap-2 p-3 border-b border-gray-300">
            <img
              src={IMAGES.profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">Jone Doe</h2>
              <p className="text-xs text-yellow-200">Admin</p>
            </div>
          </div>
          {/* TFA Toggle */}
          <div className="flex border-b border-gray-300 items-center justify-between  p-2 text-white cursor-pointer rounded-t-lg transition-all">
            <span className="text-md text-center font-medium">TFA</span>
            <Switch
              checked={tfaEnabled}
              onChange={() => setTfaEnabled(!tfaEnabled)}
            />
          </div>
          {/* Edit Button */}
          <div
            className="flex border-b border-gray-300 items-center justify-center p-2 text-white hover:bg-blue-100 cursor-pointer rounded-t-lg transition-all"
            onClick={() => {
              alert("open");
              setIsProfileOpen(false);
            }}
          >
            <div className="text-md text-center font-medium">Edit</div>
          </div>
          {/* Logout Button */}
          <div
            className="flex items-center gap-2 justify-center p-2 text-yellow-500 hover:bg-red-100 cursor-pointer rounded-b-lg transition-all"
            onClick={handleLogout}
          >
            <IoLogOut size={24} />
            <span className="text-md font-medium">Logout</span>
          </div>
        </div>
      )}
    </>
  );
};

export { Sidebar, Mobilenavbar };
