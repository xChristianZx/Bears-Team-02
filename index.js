const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const keys = require("./config/keys");

const app = express();

/* Mongoose connection to mLab */
mongoose.Promise = global.Promise;
mongoose.connect(keys.mLabURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to mLab Database");
});

/* Temporary Home Route */
app.get("/", (req, res) => {
  res.send("Hello Monica, Radhika, and Christian!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
