const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require('passport')
// Register
router.post("/register", (req, res) => {
  const { firstName, lastName, userName, email, isTechnical } = req.body;
  const newUser = { firstName, lastName, userName, email, isTechnical };
  User.create(newUser, (err, user) => {
    if (err) {
      return res.status(400).send(err);
    }
    // passport.authenticate('local')
  });
});
// Login

// Logout
