const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();

/* Express Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
