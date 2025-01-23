import React, { useState } from "react";
import AddUser from "../components/User/AddUser";

const User = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false); // Dialog visibility state

  const openAddUserDialog = () => {
    setIsAddUserOpen(true);
  };

  const closeAddUserDialog = () => {
    setIsAddUserOpen(false);
  };

  const users = [
    { id: 1, fullName: "New User", title: "Designer", email: "user.email.com", role: "Developer", active: true },
    { id: 2, fullName: "Emily Wilson", title: "Data Analyst", email: "user.email.com", role: "Analyst", active: true },
    { id: 3, fullName: "Alex Johnson", title: "UX Designer", email: "user.email.com", role: "Designer", active: true },
    { id: 4, fullName: "Jane Smith", title: "Product Manager", email: "user.email.com", role: "Manager", active: false },
    { id: 5, fullName: "Codewave Asante", title: "Administrator", email: "user.email.com", role: "Admin", active: false },
  ];

  return (
    <div className="p-6 w-full space-y-6">
      {/* Top Title with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="sm:text-3xl text-xl font-semibold text-gray-800">Users List</h1>
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white px-5 py-2 rounded-md shadow-md transition-all"
          onClick={openAddUserDialog}
        >
          + Add User
        </button>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New User</h2>
            <AddUser />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-all"
                onClick={closeAddUserDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile View: Stacked Cards */}
      <div className="block md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full text-white bg-blue-700 flex items-center justify-center">
                {getInitials(user.fullName)}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">{user.fullName}</h2>
                <p className="text-sm text-gray-600">{user.title}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
              <p
                className={`text-sm font-medium mt-2 ${
                  user.active ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {user.active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-yellow-200 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-600">Full Name</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-600">Status</th>
              <th className="px-6 py-3 text-center text-md font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{logowithname(user.fullName)}</td>
                <td className="px-6 py-4 text-gray-600">{user.title}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <div
                    className={`inline-block px-5 py-2 text-sm font-medium rounded-full ${
                      user.active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </div>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="px-4 py-2 text-blue-600 rounded-md hover:bg-blue-700 hover:text-white transition-all">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition-all">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Utility functions
export function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  return initials.join("");
}

export function logowithname(name) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-full text-white bg-blue-700 flex items-center justify-center">
        {getInitials(name)}
      </div>
      <span className="text-gray-800">{name}</span>
    </div>
  );
}

export default User;
