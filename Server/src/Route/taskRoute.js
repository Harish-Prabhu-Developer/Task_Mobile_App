//taskRoute.js
import express from "express";
import { authenticateUser } from "../Middelware/authMiddleware.js";
import { authorizeRoles } from "../Middelware/roleMiddleware.js";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../Controller/taskController.js";
import { uploadAssets } from "../Middelware/uploadMiddleware.js";

const TaskRouter = express.Router();

// Routes

TaskRouter.post("/add", authenticateUser, authorizeRoles("Admin", "Manager"), uploadAssets, createTask);
TaskRouter.get("/getall", authenticateUser, getTasks);
TaskRouter.get("/get/:id", authenticateUser, getTask);
TaskRouter.put("/update/:id", authenticateUser, authorizeRoles("Admin", "Manager"), uploadAssets, updateTask);
TaskRouter.delete("/delete/:id", authenticateUser, authorizeRoles("Admin", "Manager"), deleteTask);

export default TaskRouter;
