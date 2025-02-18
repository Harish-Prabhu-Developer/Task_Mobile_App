import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";


// Add User
export const addUser = async (req, res) => {
  try {
    const { name, email, role, subRole, phone,password } = req.body;
    const createdBy = req.user._id; // Authenticated user ID
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ status:'fail', msg: "All required fields must be provided" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({status:'fail', msg: "User already exists" });
    }

    const newUser = new User({ name, email, role, subRole,password, phone, createdBy });
    await newUser.save();

    res.status(201).json({status:'success', msg: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(505).json({msg:error});
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("createdBy", "name email");
    if (users.length === 0) {
      return res.status(404).json({status:'fail', msg: "No users found" });
    }
    res.status(200).json({status:'success',users});
  } catch (error) {
    return res.status(505).json({msg:error});
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("createdBy", "name email");
    if (!user) {
      return res.status(404).json({ status:'fail',msg: "User not found" });
    }
    res.status(200).json({status:'success',user});
  } catch (error) {
    return res.status(505).json({msg:error});
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { name, role, subRole, phone,tfa, active } = req.body;
    const updatedBy = req.user._id; // Authenticated user ID
    let user = await User.findById(req.params.id);

    if (!user || user.deletedAt) {
      return res.status(404).json({ status:'fail',msg: "User not found" });
    }

    user.name = name || user.name;
    user.role = role || user.role;
    user.subRole = subRole || user.subRole;
    user.phone = phone || user.phone;
    user.tfa = tfa !== undefined ? tfa :user.tfa;
    user.active = active !== undefined ? active : user.active;
    user.updatedBy = updatedBy;

    await user.save();
    res.status(200).json({status:'success', msg: "User updated successfully", user });
  } catch (error) {
    return res.status(505).json({msg:error});
  }
};

// Delete User (Soft Delete)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status:'fail',msg: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ status:'success',msg: "User deleted successfully" });
  } catch (error) {
    return res.status(505).json({msg:error});
  }
};
