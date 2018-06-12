const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Monica, Radhika, and Christian!')
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
