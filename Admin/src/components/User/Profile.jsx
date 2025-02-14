import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5"; // Ensure IoClose is imported
import { IMAGES } from "../../Config"; // Import images
import Switch from "../auth/Switch"; // Import the Switch component
import AvatarEditor from "react-avatar-editor";
import { toast } from 'react-toastify';
const Profile = ({ view, onClose }) => {
  const [tfaEnabled, setTfaEnabled] = useState(false);

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
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button className="p-2 text-gray-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" onClick={onClose}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mt-4">
              <div onClick={() => toast.success("Image uploaded successfully!")}>
                <img src={IMAGES.profileImage} alt="Profile" className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-md" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mt-2">you@swomb.app</h2>
              <p className="text-md text-yellow-600 mt-1">Admin</p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-medium text-gray-700">Name</label>
                <input type="text" className="w-2/3 p-2 border border-gray-300 rounded-lg" />
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

export default Profile;
