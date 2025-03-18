import mongoose, { Schema, Document, model } from "mongoose";

// Call Interface
interface ICall extends Document {
  callerId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  participants?: mongoose.Types.ObjectId[];
  status: "initiated" | "ringing" | "answered" | "missed" | "ended";
  type: "audio" | "video";
  startTime?: number;
  endTime?: number;
  duration?: number;
  createdAt: number;
}

// Call Schema
const CallSchema = new Schema<ICall>({
  callerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // Optional group call
  status: {
    type: String,
    enum: ["initiated", "ringing", "answered", "missed", "ended"],
    required: true,
  },
  type: { type: String, enum: ["audio", "video"], required: true },
  startTime: { type: Number },
  endTime: { type: Number },
  duration: { type: Number }, // Can be derived from start & end
  createdAt: { type: Number, default: Date.now },
});

CallSchema.index({ callerId: 1 });
CallSchema.index({ receiverId: 1 });

// Models
const CallModel = model<ICall>("Call", CallSchema);

export default CallModel;