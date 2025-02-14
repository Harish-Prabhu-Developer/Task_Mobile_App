// userRoute.js
import express from "express";
import { 
    addUser, 
    getAllUsers, 
    getUser, 
    updateUser, 
    deleteUser 
} from "../Controller/userController.js";
import { authenticateUser } from "../Middelware/authMiddleware.js";
import { authorizeRoles } from "../Middelware/roleMiddleware.js";

const UserRouter = express.Router();

// Routes
UserRouter.post("/add", authenticateUser, authorizeRoles("Admin"), addUser);
UserRouter.get("/all", authenticateUser, authorizeRoles("Admin", "Manager", "User"), getAllUsers);
UserRouter.get("/:id", authenticateUser, getUser);
UserRouter.put("/:id", authenticateUser, authorizeRoles("Admin", "Manager"), updateUser);
UserRouter.delete("/:id", authenticateUser, authorizeRoles("Admin"), deleteUser);

export default UserRouter;
