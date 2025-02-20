import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchUsers } from "../../redux/slice/User/userSlice";
import { logowithname } from "../utils/logoIntoName";

const STATUS_OPTIONS = [
  { value: "Not Started", label: "Not Started", color: "#3B82F6" },
  { value: "In Progress", label: "In Progress", color: "#EAB308" },
  { value: "Completed", label: "Completed", color: "#10B981" },
];

const AddProject = ({ closeAddProjectDialog, projectToEdit, onSubmit, onOpen }) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamMembers: [],
    startDate: "",
    endDate: "",
    status: "Not Started",
  });

  useEffect(() => {
    if (projectToEdit) {
      console.log("Editing Project:", projectToEdit);
      setFormData({
        name: projectToEdit.name || "",
        description: projectToEdit.description || "",
        teamMembers: projectToEdit.teamMembers.map((member) => member._id) || [],
        startDate: projectToEdit.startDate ? projectToEdit.startDate.split("T")[0] : "",
        endDate: projectToEdit.endDate ? projectToEdit.endDate.split("T")[0] : "",
        status: projectToEdit.status || "Not Started",
      });
    }
  }, [projectToEdit]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeAddProjectDialog();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeAddProjectDialog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, status: selectedOption.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      {onOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {projectToEdit ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all"
                onClick={closeAddProjectDialog}
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Project Name */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Project Name"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Project Description"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Team Members Multi-Select */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Team Members</label>
                <Select
                    isMulti
                    options={users.map((user) => ({
                      value: user._id,
                      label: (
                        <div className="flex items-center space-x-2">
                          {logowithname(user.name,"w-7 h-7")}
                          <span className="text-gray-700">{user.name}</span>
                        </div>
                      ),
                    }))}

                    value={formData.teamMembers
                      .map((memberId) => {
                        const user = users.find((u) => u._id === memberId);
                        return user
                          ? {
                              value: user._id,
                              label: (
                                <div className="flex items-center space-x-2">
                                  {logowithname(user.name,"w-7 h-7")}
                                  <span className="text-gray-700">{user.name}</span>
                                </div>
                              ),
                            }
                          : null;
                      })
                      .filter(Boolean)} // Removes null values

                    onChange={(selectedOptions) =>
                      setFormData((prev) => ({
                        ...prev,
                        teamMembers: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                      }))
                    }
                    className="w-full"
                  />

              </div>
              {/* Status Dropdown */}
              <div >
                <label className="block text-gray-900 font-semibold mb-1">Project Status</label>
                <Select
                  options={STATUS_OPTIONS}
                  getOptionLabel={(e) => (
                    <div className="flex items-center">
                      <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: e.color }}></span>
                      {e.label}
                    </div>
                  )}
                  value={STATUS_OPTIONS.find((s) => s.value === formData.status)}
                  onChange={handleStatusChange}
                  className="w-full"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
                  onClick={closeAddProjectDialog}
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

export default AddProject;
