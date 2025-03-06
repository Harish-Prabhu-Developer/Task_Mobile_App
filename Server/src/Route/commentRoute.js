import express from "express";
import { addComment, deleteComment, getCommentsByTask, updateComment }from "../Controller/commentController.js";


const CommentRoute = express.Router();

CommentRoute.post("/:taskId", addComment);
CommentRoute.get("/:taskId", getCommentsByTask);
CommentRoute.put("/:commentId", updateComment);
CommentRoute.delete("/:commentId", deleteComment);


export default CommentRoute;