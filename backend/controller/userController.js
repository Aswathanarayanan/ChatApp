const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("enter the valuse")
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
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
        res.status(201).json({
            _id: user._id,
            name: user.name,
            toker: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    console.log(user.name);
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
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
    
    res.send(users);
  });
  

module.exports = { registerUser ,authUser, allUsers };

