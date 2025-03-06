import mongoose, { Schema } from "mongoose";

const logSchema = new Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    action: { type: String, required: true }, // Example: "Task Created", "Status Updated"
    performedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    details: { type: String }, // Extra info if needed
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);
