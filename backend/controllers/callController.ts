import { Request, Response } from "express";
import Call from "../models/call.model"

export const getAllCalls = async (req: Request, res: Response) => {
    try {
        const newCall = new Call(req.body);
        const savedCall = await newCall.save();
        res.status(201).json(savedCall)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error getting all calls", err })
    }
}

export const createCall = async (req: Request, res: Response) => {
    try {
        const call = new Call(req.body)
        await call.save();
        res.status(201).json(call)
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: "Error creating call", err })
    }
}