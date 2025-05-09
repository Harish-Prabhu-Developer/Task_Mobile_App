import UserModel from "../Model/UserModel.js";
import TaskModel from "../Model/TaskModel.js";
import ProjectModel from "../Model/ProjectModel.js";
import ActivitiesModel from "../Model/ActivitiesModel.js";
import mongoose from "mongoose";
export const getSummaryData = async (req, res) => {
  try {
  //request user data
  const user = req.user;
  console.log("userId : ",user);

    // Task Due vs Completed Data
    const taskDueCompletedAggregation = await TaskModel.aggregate([
        {
          $group: {
            _id: { $month: "$dueDate" },
            due: { $sum: 1 },
            completed: {
              $sum: {
                $cond: [{ $eq: ["$stage", "completed"] }, 1, 0],
              },
            },
          },
        },
        { $sort: { "_id": 1 } },
      ]);
  
      const taskDueCompletedData = taskDueCompletedAggregation.map((item) => ({
        month: new Date(0, item._id - 1).toLocaleString("en", { month: "short" }),
        due: item.due,
        completed: item.completed,
      }));
  
      // Project Progress Data
      const projectProgressAggregation = await ProjectModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            completed: {
              $sum: {
                $cond: [{ $eq: ["$status", "Completed"] }, 1, 0],
              },
            },
            inProgress: {
              $sum: {
                $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0],
              },
            },
            NotStarted: {
              $sum: {
                $cond: [{ $eq: ["$status", "Not Started"] }, 1, 0],
              },
            },
          },
        },
        { $sort: { "_id": 1 } },
      ]);
  
      const projectProgressData = projectProgressAggregation.map((item) => ({
        month: new Date(0, item._id - 1).toLocaleString("en", { month: "short" }),
        completed: item.completed,
        inProgress: item.inProgress,
      }));
  
    // Task Status Data
    const taskStatusData = await TaskModel.aggregate([
      {
        $group: {
          _id: "$stage",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },
    ]);

    // Task Completion By Team Data
    const taskCompletionByTeamData = await UserModel.aggregate([
      {
        $match: { role: { $in: ["Junior", "Senior"] } },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "assignedTo",
          as: "tasks",
        },
      },
      {
        $unwind: "$tasks",
      },
      {
        $match: { "tasks.stage": "completed" },
      },
      {
        $group: {
          _id: "$subRole",
          completed: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          team: "$_id",
          completed: 1,
        },
      },
    ]);


    // Priority Chart Data
    const priorityChartData = await TaskModel.aggregate([
      {
        $group: {
          _id: "$priority",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          total: 1,
        },
      },
    ]);





// Task status Total Count
const TaskStatusTotalAggregation = await TaskModel.aggregate([
    {
      $group: {
        _id: "$stage",
        total: { $sum: 1 },
      },
    },
  ]);
  
  const TaskStatusTotal = {
    completed: TaskStatusTotalAggregation.find((s) => s._id === "completed")?.total || 0,
    "in progress": TaskStatusTotalAggregation.find((s) => s._id === "in progress")?.total || 0,
    todo: TaskStatusTotalAggregation.find((s) => s._id === "todo")?.total || 0,
    total: TaskStatusTotalAggregation.reduce((acc, cur) => acc + cur.total, 0),
  };
  
  // Project status Total Count
  const ProjectStatusTotalAggregation = await ProjectModel.aggregate([
    {
      $group: {
        _id: "$status",
        total: { $sum: 1 },
      },
    },
  ]);
  
  const ProjectStatusTotal = {
    Completed: ProjectStatusTotalAggregation.find((s) => s._id === "Completed")?.total || 0,
    "In Progress": ProjectStatusTotalAggregation.find((s) => s._id === "In Progress")?.total || 0,
    "Not Started": ProjectStatusTotalAggregation.find((s) => s._id === "Not Started")?.total || 0,
    Total: ProjectStatusTotalAggregation.reduce((acc, cur) => acc + cur.total, 0),
  };
  
  console.log({ TaskStatusTotal, ProjectStatusTotal });

    // Priority Chart Data
    const UserpriorityChartData = await TaskModel.aggregate([
      {
        $match: {
          assignedTo: new mongoose.Types.ObjectId(user._id),  // ✅ add `new`
        },
      },
      {
        $group: {
          _id: "$priority",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          total: 1,
        },
      },
    ]);

// Task status Total Count
const UserTaskStatusTotalAggregation = await TaskModel.aggregate([
  {
    $match: {
      assignedTo: new mongoose.Types.ObjectId(user._id),  // ✅ add `new`
    },
  },
  {
    $group: {
      _id: "$stage",
      total: { $sum: 1 },
    },
  },
]);

const UserTaskStatusTotal = {
  completed: UserTaskStatusTotalAggregation.find((s) => s._id === "completed")?.total || 0,
  "in progress": UserTaskStatusTotalAggregation.find((s) => s._id === "in progress")?.total || 0,
  todo: UserTaskStatusTotalAggregation.find((s) => s._id === "todo")?.total || 0,
  total: UserTaskStatusTotalAggregation.reduce((acc, cur) => acc + cur.total, 0),
};

    // Task Due vs Completed Data
    const UsertaskDueCompletedAggregation = await TaskModel.aggregate([
      {
        $match: {
          assignedTo: new mongoose.Types.ObjectId(user._id),  // ✅ add `new`
        },
      },
      {
        $group: {
          _id: { $month: "$dueDate" },
          due: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$stage", "completed"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const UsertaskDueCompletedData = UsertaskDueCompletedAggregation.map((item) => ({
      month: new Date(0, item._id - 1).toLocaleString("en", { month: "short" }),
      due: item.due,
      completed: item.completed,
    }));

        // Task Status Data
        const UsertaskStatusData = await TaskModel.aggregate([
          {
            $match: {
              assignedTo: new mongoose.Types.ObjectId(user._id),  // ✅ add `new`
            },
          },
          {
            $group: {
              _id: "$stage",
              value: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              name: "$_id",
              value: 1,
            },
          },
        ]);
  // Project status Total Count
    if (user.userLevel==="Admin"||user.userLevel==="Manager") {
      return res.json({
        ProjectProgressData: projectProgressData,
        TaskStatusData: taskStatusData,
        TaskCompletionByTeamData: taskCompletionByTeamData,
        TaskDueCompletedData: taskDueCompletedData,
        PriorityChartData: priorityChartData,
        TaskStatusTotal: TaskStatusTotal,
        ProjectStatusTotal:ProjectStatusTotal,
      });
    }else{
      return res.json({
        TaskStatusData: UsertaskStatusData,
        TaskDueCompletedData: UsertaskDueCompletedData,
        PriorityChartData: UserpriorityChartData,
        TaskStatusTotal: UserTaskStatusTotal,
      });
  
    }
} catch (error) {
    console.error("Summary Error : ",error.message);
    res.status(500).json({ msg: "Server error", error:error.message });
  }
};

















// Report data
export const getReportSummary = async (req, res) => {
  try {
      const reportAggregation = await TaskModel.aggregate([
          {
              $lookup: {
                  from: "projects",
                  localField: "project",
                  foreignField: "_id",
                  as: "projectDetails",
              },
          },
          {
              $lookup: {
                  from: "users",
                  localField: "assignedTo",
                  foreignField: "_id",
                  as: "userDetails",
              },
          },
          {
              $unwind: "$projectDetails",
          },
          {
              $unwind: "$userDetails",
          },
          {
              $project: {
                  task: "$title",
                  status: "$stage",
                  project: "$projectDetails.name",
                  user: "$userDetails.name",
                  date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
              },
          },
      ]);

      
      const tasks = await TaskModel.find()
      .populate("project", "name")
      .populate({
        path: "activities",
        populate: {
          path: "by",
          select: "name email",
        },
      });
    
      
    const formattedActivities = tasks.flatMap(task => 
      task.activities.map(activity => ({
        date: new Date(activity.date).toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
        activity: `${activity.type} Task '${task.title}'`, // Use task title
        user: activity.by?.name || "Unknown",
        project: task.project?.name || "Unknown",
      }))
    );
    
    
      // Fetch all projects with their progress summary
      const projects = await ProjectModel.find()
          .populate({ path: "tasks", select: "stage" })
          .select("name startDate endDate tasks status");

      // Calculate project progress
      const projectSummaries = projects.map((project) => {
          const totalTasks = project.tasks.length;
          const completedTasks = project.tasks.filter((task) => task.stage === "completed").length;
          const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;
          return {
              _id: project._id,
              name: project.name,
              startDate: project.startDate,
              endDate: project.endDate,
              totalTasks,
              completedTasks,
              progress: `${progress}%`,
              status: project.status,
          };
      });

      // Fetch all users with assigned tasks
      const users = await UserModel.find()
          .populate({ path: "tasks", select: "title stage dueDate" })
          .select("name tasks");

      // Process user task summaries
      const employeeSummaries = users.map((user) => {
          const overdueTasks = user.tasks.filter(task => new Date(task.dueDate) < new Date() && task.stage !== "completed").length;
          return {
              _id: user._id,
              name: user.name,
              totalTasks: user.tasks.length,
              completedTasks: user.tasks.filter(task => task.stage === "completed").length,
              inProgressTasks: user.tasks.filter(task => task.stage === "in progress").length,
              overdueTasks,
          };
      });

      return res.status(200).json({ reportData:reportAggregation, projectSummaries, employeeSummaries,activities:formattedActivities });
  } catch (error) {
      console.error("Error fetching report summary:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};
