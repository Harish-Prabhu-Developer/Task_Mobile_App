//UserModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Manager", "Junior", "Senior"],
      required: true,
      default: "User",
    },
    subRole: {
      type: String,
      enum: ["soe","Sre", "designer", "developer", "tester"],
      default: function () {
        return this.role === "Junior" || this.role === "Senior" ? "tester" : null;
      },
      validate: {
        validator: function (value) {
          const needsSubRole = this.role === "Junior" || this.role === "Senior";
          return (needsSubRole && value) || (!needsSubRole && !value);
        },
        message: "SubRole is required for 'Junior' and 'Senior' roles, and should not be set for other roles.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      default: null,
       // "registration" will be handled in controllers
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    tfa: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


export default mongoose.model("User", UserSchema);
