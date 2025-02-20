// authRoute.js
import { changeTFA, forgetPassword, login, register, updateProfile, verifyOTP } from "../Controller/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/resetpassword/:email",forgetPassword);
authRouter.get("/checksecret/:email/:otp",verifyOTP);
authRouter.get("/changetfa/:email",changeTFA);
authRouter.put("/changeprofile/:id",updateProfile);

export default authRouter;