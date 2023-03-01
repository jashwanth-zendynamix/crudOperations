const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const db = {};

mongoose
  .connect(
    "mongodb+srv://jashwanth:1234@cluster0.fxgeerk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

db.userModel = require("../models/user.model")(mongoose);
module.exports = db;
