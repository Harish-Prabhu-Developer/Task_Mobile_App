// authRoute.js
import { forgetPassword, login, register, verifyOTP } from "../Controller/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/resetpassword/:email",forgetPassword);
authRouter.get("/checksecret/:email/:otp",verifyOTP);

export default authRouter;