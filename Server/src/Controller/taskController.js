//taskController.js
import TaskModel from "../Model/TaskModel.js";
import ProjectModel from "../Model/ProjectModel.js";
import UserModel from "../Model/UserModel.js";
import ActivitiesModel from "../Model/ActivitiesModel.js";
import LogModel from "../Model/LogModel.js";
import CommentModel from "../Model/CommentModel.js";
// Create a new task with file uploads
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project, priority, dueDate, subTasks } = req.body;

    if (!title || !description || !project || !dueDate) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const existingProject = await ProjectModel.findById(project).populate("teamMembers", "name email");
    if (!existingProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const assetFiles = req.files?.map(file => file.path) || [];

    // Create an activity for task assignment
    const activity = await ActivitiesModel.create({
      type: "assigned",
      activity: "Task assigned",
      by: req.user._id
    });

    // Create the task
    const newTask = new TaskModel({
      title,
      description,
      assignedTo,
      project,
      priority,
      dueDate,
      subTasks: subTasks || [],
      assets: assetFiles,
      activities: [activity._id], // Store activity ID
    });

    await newTask.save();

    existingProject.updatedBy = req.user._id;
    existingProject.tasks.push(newTask._id);

    if (assignedTo.length > 0) {
      const assignedUsers = await UserModel.find({ _id: { $in: assignedTo } });

      for (const user of assignedUsers) {
        user.tasks.push(newTask._id);
        await user.save();
      }

      // Fix: Ensure unique users in teamMembers
      existingProject.teamMembers = Array.from(new Set([...existingProject.teamMembers.map(id => id.toString()), ...assignedTo]));
    }

    await existingProject.save();

    res.status(201).json({ status: "success", msg: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ status: "fail", msg: error.message });
  }
};


// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate("activities");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({status:"fail", msg: error.message });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try { 
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId)
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate({
      path: "activities",
      populate: {
        path: "by",
        select: "name email"
      }
      });

    if (!task) {
      return res.status(404).json({status:"fail", msg: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ status:"fail",msg: error.message });
  }
};

// Update a task with file uploads
// Update a task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    // Fetch existing task
    const existingTask = await TaskModel.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ status: "fail", msg: "Task not found" });
    }

    // Preserve old assets and append new ones if uploaded
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => file.path);
      updates.assets = [...existingTask.assets, ...newFiles];
    } else {
      updates.assets = existingTask.assets; // Keep existing assets if no new file
    }

    // Handle activity log
    if (updates.activities) {
      const activityData = await ActivitiesModel.create({
        type: updates.type,
        activity: updates.activity,
        by: req.user._id
      });
      updates.$push = { activities: activityData._id };
    }

    // Update the task
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true })
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate("activities");

    res.status(200).json({ status: "success", msg: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ status: "fail", msg: error.message });
  }
};


// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ status:"fail",msg: "Task not found" });
    }

    await ProjectModel.findByIdAndUpdate(deletedTask.project, {
      $pull: { tasks: taskId }
    });

    await UserModel.updateMany(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json({status:"success", msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};