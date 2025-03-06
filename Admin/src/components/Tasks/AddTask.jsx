import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slice/User/userSlice";
import { logowithname } from "../utils/logoIntoName";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import { FaImages } from "react-icons/fa";
import { fetchProjects } from "../../redux/slice/Project/projectSlice";
import { getInitials } from "../utils";

const AddTask = ({ closeAddTasksDialog, TasksToEdit, onSubmit, onOpen,formStage }) => {
  const users = useSelector((state) => state.user.users);
  const projects = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null); // Reference for the file input

  // Priority options
  const priorityStatus = [
    { value: "normal", label: "Normal", styles: "bg-blue-100" },
    { value: "high", label: "High", styles: "bg-red-100 " },
    { value: "medium", label: "Medium", styles: "bg-yellow-100" },
    { value: "low", label: "Low", styles: "bg-green-100 " },
  ];

  // Stage options
  const stageStatus = [
    { value: "todo", label: "To Do", styles: "bg-blue-100" },
    { value: "in progress", label: "In Progress", styles: "bg-yellow-100 " },
    { value: "completed", label: "Completed", styles: "bg-green-100 " },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  const FORM_STAGE={
    Add:"Add New Task",
    Edit:"Edit Task",
    "Todo":"Add New Todo Task",
    "In Progress":"Add New In Progress Task",
    "Completed":"Add New Completed Task"
  }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: [],
    priority: "normal",
    stage: "todo",
    assets: [],
    dueDate: "",
  });

  useEffect(() => {
    if (TasksToEdit) {
      console.log("TasksToEdit:", TasksToEdit);
      
      setFormData({
        title: TasksToEdit.title || "",
        description: TasksToEdit.description || "",
        project:TasksToEdit.project || "",
        assignedTo: TasksToEdit.assignedTo.map((member) => member._id) || [],
        dueDate: TasksToEdit.dueDate ? TasksToEdit.dueDate.split("T")[0] : "",
        priority: TasksToEdit.priority || "normal",
        stage: TasksToEdit.stage || "todo",
        assets: TasksToEdit.assets || [],
      });
    }
  }, [TasksToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    fileInputRef.current.click(); // Programmatically open file dialog
    
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fileArray = Array.from(files);
      console.log("Uploaded Files:", fileArray);
      setFormData((prev) => ({
        ...prev,
        assets: [...prev.assets, ...fileArray],
      }));
      fileInputRef.current.value = null;
    }
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
              <h2 className="text-lg font-bold text-gray-800 uppercase">
                {FORM_STAGE[formStage]}
              </h2>
              <button
                className="p-2 bg-white text-black rounded-md hover:bg-red-600 hover:text-white transition-all"
                onClick={closeAddTasksDialog}
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Task Title */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">
                  Task Title
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

              {/* Description */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">
                  Task Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Task Description"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {/* Project */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">
                  Project
                </label>
                <Select
  options={projects.map((project) => ({
    value: project._id,
    label: (
      <div className="flex items-center space-x-2">
        {logowithname(project.name, "w-7 h-7")}
        <span className="text-gray-700">{project.name}</span>
      </div>
    ),
  }))}

  value={
    projects
      .filter((p) => p._id === formData.project) // Select only the current project
      .map((p) => ({
        value: p._id,
        label: (
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-800 font-bold text-white text-xs flex items-center justify-center">{getInitials(p.name)}</div>
            <span className="text-gray-700 ">{p.name}</span>
          </div>
        ),
      }))[0] || null // Ensure it's not an array
  }

  onChange={(selectedOption) =>
    setFormData((prev) => ({
      ...prev,
      project: selectedOption ? selectedOption.value : "", // Store only one project ID
    }))
  }
  className="w-full"
/>

              </div>
              {/* Assigned To */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1">
                  Assigned To
                </label>
                <Select
                  isMulti
                  options={users.map((user) => ({
                    value: user._id,
                    label: (
                      <div className="flex items-center space-x-2">
                        {logowithname(user.name, "w-7 h-7")}
                        <span className="text-gray-700">{user.name}</span>
                      </div>
                    ),
                  }))}
                  value={formData.assignedTo.map((memberId) => {
                    const user = users.find((u) => u._id === memberId);
                    return user
                      ? {
                          value: user._id,
                          label: (
                            <div className="flex items-center space-x-2">
                              {logowithname(user.name, "w-7 h-7")}
                              <span className="text-gray-700">{user.name}</span>
                            </div>
                          ),
                        }
                      : null;
                  })}
                  onChange={(selectedOptions) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignedTo: selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [],
                    }))
                  }
                  className="w-full"
                />
              </div>

              {/* Priority and Due Date */}
              <div className="flex flex-row justify-between space-x-4">
              <div>
                <label className="block text-gray-900 font-semibold mb-1">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 
                    ${priorityStatus.find((p) => p.value === formData.priority)?.styles}`}
                  required
                >
                  {priorityStatus.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between ">
               {/* Stage */}
               <div>
                <label className="block text-gray-900 font-semibold mb-1">Stage</label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 
                    ${stageStatus.find((s) => s.value === formData.stage)?.styles}`}
                  required
                >
                  {stageStatus.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </div>

                {/* Assets Upload */}
              <div>
                <div
                  className="flex items-center justify-center space-x-2 p-10 cursor-pointer text-gray-900 font-semibold mb-1"
                  onClick={handleImageUpload}
                >
                  <FaImages />
                  <p>Add Assets</p>
                </div>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="hidden"  
                  onChange={handleFileChange}
                />
              </div>
              </div>
              <div>
                {formData.assets.length > 0 && (
                  <p className="text-gray-700 text-center">Number of Assets: {formData.assets.length}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  onClick={closeAddTasksDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

export default AddTask;
