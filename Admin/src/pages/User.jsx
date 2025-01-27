//User.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, deleteUser } from "../redux/slice/auth/userSlice";
import AddUser from "../components/User/AddUser";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import CustomDeleteAlert from "../components/alert/CustomDeleteAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  //Redux Hooks 
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const openAddUserDialog = (user = null) => {
    setUserToEdit(user);
    setIsAddUserOpen(true);
  };

  const closeAddUserDialog = () => {
    setIsAddUserOpen(false);
    setUserToEdit(null);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setOpenDelete(true);
  };

  const handleSubmit = (formData) => {
    if (userToEdit) {
      // Update existing user
      dispatch(editUser({ id: userToEdit.id, data: formData }));
    } else {
      // Add new user
      dispatch(addUser(formData));
    }
    closeAddUserDialog();
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      dispatch(deleteUser(userToDelete));
      toast.success("Deleted successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpenDelete(false);
    setUserToDelete(null);
  };

  return (
    <>
      <CustomDeleteAlert
        onOpen={openDelete}
        onCancel={() => setOpenDelete(false)}
        onDelete={confirmDelete}
        title={"Delete User"}
        message={`Are you sure you want to delete this user?`}
      />
      {/* Add/Edit User Modal */}
      <AddUser
        closeAddUserDialog={closeAddUserDialog}
        userToEdit={userToEdit}
        onOpen={isAddUserOpen}
        onSubmit={handleSubmit}
      />
      <div className="p-6 w-full space-y-6 overflow-x-hidden">
        {/* Top Title with Add Button */}
        <div className="flex items-center justify-between">
          <h1 className="sm:text-3xl text-xl font-semibold text-gray-800">
            Users List
          </h1>
          <button
            className="bg-blue-600 flex flex-row items-center gap-2 justify-between hover:bg-blue-900 text-white px-5 py-2 rounded-md shadow-md transition-all"
            onClick={() => openAddUserDialog()}
          >
            <IoPersonAddSharp />
            <p>Add User</p>
          </button>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="block md:hidden mt-48 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 w-full"
            >
              <div className="flex items-center space-x-4">
                <div>{logowithname(user.fullName)}</div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-800 break-words">
                    {user.fullName}
                  </h2>
                  <p className="text-sm text-gray-600 break-words">
                    {user.designation}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                  <h6>Email:</h6>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                  <h6>Role:</h6>
                  <p className="font-medium">{user.role}</p>
                </div>
                <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                  <h6>Status:</h6>
                  <p
                    className={`text-sm font-medium ${
                      user.active ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                  onClick={() => openAddUserDialog(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-yellow-200 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Designation
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
                  <td className="px-6 py-4">
                    <div className="flex flex-row gap-2 items-center">
                      <div>{logowithname(user.fullName)}</div>
                      <p className="text-gray-600">{user.fullName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.designation}
                  </td>
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
                    <button
                      className="px-4 py-2 text-blue-600 rounded-md hover:bg-blue-700 hover:text-white transition-all"
                      onClick={() => openAddUserDialog(user)}
                    >
                      <div className="flex gap-2 flex-row justify-between items-center">
                        <MdModeEditOutline />
                        <p>Edit</p>
                      </div>
                    </button>
                    <button className="px-4 py-2 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition-all">
                      <div
                        className="flex gap-2 flex-row justify-between items-center"
                        onClick={() => handleDelete(user.id)}
                      >
                        <MdDelete />
                        <p>Delete</p>
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Utility functions
export function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  return initials.join("");
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-emerald-500",
];

function getUniqueColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash); // Generate a hash
  }
  const colorIndex = Math.abs(hash) % colors.length; // Map hash to a color index
  return colors[colorIndex];
}

export function logowithname(name) {
  const uniqueColor = getUniqueColor(name);

  return (
    <div className="flex gap-4 items-center">
      <div
        className={`w-10 h-10 rounded-full text-white ${uniqueColor} flex items-center justify-center`}
      >
        {getInitials(name)}
      </div>
    </div>
  );
}

export default User;
