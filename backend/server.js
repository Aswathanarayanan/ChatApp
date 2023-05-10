const express = require("express");
const dotenv= require("dotenv");
const connectDB =require("./config/db");
const {chats} = require("./data/data");

const app = express();
dotenv.config();
connectDB();

app.get("/api/chat",(req,res) =>{
    res.send(chats);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`server started on PORT ${ PORT }`));