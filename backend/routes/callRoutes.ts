import express, { Request, Response } from 'express';
import { getAllCalls, createCall } from "../controllers/callController";

const router = express.Router();

// Define the route for getting all calls
router.get("/", async (req: Request, res: Response) => {
    await getAllCalls(req, res);
});

// Define the route for creating a new call
router.post("/", async (req: Request, res: Response) => {
    await createCall(req, res);
});

export default router;