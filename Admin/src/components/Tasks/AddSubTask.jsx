import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const AddSubTask = ({ closeAddSubTasksDialog,SubTasksToEdit, onSubmit, onOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    tag: "",
  });

  useEffect(() => {
    if (SubTasksToEdit) {
      setFormData({
        title: SubTasksToEdit.title || "",
        date: SubTasksToEdit.date || "",
        tag: SubTasksToEdit.tag || "",
      });
    }
  }, [SubTasksToEdit]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(...SubTasksToEdit,...formData);
  };

  return (
    <>
      {onOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 uppercase">
                {SubTasksToEdit ? "Edit Sub-Task" : "Add Sub-Task"}
              </h2>
              <button
                className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all"
                onClick={closeAddSubTasksDialog}
              >
                <IoClose size={20} />
              </button>
            </div>
            {/* Form */}
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Task Name */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter Task Title"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {/*Task Date and tag*/}
              <div className="flex flex-row justify-between">
              <div className="w-1/2">
                  <label className="block text-gray-900 font-semibold mb-1">
                    Task Date
                  </label>
                  <input
                    type="date"
                    name="TaskDate"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>

                <div calssName="w-1/2">
                <label className="block text-gray-900 font-semibold mb-1">
                  Tag
                </label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="Enter Task tag"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  onClick={closeAddSubTasksDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleSubmit}
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

export default AddSubTask;
