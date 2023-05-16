const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const logger = require("../../logger");

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        logger.error("enter the values to register the user");
        res.status(400);
        throw new Error("enter the values")
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        logger.error("user already exists");
        res.status(400);
        console.log(userExists.name);
        throw new Error("user already exixts");
    }
    
    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        logger.info("user created")
        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id)
        });
    } else {
        logger.error("failed to create user")
        res.status(400);    
        throw new Error("failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    console.log(user.name);
    
    if (user && (await user.matchPassword(password))) {
        logger.info(user.name + " logged in succesfully")
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [ { name: { $regex: req.query.search, $options: "i" } }, { email: { $regex: req.query.search, $options: "i" } },],
    }
    : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    logger.info("all users fetched");
    res.send(users);
  });
  

module.exports = { registerUser ,authUser, allUsers };

