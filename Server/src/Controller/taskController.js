//taskController.js
import TaskModel from "../Model/TaskModel.js";
import ProjectModel from "../Model/ProjectModel.js";

// Create a new task with file uploads
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project,priority, dueDate, subTasks } = req.body;

    // Validate required fields
    if (!title || !description || !assignedTo || !project || !dueDate) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    // Check if project exists
    const existingProject = await ProjectModel.findById(project);
    if (!existingProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Process uploaded files
    const assetFiles = req.files ? req.files.map(file => file.path) : [];

    // Create the task
    const newTask = new TaskModel({
      title,
      description,
      assignedTo,
      project,
      priority,
      dueDate,
      subTasks: subTasks || [],
      assets: assetFiles, // Store file paths
      activities: [{ type: "assigned", activity: "Task assigned", by: req.user._id }],
    });

    await newTask.save();
    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .populate("activities.by", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .populate("activities.by", "name email");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update a task with file uploads
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    // Handle file uploads
    if (req.files) {
      updates.assets = req.files.map(file => file.path);
    }

    // If updating the stage, add an activity log
    if (updates.stage) {
      updates.$push = {
        activities: { type: updates.stage, activity: `Task moved to ${updates.stage}`, by: req.user._id },
      };
    }

    // Find and update the task
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true })
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .populate("activities.by", "name email");

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
