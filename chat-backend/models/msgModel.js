const { mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    // :65fc9d9c0c45caa9181b5d70
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
