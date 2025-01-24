import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const AddUser = ({ closeAddUserDialog, userToEdit, onSubmit,onOpen}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "",
    role: "",
    status: "Active", // Default value for the status
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        fullName: userToEdit.fullName,
        designation: userToEdit.designation,
        email: userToEdit.email,
        role: userToEdit.role,
        status: userToEdit.active ? "Active" : "Inactive",
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      active: formData.status === "Active",
    });
  };

  return (
    <>
      {onOpen &&(
          <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg md:w-1/3 w-[80%] p-4">
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {userToEdit ? "Edit User" : "Add New User"}
              </h2>
              <div
                className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all"
                onClick={closeAddUserDialog}
              >
                <IoClose size={20} />
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
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
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-gray-600 rounded-lg focus:ring focus:ring-blue-300"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
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
