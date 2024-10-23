const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chatUsers", userSchema);
