const Message = require("../models/msgModel");

const addMessage = async (req, res) => {

  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { id: chatID } = req.params; // Access id directly from req.params
  
  try {
    const result = await Message.find({ chatId: chatID });
  
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getMessages, addMessage };
