import TaskModel from "../Model/TaskModel.js";

//Assigning Task
export const assignTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { assignedTo } = req.body;

    // Validate assignedTo field
    if (!assignedTo) {
      return res.status(400).json({ msg: "Please provide a user to assign the task" });
    }

    // Find the task and update the assignedTo field
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { assignedTo },
      { new: true }
    )
      .populate("assignedTo", "name email") // Populate assignedTo with user details
      .populate("project", "name"); // Populate project with project details

    if (!updatedTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task assigned successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};