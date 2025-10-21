import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS setup for frontend communication
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const server = http.createServer(app);

// ✅ Attach Socket.IO to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Track online users: { userId: socketId }
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("🔗 New connection:", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("🆔 Received userId:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("📌 User mapped:", userSocketMap);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Start server
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

export { app, io, server };
