//taskController.js
import TaskModel from "../Model/TaskModel.js";
import ProjectModel from "../Model/ProjectModel.js";
import UserModel from "../Model/UserModel.js";
import ActivitiesModel from "../Model/ActivitiesModel.js";

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
    managingTeamMembers();

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
      .populate({
        path: "project",
        select: "name description startDate endDate teamMembers createdBy updatedBy", 
        populate: {
          path: "createdBy",
          select: "name email role sub", 
        },
      }) 
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
      .populate({
        path: "project",
        select: "name description startDate endDate teamMembers createdBy updatedBy", 
        populate: {
          path: "createdBy",
          select: "name email role sub", 
        },
      }) 
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
      .populate({
        path: "project",
        select: "name description startDate endDate teamMembers createdBy updatedBy", 
        populate: {
          path: "createdBy",
          select: "name email role sub", 
        },
      }) 
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
      .populate({
        path: "project",
        select: "name description startDate endDate teamMembers createdBy updatedBy", 
        populate: {
          path: "createdBy",
          select: "name email role sub", 
        },
      }) 
       
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


    // Update Task stage based on subTask statuses
    if (updates.subTasks && Array.isArray(updates.subTasks)) {
      const allCompleted = updates.subTasks.every(subTask => subTask.status === "completed");
      const someInProgress = updates.subTasks.some(subTask => subTask.status === "in progress");
    
      if (allCompleted) {
        updateQuery.$set.stage = "completed";
      } else if (someInProgress) {
        updateQuery.$set.stage = "in progress";
      } else {
        updateQuery.$set.stage = "todo";
      }
    }
    

    // Update the subTask status using activities type
    if (updates.activities && updates.activities.activity) {
      const existingTask = await TaskModel.findById(taskId).lean(); // Fetch latest task state
      if (existingTask && existingTask.subTasks) {
        existingTask.subTasks = existingTask.subTasks.map(subTask => {
          if (subTask.title === updates.activities.activity) {
            switch (updates.activities.type) {
              case "Completed":
                subTask.status = "completed";
                break;
              case "In Progress":
              case "Bug":
                subTask.status = "in progress";
                break;
              case "Started":
                subTask.status = "todo";
                break;
            }
          }
          return subTask;
        });
    
        updateQuery.$set.subTasks = existingTask.subTasks; // Apply updates
      }
    }
    
    //get completed SubTasks and store it in completedSubTasks field
// Get the existing task data

if (existingTask?.subTasks && Array.isArray(existingTask.subTasks)) {
  // First, apply any updates to subTasks
  if (updates.subTasks) {
    updateQuery.$set.subTasks = updates.subTasks;
  }

  // Re-fetch subTasks after updates
  const updatedSubTasks = updates.subTasks || existingTask.subTasks;

  // Count completed subtasks
  const completedSubTasksCount = updatedSubTasks.filter(subTask => subTask.status === "completed").length;
  updateQuery.$set.completedSubTasks = completedSubTasksCount;
}
    
    //update Task stage on using SubTask with activities type
    if (updates.activities?.type) {
      switch (updates.activities.type) {
        case "Started":
        case "In Progress":
          updateQuery.$set.stage = "in progress";
          await ProjectModel.findByIdAndUpdate(existingTask.project, { $set: { status: "In Progress" } });
          break;
        case "Completed":
          updateQuery.$set.stage = "completed";
          const totalSubTasks = existingTask.subTasks?.length || 0;
          const completedSubTasks = existingTask.subTasks?.filter(sub => sub.status === "completed").length || 0;
    
          // If all subtasks are completed, mark project as completed
          if (totalSubTasks > 0 && completedSubTasks === totalSubTasks) {
            await ProjectModel.findByIdAndUpdate(existingTask.project, { $set: { status: "Completed" } });
          }
          break;
        default:
          updateQuery.$set.stage = "todo";
          await ProjectModel.findByIdAndUpdate(existingTask.project, { $set: { status: "Not Started" } });
      }
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

    managingTeamMembers();
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
    console.log("Deleted Task:", deletedTask.project);
    
    res.status(200).json({status:"success", msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// Manage TeamMember on equals to assignedTo 
// don't get request and send response is a normal function
export const managingTeamMembers = async (req, res) => {
  try {
    // Fetch all projects with their tasks
    const projects = await ProjectModel.find({}, "teamMembers tasks");
    
    // Fetch all tasks with their assigned users and project reference
    const tasks = await TaskModel.find({}, "assignedTo project");
    
    // Store unique assigned users per project
    const projectTeamMembers = {};
    
    tasks.forEach(task => {
      const { project, assignedTo } = task;
      if (!projectTeamMembers[project]) {
        projectTeamMembers[project] = new Set();
      }
      assignedTo.forEach(user => projectTeamMembers[project].add(user.toString()));
    });

    // Update project teamMembers based on assigned users
    const updatePromises = projects.map(async (project) => {
      const uniqueUsers = [...(projectTeamMembers[project._id] || [])];
      if (uniqueUsers.length > 0) {
        return ProjectModel.findByIdAndUpdate(
          project._id,
          { $set: { teamMembers: uniqueUsers } },
          { new: true }
        );
      }
    });

    await Promise.all(updatePromises);

    console.log("updatePromises : ",updatePromises);
  } catch (error) {
    console.log("Error:", error.message);
  }
};
