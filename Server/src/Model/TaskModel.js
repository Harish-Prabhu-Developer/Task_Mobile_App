// TaskModel.js
import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  priority: {
    type: String,
    default: "normal",
    enum: ["high", "medium", "normal", "low"],
  },
  stage: {
    type: String,
    default: "todo",
    enum: ["todo", "in progress", "completed"],
  },
  activities: [
    {
      type: {
        type: String,
        default: "assigned",
        enum: [
          "assigned",
          "started",
          "in progress",
          "bug",
          "completed",
          "commented",
        ],
      },
      activity: String,
      date: { type: Date, default: Date.now },
      by: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],

  subTasks: [
    {
      title: String,
      date: Date,
      tag: String,
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  
  dueDate: {
    type: Date,
    required: true,
  },

},
{
    timestamps:true,
});

export default mongoose.model('Task', taskSchema);
