require('dotenv').config();
const mongoose = require('mongoose');

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

async function connectToMongoDB() {
    if (!CONNECTION_URL) {
        console.error("Error: MONGODB_CONNECTION_URL environment variable is not set.");
    } else {
        await mongoose.connect(CONNECTION_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then((res) => {
            console.log("Hurray!! Successfully Connected to the database");
        }).catch((err) => {
            console.log("Connection failed to the database!!");
        });
    } 
}

module.exports = connectToMongoDB;