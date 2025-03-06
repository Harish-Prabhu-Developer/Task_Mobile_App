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
 
    // Log task creation
    await LogModel.create({
      task: newTask._id,
      action: "Task Created",
      performedBy: req.user._id,
      details: `Task "${title}" created.`,
    });

    existingProject.updatedBy = req.user._id;
    existingProject.tasks.push(newTask._id);
    
    if (assignedTo.length > 0) {
      const assignedUsers = await UserModel.find({ _id: { $in: assignedTo } });
      for (const user of assignedUsers) {
        user.tasks.push(newTask._id);
        await user.save();
      }
      existingProject.teamMembers.push(...assignedTo);
    }

    await existingProject.save();

    res.status(201).json({ status:"success", msg: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ status:"fail",msg: error.message });
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

    if (req.files) {
      updates.assets = req.files.map(file => file.path);
    }

    if (updates.stage) {
      const activity = await ActivitiesModel.create({
        type: updates.stage,
        activity: `Task moved to ${updates.stage}`,
        by: req.user._id
      });
      updates.$push = { activities: activity._id };
    }

     // Log the status update
     if (updates.stage && updates.stage !== existingTask.stage) {
      await LogModel.create({
        task: taskId,
        action: `Task moved to ${updates.stage}`,
        performedBy: req.user._id,
        details: `Task status changed from "${existingTask.stage}" to "${updates.stage}".`,
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true })
      .populate("assignedTo", "name email role subRole")
      .populate("project")
      .populate("activities");

    if (!updatedTask) {
      return res.status(404).json({status:"fail", msg: "Task not found" });
    }

    res.status(200).json({ status:"success",msg: "Task updated successfully", task: updatedTask });
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