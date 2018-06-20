const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const keys = require("./config/keys");

const app = express();

/* Mongoose connection to mLab */
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mLabURI)
  .then(() => console.log("Connected to mLab DB"))
  .catch(err => console.log("Error connecting to mLab", err));

/* Temporary Home Route */
app.get("/", (req, res) => {
  res.send("Hello Monica, Radhika, and Christian!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
