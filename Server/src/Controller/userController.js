import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

const handleError = (res, error, message) => {
  console.error(error);
  res.status(500).json({ message, error: error.message });
};

// Add User
export const addUser = async (req, res) => {
  try {
    const { name, email, role, subRole, phone,password } = req.body;
    const createdBy = req.user._id; // Authenticated user ID
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, role, subRole,password, phone, createdBy });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    handleError(res, error, "Error adding user");
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("createdBy", "name email");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error, "Error fetching users");
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("createdBy", "name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error, "Error fetching user");
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { name, role, subRole, phone,tfa, active } = req.body;
    const updatedBy = req.user._id; // Authenticated user ID
    let user = await User.findById(req.params.id);

    if (!user || user.deletedAt) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.role = role || user.role;
    user.subRole = subRole || user.subRole;
    user.phone = phone || user.phone;
    user.tfa = tfa !== undefined ? tfa :user.tfa;
    user.active = active !== undefined ? active : user.active;
    user.updatedBy = updatedBy;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    handleError(res, error, "Error updating user");
  }
};

// Delete User (Soft Delete)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error, "Error deleting user");
  }
};
