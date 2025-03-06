import LogModel from "../Model/LogModel.js";
import TaskModel from "../Model/TaskModel.js";

//Create Log
export const createLog = async (taskId, action, performedBy, details = "") => {
    try {
      const log = new LogModel({
        task: taskId,
        action,
        performedBy,
        details,
      });
  
      await log.save();
  
      // Push the log reference into the task's log array
      await TaskModel.findByIdAndUpdate(taskId, { $push: { logs: log._id } });
    } catch (error) {
      console.error("Error creating log:", error.message);
    }
  };
//get the Logs By Tasks
export const getLogsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const logs = await LogModel.find({ task: taskId })
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 }); // Sort logs in descending order

    if (!logs.length) {
      return res.status(404).json({ msg: "No logs found for this task" });
    }

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get the all Logs
export const getAllLogs = async (req, res) => {
    try {
      const logs = await LogModel.find()
        .populate("task", "title")
        .populate("performedBy", "name email")
        .sort({ createdAt: -1 });
  
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  