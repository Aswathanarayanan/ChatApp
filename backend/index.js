const express = require("express");
const {chats} = require("./data/data")
const dotenv = require("dotenv");
const res = require("express/lib/response");


const PORT = process.env.PORT || 5000

const app = express();

app.get("/",(req,res) => {
    res.send("Home Page CHAT APP");
});

app.get("/api/chat", (req,res) => {
    res.send(chats);
});

app.get("/api/chat/:id", (req,res) => {
    const reqchat = chats.find((c) => c._id === req.params.id);
    res.send(reqchat);
});

app.listen(5000 , console.log(`Server started on PORT ${PORT}`));