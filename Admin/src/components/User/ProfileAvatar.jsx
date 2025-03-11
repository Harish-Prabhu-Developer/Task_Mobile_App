import { useState, useEffect, useRef } from "react";
import { IMAGES } from "../../Config";
import { IoLogOut, IoKey, IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/auth/authSlice";
import CustomDeleteAlert from "../alert/CustomDeleteAlert";
import Profile from "./Profile";
import ChangePassDialog from "./ChangePassDialog";

const ProfileAvatar = ({styles}) => {
  const [open, setOpen] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [confirmLogDialog, setConfirmLogDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Toggle the profile dropdown
  const togglePanel = () => setOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout confirmation
  const handleConfirmLogout = () => {
    setConfirmLogDialog(true);
    setOpen(false);
  };

  // Logout function
  const handleLogout = async () => {
    setConfirmLogDialog(false);
    await dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Open change password dialog
  const handleChangePass = () => {
    setChangePassDialog(true);
    setOpen(false);
  };

  // Open profile dialog
  const handleProfile = () => {
    setProfileDialog(true);
    setOpen(false);
  };

  return (
    <>
      {/* Logout Confirmation Dialog */}
      <CustomDeleteAlert
        message="Are you sure you want to logout?"
        title="Logout Confirmation"
        buttonText="Logout"
        onOpen={confirmLogDialog}
        onDelete={handleLogout}
        onCancel={() => setConfirmLogDialog(false)}
      />

      {/* Profile Dialog */}
      <Profile view={profileDialog} onClose={() => setProfileDialog(false)} />

      {/* Change Password Dialog */}
      <ChangePassDialog
        view={changePassDialog}
        onClose={() => setChangePassDialog(false)}
      />

      {/* Profile Avatar & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={togglePanel} className="outline-none">
          <img
            src={IMAGES.profileImage}
            alt="Profile"
            className={`${styles} rounded-full border-2 border-white cursor-pointer`}
          />
        </button>

        {open && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-300">
            <div className="flex flex-col divide-y divide-gray-200">
              <button
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-t-lg"
                onClick={handleProfile}
              >
                <IoPerson size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Profile</span>
              </button>

              <button
                className="flex items-center gap-3 p-3 hover:bg-gray-100"
                onClick={handleChangePass}
              >
                <IoKey size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Change Password</span>
              </button>

              <button
                className="flex items-center gap-3 p-3 hover:bg-red-100 rounded-b-lg"
                onClick={handleConfirmLogout}
              >
                <IoLogOut size={20} className="text-red-500" />
                <span className="text-sm font-medium text-red-500">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileAvatar;
