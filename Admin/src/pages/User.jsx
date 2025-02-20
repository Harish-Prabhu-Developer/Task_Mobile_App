//User.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
} from "../redux/slice/User/userSlice";
import AddUser from "../components/User/AddUser";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import CustomDeleteAlert from "../components/alert/CustomDeleteAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logowithname } from "../components/utils/logoIntoName";

const User = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [DeletedUserName, setDeletedUserName] = useState("this user");
  const dispatch = useDispatch();
  useEffect(() => {
    const getUsers = async () => {
      await dispatch(fetchUsers());
    };

    getUsers();
  }, [dispatch]);
  // Redux Hooks

  const Decodetoken = jwtDecode(localStorage.getItem("token"));
  const users = useSelector((state) => state.user.users);
  const openAddUserDialog = (user = null) => {
    setUserToEdit(user);
    setIsAddUserOpen(true);
  };

  const closeAddUserDialog = () => {
    setIsAddUserOpen(false);
    setUserToEdit(null);
  };

  const handleDelete = (_id) => {
    setDeletedUserName(users.find((user) => user._id === _id).name);
    setUserToDelete(_id);
    setOpenDelete(true);
  };

  const handleSubmit = async (formData) => {
    // Create a copy of formData to avoid direct mutation
    const submissionData = { ...formData };

    // Remove subRole if it's an empty string
    if (submissionData.subRole === "") {
      await delete submissionData.subRole;
    }

    try {
      if (userToEdit) {
        // Update existing user
        try {
          const res = await dispatch(
            editUser({ id: userToEdit._id, data: submissionData })
          );
          if (
            res.payload.status === "success" &&
            res.payload.msg === "User updated successfully"
          ) {
            toast.success("User updated successfully!");
            await dispatch(fetchUsers());
          } else if (res.payload.status === "fail") {
            toast.error(res.payload.msg);
          }
        } catch (error) {
          console.log("Updated User : ", error.message);
          toast.error(error.message);
        }
      } else {
        // Add new user
        try {
          const res = await dispatch(addUser(submissionData));
          if (
            res.payload.status === "success" &&
            res.payload.msg === "User created successfully"
          ) {
            toast.success("User added successfully!");
            await dispatch(fetchUsers());
          } else if (res.payload.status === "fail") {
            toast.error(res.payload.msg);
          }
        } catch (error) {
          console.log("Added User : ", error.message);
          toast.error(error.message);
        }
      }

      closeAddUserDialog();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("submit Add or Edit User", error.message);
    }
  };

  const confirmDelete = async () => {
    try {
      if (userToDelete !== null) {
        try {
          const res = await dispatch(deleteUser(userToDelete));
          if (
            res.payload.status === "success" &&
            res.payload.msg === "User deleted successfully"
          ) {
            toast.success("User deleted successfully!");
            await dispatch(fetchUsers());
          } else if (res.payload.status === "fail") {
            toast.error(res.payload.msg);
          }
        } catch (error) {
          console.log("Deleted User : ", error.message);
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error("ConfirmDelete:", error.message);
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
        title={"Confirm Delete"}
        message={`Are you sure you want to delete ${DeletedUserName} ?`}
        buttonText={"Delete"}
      />
      {/* Add/Edit User Modal */}
      <AddUser
        closeAddUserDialog={closeAddUserDialog}
        userToEdit={userToEdit}
        onOpen={isAddUserOpen}
        onSubmit={handleSubmit}
      />
      <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 overflow-x-hidden">
        {/* Top Title with Add Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Users List</h1>
          <button
            className={`bg-blue-600 flex flex-row items-center gap-2 justify-between hover:bg-blue-900 text-white px-5 py-2 rounded-md shadow-md transition-all
                      ${
                        Decodetoken.userLevel === "Admin" ||
                        Decodetoken.userLevel === "Manager"
                          ? ""
                          : "hidden"
                      }`}
            onClick={() => openAddUserDialog()}
          >
            <IoPersonAddSharp />
            <p>Add User</p>
          </button>
        </div>

        {/* Mobile View: Stacked Cards */}
        <div className="block md:hidden space-y-4">
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={user._id ? user._id : `user-${index}`}
                className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full"
              >
                <div className="flex items-center space-x-4">
                  <div>{logowithname(user.name, "w-10 h-10")}</div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium text-gray-800 break-words">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-600 break-words">
                      {user.subRole
                        ? user.role + " " + user.subRole
                        : user.role}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                    <h6>Email:</h6>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                    <h6>User Level:</h6>
                    <p className="font-medium">
                      {user.role} {user.subRole ? `${user.subRole}` : ""}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-row font-bold items-center gap-2 break-words">
                    <h6>Phone:</h6>
                    <p className="font-medium">{user.phone}</p>
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
                <div
                  className={`mt-4 flex justify-end space-x-2 ${
                    Decodetoken.userLevel === "Admin" ||
                    Decodetoken.userLevel === "Manager"
                      ? ""
                      : "hidden"
                  }`}
                >
                  <button
                    className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md transition-all"
                    onClick={() => openAddUserDialog(user)}
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    className={`px-4 py-2 bg-red-100 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition-all
                          ${Decodetoken.userLevel === "Admin" ? "" : "hidden"}`}
                    onClick={() => handleDelete(user._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No users found.
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white transition-all duration-300 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-yellow-200 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  User Level
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-md font-bold text-gray-600">
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-center text-md font-bold text-gray-600 ${
                    Decodetoken.userLevel === "Admin" ||
                    Decodetoken.userLevel === "Manager"
                      ? ""
                      : "hidden"
                  } `}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id ? user._id : `user-${index}`}
                    className="border-b hover:bg-gray-50 hover:shadow-lg transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-2 items-center">
                        <div>{logowithname(user.name, "w-10 h-10")}</div>
                        <p className="text-gray-600">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.role} {user.subRole ? `${user.subRole}` : ""}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.phone}</td>
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
                    <td
                      className={`px-6 py-4 text-center space-x-2 ${
                        Decodetoken.userLevel === "Admin" ||
                        Decodetoken.userLevel === "Manager"
                          ? ""
                          : "hidden"
                      }`}
                    >
                      <button
                        className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md transition-all"
                        onClick={() => openAddUserDialog(user)}
                      >
                        <MdModeEditOutline />
                      </button>
                      <button
                        className={`px-4 py-2 bg-red-100 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition-all
                        ${Decodetoken.userLevel === "Admin" ? "" : "hidden"}`}
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
