import mongoose, { Schema } from "mongoose";

interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    callId: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    callId: { type: Schema.Types.ObjectId, ref: "Call", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;