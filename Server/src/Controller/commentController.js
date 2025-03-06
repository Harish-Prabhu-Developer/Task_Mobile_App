import CommentModel from "../Model/CommentModel.js";
import TaskModel from "../Model/TaskModel.js";


export const addComment = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ msg: "Comment text is required" });
      }
  
      const task = await TaskModel.findById(taskId);
      if (!task) {
        return res.status(404).json({ msg: "Task not found" });
      }
  
      const comment = await CommentModel.create({
        task: taskId,
        commentedBy: req.user._id,
        text,
      });
  
      // Add comment reference to the task
      task.comments.push(comment._id);
      await task.save();
  
      res.status(201).json({ msg: "Comment added successfully", comment });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  export const getCommentsByTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const comments = await CommentModel.find({ task: taskId })
        .populate("commentedBy", "name email")
        .sort({ createdAt: -1 });
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  export const deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      // Remove the comment reference from the associated task
      await TaskModel.findByIdAndUpdate(comment.task, { $pull: { comments: commentId } });
  
      await CommentModel.findByIdAndDelete(commentId);
  
      res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  export const updateComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ msg: "Comment text is required" });
      }
  
      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
  
      res.status(200).json({ msg: "Comment updated successfully", comment: updatedComment });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  