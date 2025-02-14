import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Switch from "../auth/Switch";// Import the custom switch component

const ROLES = ["User", "Admin", "Manager", "Junior", "Senior"];
const SUB_ROLES = ["soe", "Sre", "designer", "developer", "tester"];

const AddUser = ({ closeAddUserDialog, userToEdit, onSubmit, onOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    subRole: "",
    phone: "",
    password: "Swomb@123",
    tfa: true, // Changed to boolean
    active: true, // Changed to boolean
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
        role: userToEdit.role || "",
        subRole: userToEdit.subRole || "",
        phone: userToEdit.phone || "",
        tfa: !!userToEdit.tfa, // Ensure it's a boolean
        active: !!userToEdit.active, // Ensure it's a boolean
      });
    }
  }, [userToEdit]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAddUserDialog();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAddUserDialog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "role") {
        if (value === "Junior" || value === "Senior") {
          updatedForm.subRole = updatedForm.subRole || "tester";
        } else {
          updatedForm.subRole = "";
        }
      }

      return updatedForm;
    });
  };

  const handleToggle = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      {onOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg md:w-1/3 w-[80%] p-4">
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {userToEdit ? "Edit User" : "Add New User"}
              </h2>
              <div
                className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                onClick={closeAddUserDialog}
              >
                <IoClose size={20} />
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                >
                  <option value="" disabled>Select Role</option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* SubRole Dropdown */}
              {["Junior", "Senior"].includes(formData.role) && (
                <div>
                  <label className="block text-gray-900 font-semibold mb-1">Sub Role</label>
                  <select
                    name="subRole"
                    value={formData.subRole}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                  >
                    <option value="" disabled>Select SubRole</option>
                    {SUB_ROLES.map((subRole) => (
                      <option key={subRole} value={subRole}>{subRole}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Phone */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              {/* TFA Switch */}
              <div className="flex items-center justify-between">
                <label className="block text-gray-900 font-semibold">TFA Status</label>
                <Switch checked={formData.tfa} onChange={() => handleToggle("tfa")} activeColor="bg-green-500" inActiveColor="bg-gray-500 border-black border-1" color="bg-white" />
              </div>

              {/* Active Status Switch */}
              <div className="flex items-center justify-between">
                <label className="block text-gray-900 font-semibold">Active Status</label>
                <Switch checked={formData.active} onChange={() => handleToggle("active")} activeColor="bg-green-500" inActiveColor="bg-gray-500 border-black border-1" color="bg-white"  />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
                  onClick={closeAddUserDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
