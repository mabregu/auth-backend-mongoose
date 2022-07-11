const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect() {
    // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
    mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Error connecting to database");
        console.log(err);
    });
}

module.exports = dbConnect;