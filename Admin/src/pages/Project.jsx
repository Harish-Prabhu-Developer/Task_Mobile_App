import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaTh, FaList, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddProject from "../components/Project/AddProject";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../redux/slice/Project/projectSlice";
import { toast } from "react-toastify";
import { getInitials, getUniqueColor, logowithname } from "../components/utils/logoIntoName";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { formatDate, PROJECT_TYPE } from "../components/utils";
import UserInfo from "../components/User/UserInfo";

const Project = () => {
  const [view, setView] = useState("board");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProjects = async () => {
      await dispatch(fetchProjects());
    };
    getProjects();
  }, [dispatch]);

  const projectData = useSelector((state) => state.project.projects);
  // Handle missing token
  const token = localStorage.getItem("token");
  const Decodetoken = token ? jwtDecode(token) : {};

  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const openAddProjectDialog = (project = null) => {
    setProjectToEdit(project);
    setIsAddProjectOpen(true);
  };

  const closeAddProjectDialog = () => {
    setIsAddProjectOpen(false);
    setProjectToEdit(null);
  };

  const handleProjectSubmit = async (projectData) => {
    if (projectToEdit) {
      //updated project
      console.log("Updating Project:", projectData);
      try {
        const res = await dispatch(
          updateProject({ projectId: projectToEdit._id, projectData })
        );
        if (
          res.payload.status === "success" &&
          res.payload.msg === "Project updated successfully"
        ) {
          toast.success("Project Updated Successfully");
        } else if (res.payload.status === "fail") {
          toast.error(res.payload.msg);
        }
      } catch (error) {
        toast.error(error.message);
        console.log("Updated Project.jsx Error :", error.message);
      }
    } else {
      //add new Project
      try {
        console.log("Creating New Project:", projectData);
        const res = await dispatch(createProject(projectData));
        if (
          res.payload.status === "success" &&
          res.payload.msg === "Project created successfully"
        ) {
          await dispatch(fetchProjects());
          toast.success("Project added successfully");
        } else if (res.payload.status === "fail") {
          toast.error(res.payload.msg);
        }
        console.log("Project.jsx res :", res.payload.msg);
      } catch (error) {
        toast.error(error.message);
        console.warn("Add Project error on Project.jsx : ", error.message);
      }
    }

    closeAddProjectDialog();
  };

  const handleDeleteProject = async (projectId) => {
    console.log("Deleting Project:", projectId);
    try {
      const res = await dispatch(deleteProject(projectId));
      if (
        res.payload.status === "success" &&
        res.payload.msg === "Project deleted successfully"
      ) {
        await dispatch(fetchProjects());
        toast.success("Project removed Successfully");
      } else if (res.payload.status === "fail") {
        toast.error(res.payload.msg);
      }
    } catch (error) {
      console.log("Project Deleted Error :", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <AddProject
        closeAddProjectDialog={closeAddProjectDialog}
        projectToEdit={projectToEdit}
        onSubmit={handleProjectSubmit}
        onOpen={isAddProjectOpen}
      />

      <div className="p-1 mt-12 sm:mt-0 w-full space-y-6 bg-slate-100 min-h-screen scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>

          {/* Add Button (Admin & Manager Only) */}
          {(Decodetoken?.userLevel === "Admin" ||
            Decodetoken?.userLevel === "Manager") && (
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md active:scale-95"
              onClick={() => openAddProjectDialog()}
            >
              <FaPlus className="text-sm" />
              <span className="text-sm font-medium">Add Project</span>
            </button>
          )}
        </div>

        {/* Tabs (Board View / List View) */}
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
              ${
                view === "board"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"
              }`}
            onClick={() => setView("board")}
          >
            <FaTh className="text-lg" />
            <span className="text-sm font-medium">Board View</span>
          </button>

          {/* Hide List View on Mobile */}
          <button
            className={`hidden sm:flex items-center gap-2 px-5 py-2 border-2 rounded-lg transition-all duration-200 shadow-sm
              ${
                view === "list"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-gray-300 text-gray-600 bg-white hover:bg-gray-100"
              }`}
            onClick={() => setView("list")}
          >
            <FaList className="text-lg" />
            <span className="text-sm font-medium">List View</span>
          </button>
        </div>

        {/* View Content */}
        {view === "board" ? (
          projectData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.map((project, index) => (
                <div
                  key={project._id || index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {project.name}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:px-1.5 hover:py-1 hover:rounded-md hover:bg-blue-700 hover:text-white transition-all"
                        onClick={() => openAddProjectDialog(project)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`text-red-600  hover:px-1.5 hover:py-1 hover:rounded-md hover:bg-red-600 hover:text-white transition-all ${Decodetoken.userLevel==="Admin"?"":"hidden"}`}
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {project.description}
                  </p>
                  <div className="text-sm flex flex-row items-center justify-start text-gray-600 mt-2">
                    <strong className="font-semibold">Due Date: </strong>
                    <span className="ml-1">
                      {formatDate(new Date(project.endDate))}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong className="font-semibold">Created by:</strong>{" "}
                    {project.createdBy?.name || "Unknown"}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    <strong className="font-semibold">Updated by:</strong>{" "}
                    {project.updatedBy?.name || "Not Updated"}
                  </p>

                  {/* Styled Status Tag */}
                  <span
                    className={`mt-4 inline-block text-white px-4 py-1 text-xs font-bold rounded-full transition-all
              ${PROJECT_TYPE[project.status]} }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg font-medium mt-10">
              No projects available. Start by adding a new project.
            </div>
          )
        ) : (
          // List View
          <div className="hidden sm:block bg-white rounded-xl shadow-lg overflow-hidden">
            {projectData.length > 0 ? (
              <table className="w-full border-collapse">
                <thead className="bg-yellow-200 text-gray-700 text-left">
                  <tr>
                    <th className="p-4 text-md text-left">Project Name</th>
                    <th className="p-4 text-md text-left">Description</th>
                    <th className="p-4 text-md text-left">Team Members</th>
                    <th className="p-4 text-md text-left">Due Date</th>
                    <th className="p-4 text-md text-left">Status</th>
                    <th className={`px-6 py-3  text-center text-md  ${Decodetoken.userLevel==="Admin"|| Decodetoken.userLevel==="Manager"?"":"hidden"}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((project, index) => (
                    <tr
                      key={project._id || index}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-all`}
                    >
                      <td className="p-4">{project.name}</td>
                      <td className="p-4">{project.description}</td>
                      <td className="p-4">
                        {project.teamMembers.length > 0 ? (
                          <div className="flex items-center space-x-1">
                            {project.teamMembers.slice(0, 4).map((member, index) => (
                              <div
                                key={index}
                                className={`w-7 h-7 rounded-full  text-white flex items-center -translate-y-50 font-bold justify-center text-xs -mr-1 ${getUniqueColor(member.name)}`}
                              >
                                <UserInfo user={member} styles={"transform -translate-x-[-10%] -translate-y-[95%]"} />
                              </div>
                            ))}
                            {project.teamMembers.length > 4 && (
                              <span className="text-xs text-gray-500 ml-2">+{project.teamMembers.length - 4}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">Members not assigned</span>
                        )}
                      </td>

                      <td className="p-4">
                        {formatDate(new Date(project.endDate))}
                      </td>
                      <td className="p-2">
                        <span
                          className={`inline-block text-white px-4 py-1 text-xs font-bold rounded-full transition-all
                  ${PROJECT_TYPE[project.status]}`}
                        >
                          {project.status}
                        </span>
                      </td>
                    <td className={`px-4 py-2 text-center space-x-2 ${Decodetoken.userLevel==="Admin"|| Decodetoken.userLevel==="Manager"?"":"hidden"}`}>
                      <button
                        className="px-4 py-2 bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white rounded-md transition-all"
                        onClick={() =>openAddProjectDialog(project) }
                      >
                        <MdModeEditOutline />
                      </button>
                      <button
                        className={`px-4 py-2 bg-red-100 text-red-500 hover:bg-red-600 hover:text-white rounded-md transition-all
                        ${Decodetoken.userLevel==="Admin"?"":"hidden"}` }
                        onClick={() =>handleDeleteProject(project._id) }
                      >
                        <MdDelete />
                      </button>
                    </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 text-lg font-medium py-10">
                No projects found. Start by adding a new project.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Project;
