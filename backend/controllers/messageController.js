import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// ✅ Send a new message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message content is required." });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get previous messages in a conversation
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // return empty array, not undefined
    }

    return res.status(200).json(conversation.messages || []);
  } catch (error) {
    console.error("Error in getMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}; 

export const clearChat = async (req, res) => {
  try {
    const { userId } = req.params;
    // Adjust the filter to your schema - this will delete all messages sent or received by userId
    await Message.deleteMany({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    });
    res.json({ message: 'Chat cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear chat' });
  }
};

export const deleteSelectedMessages = async (req, res) => {
  try {
    const { messageIds } = req.body;
    if (!Array.isArray(messageIds) || !messageIds.length) {
      return res.status(400).json({ error: 'No message IDs provided.' });
    }
    await Message.deleteMany({ _id: { $in: messageIds } });
    res.json({ message: 'Selected messages deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete selected messages' });
  }
};