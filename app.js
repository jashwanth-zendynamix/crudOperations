const express = require("express");
const path = require("path");
const app = express();
// const formidable = require("express-formidable");

uploadDir = path.join(__dirname + "/uploads");
app.use(express.json());
module.exports = { app, express, uploadDir };
