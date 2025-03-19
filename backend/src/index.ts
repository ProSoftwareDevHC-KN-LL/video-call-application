import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import { setupWebSocket } from "./websocket/websocket.js";
import connectDB from "./config/db.js";
import { AccessToken, WebhookReceiver } from "livekit-server-sdk";

const SERVER_PORT = process.env.SERVER_PORT || 6080;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "devkey";
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "secret";
const LIVEKIT_URL = process.env.LIVEKIT_URL || "http://localhost:7880";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/webhook+json" }));


app.use("/api/users", userRoutes);
app.use("/api/calls", callRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on port ${SERVER_PORT}`);
});

app.post("/token", async (req: Request, res: Response): Promise<any> => {
  const roomName = req.body.roomName;
  const participantName = req.body.participantName;

  if (!roomName || !participantName) {
    return res.status(400).json({ errorMessage: "roomName and participantName are required" });
  }

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    name: participantName,
    metadata: JSON.stringify({
      livekitUrl: LIVEKIT_URL,
      roomAdmin: true
    })
  });
  at.addGrant({ roomJoin: true, room: roomName });
  const token = await at.toJwt();
  res.json({ token });
});

const webhookReceiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

app.post("/livekit/webhook", async (req: Request, res: Response) => {
  try {
    const event = await webhookReceiver.receive(req.body, req.get("Authorization"));
    console.log(event);
  } catch (error) {
    console.error("Error validating webhook event", error);
  }
  res.status(200).send();
});

const server = app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});

setupWebSocket(server);