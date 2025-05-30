import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("Connected to database!")
    }
    catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}

export default connectDB;