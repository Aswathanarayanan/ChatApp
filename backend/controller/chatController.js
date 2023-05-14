const asyncHandler = require("express-async-handler");
const logger = require("../../logger");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        logger.info("userid param not sent");
        console.log("userid param not sent");
        return res.sendStatus(400);
    } else {
        console.log("userid param sent is correct");
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password").populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        //console.log("sending chat" + isChat[0])
        logger.info("chat found");
        res.send(isChat[0]);
    } else {
        logger.info("chat not found , creating");
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],  //user._is:loginuser , userId: who to chat
        }

        try {
            const createdChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

            console.log("/chats is success")
            logger.info("chat created");
            res.status(200).send(fullChat);
        } catch (error) {
            logger.error("error creating chat "+error);
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    //console.log("inside fetch chats "+req.user._id)
    try {
        //console.log("inside fetch chats "+req.user._id)
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                //console.log("inside fetch chats "+req.user._id)
                logger.info("fetched chats");
                res.status(200).send(results);
            });
        //res.status(200).send(chats);
        
    } catch (error) {
        logger.error("cannot fetch chats "+error)
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        logger.error("form not filled");
        return res.status(400).send({ message: "please fill" });
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        logger.error("more than 2 users is needed")
        return res.status(400).send("more than 2 users is needed");
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        
        logger.info("group created" + groupChat.name);
        res.status(200).json(fullGroupChat);
    } catch (error) {
        logger.error("group creatin failed " + error);
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        logger.error("cannnot rename ,chat not found")
        res.status(404);
        throw new Error("chat not found")
    } else {
        logger.info("renamed chat " + updatedChat.chatName);
        res.json(updatedChat);
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const adduser = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!adduser) {
        logger.error("cannnot add ,group not found")
        res.status(404);
        throw new Error("chat not found");
    } else {
        logger.info("added to group");
        res.json(adduser);
    }
});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removeuser = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removeuser) {
        logger.error("cannnot remove ,group not found")
        res.status(404);
        throw new Error("chat not found");
    } else {
        logger.info("removed from group");
        res.json(removeuser);
    }
});

module.exports = { accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup };