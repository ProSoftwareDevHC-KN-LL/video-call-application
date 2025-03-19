import mongoose, { mongo, Schema } from "mongoose";

interface ILog extends Document {
    userId: mongoose.Types.ObjectId,
    callId: mongoose.Types.ObjectId,
    type: "outgoing" | "incoming",
    status: "missed" | "answered" | "rejected"
    timestamp: Date
}

const CallLogSchema = new Schema<ILog>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    callId: { type: Schema.Types.ObjectId, ref: "Call", required: true},
    type: { type: String, enum: ["outgoing", "incoming"], required: true},
    status: {type: String, enum: ["missed", "answered", "rejected"], required: true},
    timestamp: {type: Date, default: Date.now}
})

const CallLog = mongoose.model<ILog>("CallLog", CallLogSchema)

export default CallLog;