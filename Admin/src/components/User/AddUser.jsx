import React from "react";
import {IoClose } from "react-icons/io5";
const AddUser = ({closeAddUserDialog}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Add New User</h2>
                    <div
                        className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all"
                        onClick={closeAddUserDialog}>
                        <IoClose size={20} />
                    </div>
                </div>
                    <form className="space-y-4">
                          <div>
                            <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 font-medium mb-1">Title</label>
                            <input
                              type="text"
                              placeholder="Title"
                              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 font-medium mb-1">Email</label>
                            <input
                              type="email"
                              placeholder="Email Address"
                              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 font-medium mb-1">Role</label>
                            <input
                              type="text"
                              placeholder="Role"
                              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                            />
                          </div>
                        </form>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
  );
};

export default AddUser;
