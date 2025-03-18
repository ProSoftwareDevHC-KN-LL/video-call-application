import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import UserModel  from '../models/user.model';
import { User, ApiResponse } from '../types';
import config from '../utils/config';

const loginRouter = Router();

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    username: string;
    role: string;
}

loginRouter.post('/', async (
    req: Request<{}, {}, LoginRequest>,
    res: Response<ApiResponse<LoginResponse>>
) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                error: 'Invalid email'
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                error: 'Invalid password'
            });
            return;
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            data: {
                token,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to login'
        });
    }
});

export default loginRouter;