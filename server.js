const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");



// console.log(process.env);
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

//mongoose.connect(process.env.DATABASE_LOCAL, {  // if using local database
mongoose.connect(DB)
    .then(() => {
        console.log('DB Connection successful!');
    })
// .catch(err => console.error(err));



const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log("UNHANDLER REJECTION! 💥 Shutting down...");
    server.close(() => {
        process.exit(1);
    })
});

// console.log(x); //error in console handle by uncaught exception



