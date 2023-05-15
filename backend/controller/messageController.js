const asyncHandler = require("express-async-handler");
const Message = require ("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/messageModel");
const logger = require("../../logger");

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
  if (!content || !chatId) {
      logger.error("Invalid data passed into request for sending message")
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      
      //console.log("sendong message "+message)
      logger.info("message sent by "+message.sender.name)
      res.json(message);
    } catch (error) {
      logger.error("not sending message "+error)
      console.log("not sending message "+error)
      res.status(400);
      throw new Error(error.message);
    }
  });

const allMessages = asyncHandler(async ( req, res) => {

    try {
      const message = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat");
      logger.info("all mesages for the chat fetched");
        res.json(message);
    } catch (error) {
      logger.error("cannot fetch the messages " + error);
      console.log(error);
        res.status(400);
        throw new Error();
    }
});

module.exports = { sendMessage, allMessages };