import mongoose, { Schema, Document, model } from "mongoose";

// User Interface
interface IUser extends Document {
    username: string;
    email: string;
    passwordHash: string;
    role: "user" | "admin";
    image?: string;
    createdAt: number;
}
// User Schema
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // Store hashed passwords
    role: { type: String, enum: ["user", "admin"], required: true },
    image: { type: String },
    createdAt: { type: Number, default: Date.now },
});

UserSchema.index({ email: 1 }); // Fast lookup by email

// Models
const User = model<IUser>("User", UserSchema);

export { User };