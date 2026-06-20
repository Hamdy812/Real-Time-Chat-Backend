const Message = require("../models/MessageModel");
const mongoose = require("mongoose");

const getRoomId = (a, b) => [a, b].sort().join("_");

module.exports = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {

    socket.on("add_user", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("user_online", userId);
    });

    socket.on("join_room", ({ senderId, receiverId }) => {
      const roomId = getRoomId(senderId, receiverId);
      socket.join(roomId);
    });

   socket.on("send_message", async (data) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(data.sender) ||
      !mongoose.Types.ObjectId.isValid(data.receiver)
    ) {
      console.log("Invalid IDs:", data);
      return;
    }

    const roomId = getRoomId(data.sender, data.receiver);

    const message = await Message.create({
      sender: data.sender,
      receiver: data.receiver,
      messageContent: data.messageContent
    });

    io.to(roomId).emit("receive_message", message);

  } catch (err) {
    console.log(err);
  }
});

    socket.on("get_chat_history", async ({ senderId, receiverId }) => {
      try {
        const messages = await Message.find({
          $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId }
          ]
        }).sort({ createdAt: 1 });

        socket.emit("chat_history", messages);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("typing", ({ sender, receiver }) => {
      const roomId = getRoomId(sender, receiver);
      socket.to(roomId).emit("typing", { sender });
    });

    socket.on("stop_typing", ({ sender, receiver }) => {
      const roomId = getRoomId(sender, receiver);
      socket.to(roomId).emit("stop_typing", { sender });
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("user_offline", userId);
          break;
        }
      }
    });

  });
};