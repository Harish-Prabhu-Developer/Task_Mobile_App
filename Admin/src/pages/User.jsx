import React from "react";

export default function User() {
  // Dummy data for the table
  const users = [
    {
      id: 1, // Add a unique ID
      fullName: "New User",
      title: "Designer",
      email: "user.email.com",
      role: "Developer",
      active: true,
    },
    {
      id: 2,
      fullName: "Emily Wilson",
      title: "Data Analyst",
      email: "user.email.com",
      role: "Analyst",
      active: true,
    },
    {
      id: 3,
      fullName: "Alex Johnson",
      title: "UX Designer",
      email: "user.email.com",
      role: "Designer",
      active: true,
    },
    {
      id: 4,
      fullName: "Jane Smith",
      title: "Product Manager",
      email: "user.email.com",
      role: "Manager",
      active: true,
    },
    {
      id: 5,
      fullName: "Codewave Asante",
      title: "Administrator",
      email: "user.email.com",
      role: "Admin",
      active: true,
    },
  ];
  
  return (
    <div className="p-6 w-full space-y-6">
      {/* Top Title with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="sm:text-3xl text-xl font-semibold text-gray-800 ">Users List</h1>
        <button className="bg-blue-600 hover:bg-blue-900 text-white px-5 py-2 rounded-md shadow-md transition-all">
          + Add User
        </button>
      </div>

      {/* Mobile and Desktop Views */}
      <div>
        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg font-bold">
                  {getInitials(user.fullName)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-500">{user.title}</p>
                </div>
              </div>
              <div className="text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Role:</span>{" "}
                  {user.role}
                </p>
                <div
                  className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full ${
                    user.active
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.active ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="flex justify-between space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                  Edit
                </button>
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
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
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-md font-bold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{logowithname(user.fullName)}</td>
                  <td className="px-6 py-4 text-gray-600">{user.title}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.role}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-block px-5 py-2 text-sm font-medium rounded-full ${
                        user.active
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
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
    </div>
  );
}

// Utility to get initials from a full name
export function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  return initials.join("");
}

// Display name with initials for avatar
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
