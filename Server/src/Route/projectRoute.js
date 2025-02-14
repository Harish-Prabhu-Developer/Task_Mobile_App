import express from "express";
import { authenticateUser } from "../Middelware/authMiddleware.js";
import { authorizeRoles } from "../Middelware/roleMiddleware.js";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../Controller/projectController.js";

const ProjectRouter = express.Router();

// Routes
ProjectRouter.post("/add", authenticateUser, authorizeRoles("Admin", "Manager"), createProject);
ProjectRouter.get("/getall", authenticateUser, getAllProjects);
ProjectRouter.get("/get/:id", authenticateUser, getProject);
ProjectRouter.put("/update/:id", authenticateUser, authorizeRoles("Admin", "Manager"), updateProject);
ProjectRouter.delete("/delete/:id", authenticateUser, authorizeRoles("Admin", "Manager"), deleteProject);

export default ProjectRouter;