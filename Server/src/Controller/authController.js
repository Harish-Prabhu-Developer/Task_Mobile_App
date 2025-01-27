// authController.js
import generateToken from "../Config/jwthelper.js";
import Users from "../Model/UserModel.js";
import { sendNewPassword, sendOTP } from "../Service/emailServices.js";
import OTP from "../Model/OTPModel.js";

// Register user
export const register = async (req, res) => {
    const { name, email, role, subRole, password, phone } = req.body;

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "fail", msg: "User already exists" });
        }

        await Users.create({ name, email, role, subRole, password, phone });

        res.status(201).json({ status: "success", msg: "User created successfully" });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ status: "fail", msg: "Internal server error" });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        const isMatch = await existingUser.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", msg: "Invalid credentials" });
        }

        if (existingUser.tfa) {
            const otp = Math.random().toString(36).slice(6); // Generates a random 6-digit character string
            await OTP.create({ email, otp });
            sendOTP(email, otp,existingUser.name);
            return res.status(200).json({ status: "success", msg: "OTP sent to the email"});
        } else {
            const tokenData = {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                userLevel: `${existingUser.role}${existingUser.subRole || ""}`,
                phone: existingUser.phone,
            };

            const token = generateToken(tokenData);
            return res.status(200).json({ status: "success", msg: "Login success", token });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ status: "fail", msg: "Internal server error" });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.params;

    try {
        const otpEntry = await OTP.findOne({ email, otp });
        if (!otpEntry) {
            return res.status(400).json({ status: "fail", msg: "Invalid OTP" });
        }

        await otpEntry.deleteOne();
        const existingUser = await Users.findOne({ email });

        const tokenData = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            userLevel: `${existingUser.role}${existingUser.subRole || ""}`,
            phone: existingUser.phone,
        };

        const token = generateToken(tokenData);
        return res.status(200).json({ status: "success", msg: "Login successfully", token });
    } catch (error) {
        console.error("Error during OTP verification:", error.message);
        res.status(500).json({ status: "fail", msg: "Internal server error" });
    }
};

// Forget password
export const forgetPassword = async (req, res) => {
    const { email } = req.params;

    try {
        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        const newPassword = Math.random().toString(36).slice(-10); // Generates a random 10-character string
        existingUser.password = newPassword; // Will be hashed in pre-save hook
        await existingUser.save();
        console.log("New password",newPassword);
        

        sendNewPassword(email, newPassword,existingUser.name);
        res.status(200).json({ status: "success", msg: "Password reset successfully" });
    } catch (error) {
        console.error("Error during password reset:", error.message);
        res.status(500).json({ status: "fail", msg: "Internal server error" });
    }
};
