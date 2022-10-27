const mongoose = require('mongoose')

let isConnected = false

module.exports = connectToDatabase = async() => {
    if(isConnected) {
        console.log("----Using existing db connection");
        return
    }

    console.log("----Makign new connection to database");
    mongoose.connect(process.env.DB);
    isConnected = true;
}