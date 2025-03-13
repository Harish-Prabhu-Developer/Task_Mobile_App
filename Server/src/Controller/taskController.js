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
    const { title, description, assignedTo, project, stage,priority, dueDate, subTasks } = req.body;

    if (!title || !description || !project || !dueDate) {
      return res.status(400).json({ status: "fail",msg: "Please provide all required fields" });
    }

    if (!title) {
      return res.status(400).json({ status: "fail",msg: "Please provide a title for the task" });
    }
    if (!description) {
      return res.status(400).json({ status: "fail",msg: "Please provide a description for the task" });
    }
    if (!project) {
      return res.status(400).json({ status: "fail",msg: "Please provide a project for the task" });
    }
    if (!dueDate) { 
      return res.status(400).json({ status: "fail",msg: "Please provide a due date for the task" });
    }
    const existingProject = await ProjectModel.findById(project);
    if (!existingProject) {
      return res.status(404).json({status: "fail", msg: "Project not found" });
    }

    const assetFiles = req.files?.map(file => file.path) || [];
    const activity = await ActivitiesModel.create({
      type: "Assigned",
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
      stage:stage ||"todo",
      subTasks: subTasks || [],
      assets: assetFiles,
      activities: [activity._id], // Store activity ID
    });

    await newTask.save();

    existingProject.updatedBy = req.user._id;
    existingProject.tasks.push(newTask._id);

    if (assignedTo?.length > 0) {
      await UserModel.updateMany(
        { _id: { $in: assignedTo } },
        { $push: { tasks: newTask._id } }
      );

      // Use $addToSet to ensure uniqueness without manual filtering
      await ProjectModel.findByIdAndUpdate(project, {
        $addToSet: { teamMembers: { $each: assignedTo } },
      });
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
    if (req.user.userLevel === "Admin" || req.user.userLevel === "Manager"||req.user.userLevel === "User") {
      const tasks = await TaskModel.find()
      .populate("assignedTo", "name email role subRole") // Populate assigned users
      .populate("project") // Populate project name only
      .populate({
        path: "activities",
        populate: {
          path: "by", // Populate the "by" field inside activities
          select: "name email role subRole", // Only fetch necessary fields
        },
      });
      return res.status(200).json(tasks);      
    }



    if (req.user.userLevel.split(" ")[0] === "Junior" || req.user.userLevel.split(" ")[0] === "Senior") {
      const tasks = await TaskModel.find({ assignedTo: req.user._id })
      .populate("assignedTo", "name email role subRole") // Populate assigned users
      .populate("project") // Populate project name only
      .populate({
        path: "activities",
        populate: {
          path: "by", // Populate the "by" field inside activities
          select: "name email role subRole", // Only fetch necessary fields
        },
      });
      return res.status(200).json(tasks);      
    }
  } catch (error) {
    res.status(500).json({status:"fail", msg: error.message });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try { 
    const taskId = req.params.id;
    if (req.user.userLevel === "Admin" || req.user.userLevel === "Manager"||req.user.userLevel === "User") {
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
      return res.status(200).json(task);
    }

    if (req.user.userLevel.split(" ")[0] === "Junior" || req.user.userLevel.split(" ")[0] === "Senior") {
      const task = await TaskModel.findOne({ _id: taskId, assignedTo: req.user._id })
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate({
        path: "activities",
        populate: {
          path: "by",
          select: "name email"
        }
      });
      return res.status(200).json(task);
    }
    if (!task) {
      return res.status(404).json({status:"fail", msg: "Task not found" });
    }


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

    // Check if task exists
    const existingTask = await TaskModel.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ status: "fail", msg: "Task not found" });
    }

    let updateQuery = { $set: {}, $push: {} };

    // ✅ Fix: Update activities correctly
    if (updates.activities) {
      const newActivity = await ActivitiesModel.create({
        type: updates.activities.type,
        activity: updates.activities.activity,
        by: req.user._id,
      });
      updateQuery.$push.activities = newActivity._id;
    }

    // ✅ Fix: Directly update stage, priority, and dueDate
    if (updates.stage) updateQuery.$set.stage = updates.stage;
    if (updates.priority) updateQuery.$set.priority = updates.priority;
    if (updates.dueDate) updateQuery.$set.dueDate = updates.dueDate;

    // ✅ Fix: Ensure subTasks are stored properly
    if (updates.subTasks) {
      updateQuery.$push.subTasks = { 
        $each: Array.isArray(updates.subTasks) ? updates.subTasks : [updates.subTasks] 
      };
    }

    // ✅ Fix: Handle assigned users correctly
    if (updates.assignedTo) {
      updateQuery.$set.assignedTo = updates.assignedTo;

      // Add the task to assigned users
      await UserModel.updateMany(
        { _id: { $in: updates.assignedTo } },
        { $addToSet: { tasks: taskId } }
      );

      // Ensure assigned users are added to project teamMembers
      await ProjectModel.findByIdAndUpdate(existingTask.project, {
        $addToSet: { teamMembers: { $each: updates.assignedTo } },
      });
    }

    // ✅ Fix: Ensure multiple assets are added correctly
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => file.path);
      updateQuery.$push.assets = { $each: newFiles };
    }

    // If no updates are provided, return an error
    if (Object.keys(updateQuery.$set).length === 0 && Object.keys(updateQuery.$push).length === 0) {
      return res.status(400).json({ status: "fail", msg: "No valid update fields provided" });
    }

    // Update task and return the updated document
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateQuery, { new: true })
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate("activities");

    res.status(200).json({ status: "success", msg: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Update Task Error:", error.message);
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

    await ActivitiesModel.deleteMany({ _id: { $in: deletedTask.activities } });
    await UserModel.updateMany(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json({status:"success", msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};