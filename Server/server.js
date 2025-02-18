import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js";
import authRouter from "./src/Route/authRoute.js";
import UserRouter from "./src/Route/userRoute.js";
import ProjectRouter from "./src/Route/projectRoute.js";
import TaskRouter from "./src/Route/taskRoute.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;



// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.get("/", (req, res) => res.status(200).json("Welcome to TaskApp!"));

app.use("/taskapp/auth", authRouter);
app.use("/taskapp/users",UserRouter);
app.use("/taskapp/projects",ProjectRouter);
app.use("/taskapp/tasks",TaskRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    //process.exit(1);
  });
