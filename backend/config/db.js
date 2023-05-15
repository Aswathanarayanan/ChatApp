const mongoose = require("mongoose");
const logger = require("../../logger");

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: true,
        });
        logger.info(`Mongo db connected`);
        console.log(`Mongo db connected ${conn.connection.host}`)
    } catch (error) {
        //console.log(MONGO_URI);
        logger.info(`db connection error`);
        console.log(`db connection error`);
        process.exit();
    }
};

module.exports = connectDB;