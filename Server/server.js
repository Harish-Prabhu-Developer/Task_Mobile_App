import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js";
import path from "path";
import Router from "./src/Route/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
  
app.use("/taskapp",Router)

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.get("/", (req, res) => res.status(200).json("Welcome to TaskApp!"));


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
