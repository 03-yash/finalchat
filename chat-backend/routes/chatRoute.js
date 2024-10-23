const express = require("express");
const { createChat, findChat, userChat } = require("../controller/chatController");

const router = express.Router()


router.post("/", createChat)
router.get('/:userId' ,  userChat)
router.get("/find/:firstId/:secondId" , findChat)

module.exports = router;