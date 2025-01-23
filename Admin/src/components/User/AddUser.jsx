import React from "react";

const AddUser = () => {
  return (
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
  );
};

export default AddUser;
