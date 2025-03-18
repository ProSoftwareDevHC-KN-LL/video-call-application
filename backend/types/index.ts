import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    role: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface Config {
    MONGODB_URI: any;
    PORT: number;
    JWT_SECRET: string;
}