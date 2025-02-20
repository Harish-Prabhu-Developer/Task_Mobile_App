//authController.js
import generateToken from "../Config/jwthelper.js";
import Users from "../Model/UserModel.js";
import { sendNewPassword, sendOTP } from "../Service/emailServices.js";
import OTP from "../Model/OTPModel.js";

// Register User
export const register = async (req, res) => {
    const { name, email, role, subRole, password, phone } = req.body;

    try {
        if (!name || !email || !role || !password || !phone) {
            return res.status(400).json({ status: "fail", msg: "All fields are required" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "fail", msg: "User already exists" });
        }

        await Users.create({ name, email, role, subRole, password, phone });// Default for self-registration

        res.status(201).json({ status: "success", msg: "User created successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: "fail", msg: "Email and password are required" });
        }

        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        const isMatch = await existingUser.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", msg: "Invalid credentials" });
        }

        if (existingUser.tfa) {
            const otp = Math.random().toString(36).slice(-6);
            await OTP.create({ email, otp });

            sendOTP(email, otp, existingUser.name);
            return res.status(200).json({ status: "success", msg: "OTP sent to the email" });
        } else {
            const profileStatus = existingUser.profilePicture || "";
            const userLevel = `${existingUser.role} ${existingUser.subRole||""}`;
            const tokenData = {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                tfa: existingUser.tfa,
                userLevel:userLevel.trim(),
                phone: existingUser.phone,
                profilePicture: profileStatus,
            };

            const token = generateToken(tokenData);
            return res.status(200).json({ status: "success", msg: "Login success", token });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.params;

    try {
        if (!email || !otp) {
            return res.status(400).json({ status: "fail", msg: "Email and OTP are required" });
        }

        const otpEntry = await OTP.findOne({ email, otp });
        if (!otpEntry) {
            return res.status(400).json({ status: "fail", msg: "Invalid OTP" });
        }

        await otpEntry.deleteOne();
        const existingUser = await Users.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        const profileStatus = existingUser.profilePicture || "";
        const userLevel = `${existingUser.role} ${existingUser.subRole||""}`;
        const tokenData = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            tfa: existingUser.tfa,
            userLevel: userLevel.trim(),
            phone: existingUser.phone,
            profilePicture: profileStatus,
        };

        const token = generateToken(tokenData);
        return res.status(200).json({ status: "success", msg: "Login successfully", token });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};

// Forget Password
export const forgetPassword = async (req, res) => {
    const { email } = req.params;

    try {
        if (!email) {
            return res.status(400).json({ status: "fail", msg: "Email is required" });
        }

        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        const newPassword = Math.random().toString(36).slice(-10);
        existingUser.password = newPassword; // Hashed in pre-save hook
        await existingUser.save();

        console.log("New password:", newPassword);
        sendNewPassword(email, newPassword, existingUser.name);

        res.status(200).json({ status: "success", msg: "Password reset successfully" });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};

//Change tfa
export const changeTFA = async (req, res) => {
    const { email } = req.params;

    try {
        if (!email) {
            return res.status(400).json({ status: "fail", msg: "Email is required" });
        }

        const existingUser = await Users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ status: "fail", msg: "User does not exist" });
        }

        existingUser.tfa = !existingUser.tfa;
        await existingUser.save();

        res.status(200).json({ status: "success", msg: "TFA status changed successfully" });
    } catch (error) {
        console.error("Error during TFA change:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};

//updated profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, tfa, phone } = req.body;

        const updatedProfile = await Users.findOneAndUpdate(
            { _id: userId },
            { name, tfa, phone },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ status: "fail", msg: "User not found" });
        }

        res.status(200).json({ status: "success", msg: "Profile updated successfully", user: updatedProfile });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ status: "fail", msg: "Internal server error", error: error.message });
    }
};