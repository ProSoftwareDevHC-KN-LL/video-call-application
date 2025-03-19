import { Server } from "socket.io"
import { Server as HttpServer } from "http"

interface SignalData {
    callId: string;
    payload: any;
}

const rooms = new Map<string, string[]>();

export function setupWebSocket(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    io.on("connection", (socket) => {
        console.log("New WebSocket Connection:", socket.id)
        // Handle join call
        socket.on("join_call", (callId: string) => {
            try {
                socket.join(callId);
                console.log(`📞 User joined call ${callId}`);
            } catch (error) {
                console.error("Error joining call:", error);
            }
        });

        // Handle signaling messages (for WebRTC)
        socket.on("signal", (data: SignalData) => {
            try {
                io.to(data.callId).emit("signal", data);
            } catch (error) {
                console.error("Error sending signal:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("❌ User disconnected");
        });
    })
}