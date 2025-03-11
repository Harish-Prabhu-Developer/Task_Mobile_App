import React, { useState } from "react";
import { IMAGES } from "../../Config";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth/authSlice";
import Profile from "../User/Profile";
import ShowProfileDialog from "../User/ShowProfileDialog";
import ChangePassDialog from "../User/ChangePassDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomDeleteAlert from "../alert/CustomDeleteAlert";
import NotificationPanel from "../alert/NotificationPanel";
import ProfileAvatar from "../User/ProfileAvatar";

const Header = () => {
  const [profileDialog, setProfileDialog] = useState(false);
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [ConfirmLogDialog, setConfirmLogDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleConfirmLogout = () => {
    setConfirmLogDialog(true);
    setShowDialog(false);
  };
  // Logout Function
  const handleLogout = async () => {
    
    setConfirmLogDialog(false);
      await dispatch(logout());
      navigate("/login", { replace: true });
    
  };
  

  // Handle opening Change Password dialog
  const handleChangePass = () => {
    setChangePassDialog(true);
    setShowDialog(false);
  };

  const handleProfile = () => {
    setProfileDialog(true);
    setShowDialog(false);
  };

  // Handle submitting new password
  const handleSubmitChangePassword = (currentPassword, newPassword, confirmPassword) => {
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    if (newPassword !== confirmPassword) {
      toast.warn("New password and confirm password do not match.");
      return;
    }

    // Call API or dispatch Redux action here to update the password
    alert("Password changed successfully!");

    // Close dialog after success
    setChangePassDialog(false);
  };

  return (
    <>
      <CustomDeleteAlert
            message={"Are you sure you want to logout?"}
            title={"Logout Confirmation"}
            buttonText={"Logout"}
            onOpen={ConfirmLogDialog}
            onDelete={handleLogout}
            onCancel={() => setConfirmLogDialog(false)}/>
      <header className="w-full bg-gradient-to-l from-cyan-950 to-blue-800 p-2 shadow-md flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg border border-gray-300 flex items-center bg-white">
            <IoSearch size={20} className="text-gray-600" />
            <input
              type="search"
              placeholder="Search..."
              className="outline-none border-none ml-2"
            />
          </div>
        </div>



        {/* Profile Dropdown */}
        <div className="relative flex flex-row justify-between gap-4 items-center">
        <div >
        <NotificationPanel styles={`text-4xl mt-3`}/>
        </div>
        <div>
         <ProfileAvatar  styles={`w-9 h-9 `}/>
        </div>
          <ShowProfileDialog
            show={showDialog}
            handleLogout={handleConfirmLogout}
            handleProfile={handleProfile}
            handleChangePass={handleChangePass}
          />
        </div>
      </header>

      {/* Profile Dialog */}
      <Profile view={profileDialog} onClose={() => setProfileDialog(false)} />

      {/* Change Password Dialog */}
      <ChangePassDialog
        view={changePassDialog}
        onClose={() => setChangePassDialog(false)}
        handleSubmitChangePassword={handleSubmitChangePassword}
      />
    </>
  );
};

export default Header;
