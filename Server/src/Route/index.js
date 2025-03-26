import express from "express";
import authRouter from "./authRoute.js";
import UserRouter from "./userRoute.js";
import ProjectRouter from "./projectRoute.js";
import TaskRouter from "./taskRoute.js";
import summaryRouter from "./summaryRoute.js";


const Router = express.Router();
Router.use("/auth", authRouter);
Router.use("/users",UserRouter);
Router.use("/projects",ProjectRouter);
Router.use("/tasks",TaskRouter);
Router.use("/analytics",summaryRouter);

export default Router;