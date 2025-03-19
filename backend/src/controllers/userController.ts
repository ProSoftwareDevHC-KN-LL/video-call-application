import { Request, Response } from 'express';
import userSchema from '../validators/userValidator.js';
import User from '../models/user.model.js';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    // Validate the request body against the schema
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating user", err });
    }
};