const express = require("express");
const {
  registerUser,
  loginUser,
  protectedResponse,
  allUsers,
} = require("../controller/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .post("/", registerUser)
  .get('/', allUsers)
  .post("/login", loginUser)
  .post("/protected", protect, protectedResponse);

module.exports = router;
