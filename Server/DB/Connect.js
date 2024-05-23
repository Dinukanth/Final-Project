const mongoose = require('mongoose');
require('dotenv').config();
const envurl = process.env.mongodburl;

function connectDB() {
   mongoose.connect(envurl)
      .then(() => console.log("You are connected"))
      .catch((err) => console.log("You are not connected", err));
}

module.exports = connectDB;
