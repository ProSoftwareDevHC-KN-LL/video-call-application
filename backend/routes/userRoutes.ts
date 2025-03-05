import express, { Request, Response } from 'express';
import { getAllUsers, createUser } from "../controllers/userController";

const router = express.Router();

// Define the route for getting all users
router.get("/", async (req: Request, res: Response) => {
    await getAllUsers(req, res);
});

// Define the route for creating a new user
router.post("/", async (req: Request, res: Response) => {
    await createUser(req, res);
});

export default router;