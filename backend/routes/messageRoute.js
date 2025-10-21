import express from "express";
import { getMessage, sendMessage, clearChat, deleteSelectedMessages } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Send a new message
router.post("/send/:id", isAuthenticated, sendMessage);

// Get messages for a chat/user
router.get("/:id", isAuthenticated, getMessage);

// Clear all messages for a user/chat
router.delete("/clear-all/:userId", isAuthenticated, clearChat);

// Delete selected messages (bulk)
router.post("/delete-bulk", isAuthenticated, deleteSelectedMessages);

export default router;
