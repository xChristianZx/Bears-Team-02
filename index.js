const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

const indexRoutes = require("./routes/index");
const founderRoutes = require("./routes/founderRoute");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* Mongoose connection to mLab */
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mLabURI)
  .then(() => console.log("Connected to mLab DB"))
  .catch(err => console.log("Error connecting to mLab", err));

/* Express Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/", indexRoutes);
app.use("/founders", founderRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
