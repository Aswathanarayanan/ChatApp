const express = require("express");
const {chats} = require("./data/data")
const dotenv = require("dotenv");
const res = require("express/lib/response");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes =require("./routes/chatRoutes")

dotenv.config()
const app = express();
connectDB();
 

app.use(express.json());

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

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`Server started on PORT ${PORT}`));