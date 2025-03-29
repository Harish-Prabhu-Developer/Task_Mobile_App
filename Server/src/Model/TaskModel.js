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
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
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
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],

  subTasks: [
    {
      title: String,
      date: Date,
      tag: String,
      status: {
        type: String,
        default: "todo",
        enum: ["todo", "in progress", "completed"],
      },
    },
  ],
 completedSubTasks: {
    type: Number,
    default: 0,
  },
  assets: [String],
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
