//taskRoute.js
import express from "express"
import { authenticateUser } from "../Middelware/authMiddleware.js";
import { authorizeRoles } from "../Middelware/roleMiddleware.js";
import{ createTask,getTasks,getTask,updateTask,deleteTask } from "../Controller/taskController.js"

const TaskRouter =express.Router();

// Routes
TaskRouter.post("/add",authenticateUser,authorizeRoles("Admin","Manager"), createTask);
TaskRouter.get("/getall",authenticateUser,getTasks);
TaskRouter.get("/get/:id",authenticateUser, getTask);
TaskRouter.put("/update/:id",authenticateUser,authorizeRoles("Admin","Manager"), updateTask);
TaskRouter.delete("/delete/:id",authenticateUser,authorizeRoles("Admin","Manager"), deleteTask);

export default TaskRouter;