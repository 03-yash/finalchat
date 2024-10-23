const asyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel')

const createChat = asyncHandler(async (req, res) => {
  const { senderID, receiverID } = req.body;
 
  try {
    const chat = await Chat.findOne({
      members: { $all: [senderID, receiverID] },
    });
    if (chat) {
      res.status(200).json(chat);
    } else {
      const newChat = new Chat({
        members: [senderID, receiverID],
      });

      const result = await newChat.save();
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


const userChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

const findChat = asyncHandler(async (req, res) => {
  const { senderID, receiverID } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [senderID, receiverID] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = { findChat, userChat, createChat };
