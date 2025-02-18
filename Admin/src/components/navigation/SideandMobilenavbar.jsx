//SideandMobilenavbar.jsx
import React, { useEffect, useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { FaUserPlus, FaTasks, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { MdDone, MdEdit } from "react-icons/md";
import { RiTodoFill } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { IoFolderOpenSharp, IoLogOut, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfile } from "../../redux/slice/auth/authSlice";
import { IMAGES } from "../../Config";
import Switch from "../auth/Switch";
import Profile from "../User/Profile";
import CustomDeleteAlert from "../alert/CustomDeleteAlert";
import { ADMIN_MENU_ITEMS, JUNIOR_AND_SENIOR_MENU_ITEMS, MANAGER_MENU_ITEMS, MENU_ITEMS, USER_MENU_ITEMS } from "./NavMenus";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState("");
  const linkClasses =
  "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-600 text-white";
  const activeLinkClasses =
    "flex items-center gap-4 p-3 rounded-lg bg-blue-600 text-white";
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {

      try {
        const decoded = jwtDecode(token);
        console.log(`Decoded UserLevel: ${decoded.userLevel}`);
        
        console.log("Decoded Token Data:", decoded);         
        // Extract first word of userLevel (e.g., "Senior" from "Senior Developer")
        setUserRole(decoded?.userLevel?.split(" ")[0] || "");

        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        localStorage.removeItem("isLoggedIn");
      }
    }

    dispatch(setProfile()); // Fetch user profile on mount
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

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
          onMouseLeave={() => !isProfileHovered && setIsOpen(false)}
        >
          {/* Logo */}
          <div className="flex items-center gap-4 px-4 mt-6">
            <img
              src={IMAGES.companyLogo}
              alt="Company Logo"
              className={`rounded-md ${isOpen ? "w-10 h-10" : "w-8 h-8"}`}
            />
            <h1 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
              SWOMB
            </h1>
          </div>

          {/* Navigation Menu with Role -based Links */}
          <nav className="mt-6 w-full flex flex-col gap-2 px-4">
            {/*Admin nav */}
            {decodedToken?.userLevel === "Admin" && (
              ADMIN_MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                  }
                >
                  <i className="text-2xl">{item.icon}</i>
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </NavLink>
              ))
            )}
            {/*Manager nav */}
            {decodedToken?.userLevel === "Manager" && (
              MANAGER_MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                  }
                >
                  <i className="text-2xl">{item.icon}</i>
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </NavLink>
              ))
            )}
            {/*User nav */}
            {decodedToken?.userLevel === "User" && (
              USER_MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                  }
                >
                  <i className="text-2xl">{item.icon}</i>
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </NavLink>
              ))
            )}
            {/*Junior nav */}
            {userRole.trim() === "Junior" && (
              JUNIOR_AND_SENIOR_MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                  }
                >
                  <i className="text-2xl">{item.icon}</i>
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </NavLink>
              ))
            )}
            {/*Senior nav */}
            {userRole.trim() === "Senior" && (
              JUNIOR_AND_SENIOR_MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : linkClasses
                  }
                >
                  <i className="text-2xl">{item.icon}</i>
                  <span className={`${isOpen ? "block" : "hidden"}`}>
                    {item.name}
                  </span>
                </NavLink>
              ))
            )}
          </nav>

          {/* Profile Section */}
          <div
            className={`mt-auto w-full transition-all duration-300 p-4 cursor-pointer ${isOpen?'':'hidden'}`}
            onClick={() => setShowProfileDialog(true)}
          >
            <div className="flex items-center gap-4">
              <img
                src={IMAGES.profileImage}
                alt="Profile"
                className="rounded-full border-2 border-white w-12 h-12"
              />
              {isOpen && (
                <div className="justify-center">
                    <h2 className="text-sm text-center font-semibold">{user?.name || "User"}</h2>
                    <p className="text-xs text-center text-yellow-300">{user?.userLevel?.trim() || "Member"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dialog */}
      <Profile view={showProfileDialog} onClose={() => setShowProfileDialog(false)} />
    </>
  );
};

const Mobilenavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ShowProfileDialog,setShowProfileDialog]= useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ConfirmLogDialog, setConfirmLogDialog] = useState(false);
  
  const linkClasses =
    "flex items-center gap-4 text-white rounded-md transition-all";
  const activeLinkClasses =
    "flex items-center gap-4 text-yellow-300 bg-blue-800 rounded-md transition-all";
  const handleLogout = () => {
      setShowProfileDialog(false);
      dispatch(logout());
      navigate("/login", { replace: true });
      setIsProfileOpen(false);
    
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
              setShowProfileDialog(true);
              setIsProfileOpen(false);
            }}
          >
            <div className="text-md text-center font-medium">Edit</div>
          </div>
          {/* Logout Button */}
          <div
            className="flex items-center gap-2 justify-center p-2 text-yellow-500 hover:bg-red-100 cursor-pointer rounded-b-lg transition-all"
            onClick={() => {
              setConfirmLogDialog(true);
              setIsProfileOpen(false);
            }}
          >
            <IoLogOut size={24} />
            <span className="text-md font-medium">Logout</span>
          </div>
        </div>
      )}
       <Profile view={ShowProfileDialog} onClose={() => setShowProfileDialog(false)} />
       <CustomDeleteAlert
            message={"Are you sure you want to logout?"}
            title={"Logout Confirmation"}
            buttonText={"Logout"}
            onOpen={ConfirmLogDialog}
            onDelete={handleLogout}
            onCancel={() => setConfirmLogDialog(false)}/>
    </>
  );
};

export { Sidebar, Mobilenavbar };
