//SideandMobilenavbar.jsx
import React, { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { FaUserPlus, FaTasks } from "react-icons/fa";
import { NavLink, useNavigate} from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { IoFolderOpenSharp, IoLogOut, IoClose } from "react-icons/io5";
import profileImage from "../../assets/images/profile.png";
import companyLogo from "../../assets/images/companylogo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth/authSlice";

const MENU_ITEMS = [
  { id: "dashboard", name: "Dashboard", icon: <RiDashboard3Line /> },
  { id: "projects", name: "Projects", icon: <IoFolderOpenSharp /> },
  { id: "users", name: "Users", icon: <FaUserPlus /> },
  {
    id: "tasks", name: "Tasks", icon: <FaTasks />, subMenu: [
      { id: "todos-tasks", name: "Todos Tasks", path: "/tasks/todos" },
      { id: "in-progress-tasks", name: "In Progress Tasks", path: "/tasks/in-progress" },
      { id: "completed-tasks", name: "Completed Tasks", path: "/tasks/completed" },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const linkClasses =
    "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-600 text-white";
  const activeLinkClasses =
    "flex items-center gap-4 p-3 rounded-lg bg-blue-600 text-white";

    const handleLogout = () => {
      if (window.confirm("Are you sure you want to logout?")) {
        dispatch(logout());
        navigate("/login", { replace: true }); // Ensure smooth redirect
      }
    };
  return (
    <div className="flex h-full">
      <div
        className={`${isOpen ? "w-72" : "w-20"
          } bg-gradient-to-t from-cyan-950 to-blue-800 text-white transition-all duration-300 flex flex-col items-start relative h-full shadow-lg`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-4 px-4 mt-6 transition-all duration-300">
          <img
            src={companyLogo}
            alt="Company Logo"
            className={`rounded-md transition-all duration-300 ${isOpen ? "w-10 h-10" : "w-8 h-8"}`}
          />
          <h1
            className={`text-xl font-bold text-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
          >
            SWOMB
          </h1>
        </div>

        <nav className="mt-10 w-full flex flex-col gap-4 px-4">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={({ isActive }) =>
                isActive ? activeLinkClasses : linkClasses
              }
            >
              <i className="text-2xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </i>
              <span
                className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                  }`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto w-full">
          <div className="flex items-center justify-between gap-4 px-4 py-4 transition-all duration-300">
            <img
              src={profileImage}
              alt="Profile"
              className={`rounded-full border-4 border-white transition-all duration-300 ${isOpen ? "w-12 h-12" : "w-8 h-8"
                }`}
            />
            <div
              className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                }`}
            >
              <h2 className="text-sm font-semibold">John Doe</h2>
              <p className="text-xs text-yellow-300">Admin</p>
            </div>
            <button
              className="p-4 bg-transparent rounded-lg hover:bg-yellow-200"
              onClick={handleLogout}
            >
              <IoLogOut size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobilenavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkClasses = "flex items-center gap-4 text-white rounded-md transition-all";
  const activeLinkClasses = "flex items-center gap-4 text-yellow-300 bg-blue-800 rounded-md transition-all";
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
            src={companyLogo}
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
            src={profileImage}
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
