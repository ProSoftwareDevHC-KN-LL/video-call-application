import mongoose, { Schema } from "mongoose";

interface IRecording extends Document {
    callId: mongoose.Types.ObjectId;
    url: string;
    duration: number;
    createdAt: Date;
}

const RecordingSchema = new Schema<IRecording>({
    callId: { type: Schema.Types.ObjectId, required: true },
    url: { type: String, required: true},
    duration: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now}
})

const Recording = mongoose.model<IRecording>("Recording", RecordingSchema)

export default Recording;