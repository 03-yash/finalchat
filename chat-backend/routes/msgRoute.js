const express = require("express");
const { addMessage, getMessages } = require("../controller/msgController");


const router = express.Router();

router.get('/:id', getMessages)
router.post('/', addMessage)


module.exports = router; 