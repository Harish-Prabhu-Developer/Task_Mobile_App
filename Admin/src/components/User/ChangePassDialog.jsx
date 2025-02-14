import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const ChangePassDialog = ({ view, onClose, handleSubmitChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = () => {
    handleSubmitChangePassword(currentPassword, newPassword, confirmPassword);
  };

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose]);
  return (
    <>
      {view && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[80%] sm:w-96 rounded-2xl shadow-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
              <button
                className="p-2 text-gray-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                onClick={onClose}
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Form */}
            <div className="mt-4 space-y-4">
              {/* Current Password */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="p-2 border border-gray-300 rounded-lg"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="p-2 border border-gray-300 rounded-lg"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="p-2 border border-gray-300 rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              {/* Submit Button */}
              <button
                className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-950 transition-all"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassDialog;
