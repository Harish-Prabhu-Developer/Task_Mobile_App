//ActivitiesModel.js
import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Assigned",
    enum: ["Assigned","Started","In Progress","Bug","Completed","Commented",],
  },
  activity: { type: String },
  date: { type: Date, default: Date.now },
  by: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Activity", activitySchema);
/*//UserModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {  name: { type: String, required: [true, "Name is required"], trim: true,},
    email: {type: String, required: [true, "Email is required"], unique: true,
      match: [ /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address", ], },
    role: {type: String, enum: ["User", "Admin", "Manager", "Junior", "Senior"],
      required: true, default: "User", },
    subRole: { type: String, enum: ["soe","Sre", "designer", "developer", "tester"],
      default: function () {return this.role === "Junior" || this.role === "Senior" ? "tester" : null; },
      validate: { validator: function (value) {const needsSubRole = this.role === "Junior" || this.role === "Senior";  return (needsSubRole && value) || (!needsSubRole && !value);
   },
     message: "SubRole is required for 'Junior' and 'Senior' roles, and should not be set for other roles.", },},
    password: { type: String, required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],},
    phone: {type: String, required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null,
       // "registration" will be handled in controllers
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId,ref: "User", default: null,},
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User",default: null,},
    active: { type: Boolean, default: true, },
    tfa: { type: Boolean, default: true,},
    profilePicture: { type: String, default: null,},
    tasks: [{type: mongoose.Schema.Types.ObjectId,ref: 'Task',}],
  },
  { timestamps: true, });
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
// ProjectModel.js
import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true,},
  description: { type: String,required: true, },
  createdBy: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,},
  updatedBy:{type: mongoose.Schema.Types.ObjectId,ref: 'User',},
  teamMembers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', }],
  startDate: { type: Date,required: true,},
  tasks: [{type: mongoose.Schema.Types.ObjectId,ref: 'Task',}],
  endDate: {type: Date,required: true,},
  status: {type: String,enum: ['Not Started', 'In Progress', 'Completed'],default: 'Not Started',
  },
},
{ timestamps: true,});
export default mongoose.model('Project', projectSchema);
// TaskModel.js
import mongoose, { Schema } from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {type: String,required: true,},
  description: {type: String,required: true,},
  assignedTo: [{type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,}],
  priority: {type: String, default: "normal", enum: ["high", "medium", "normal", "low"],},
  stage: {type: String,default: "todo",enum: ["todo", "in progress", "completed"], },
  activities: [{type: Schema.Types.ObjectId,ref: "Activity",},  ],
  subTasks: [{ title: String,date: Date, tag: String,},],
  assets: [String],
  project: {type: mongoose.Schema.Types.ObjectId,ref: 'Project',required: true,},
    dueDate: {type: Date,required: true,},},
{timestamps:true,});
export default mongoose.model('Task', taskSchema);
*/