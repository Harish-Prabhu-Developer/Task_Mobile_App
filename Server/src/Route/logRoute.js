import express from "express";
import { createLog, getAllLogs, getLogsByTask } from "../Controller/logController.js";

const LogRoute = express.Router();
LogRoute.post("/add", createLog);
LogRoute.get("/:taskId", getLogsByTask);
LogRoute.get("/", getAllLogs);
export default LogRoute;