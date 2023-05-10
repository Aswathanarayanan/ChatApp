const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: true,
        });
        console.log(`Mongo db connected ${conn.connection.host}`)
    } catch (error) {
        console.log(MONGO_URI);
        console.log(`db connection error`);
        process.exit();
    }
};

module.exports = connectDB;