//projectController.js
import ProjectModel from "../Model/ProjectModel.js";
import UserModel from "../Model/UserModel.js";
import ActivitiesModel from "../Model/ActivitiesModel.js";
import TaskModel from "../Model/TaskModel.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;

    // Validate required fields
    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    // Create the project
    const project = await ProjectModel.create({
      name,
      description,
      startDate,
      endDate,
      createdBy: req.user._id, // Assuming the user ID is available in req.user
    });

    res.status(201).json({ status:'success',msg: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single project by ID
export const getProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project and populate createdBy
    const project = await ProjectModel.findById(projectId)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .populate("teamMembers","name email role subRole")
      .populate("tasks");

    if (!project) {
      return res.status(404).json({status:'fail', msg: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    // Find all projects and populate createdBy
    const projects = await ProjectModel.find()
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .populate("teamMembers","name email role subRole")
      .populate("tasks");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, description, startDate, endDate,status } = req.body;

    // Find the project and update it
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { name, description, startDate, endDate,status,updatedBy: req.user._id },
      { new: true } // Return the updated project
    ).populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .populate("teamMembers","name email role subRole")
      .populate("tasks");

    if (!updatedProject) {
      return res.status(404).json({ status:'fail',msg: "Project not found" });
    }

    res.status(200).json({ status:'success',msg: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project and delete it
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({status:'fail', msg: "Project not found" });
    }

    res.status(200).json({status:'success', msg: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
