const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  return User.find({}, (err, user) => {
    if (err) {
      throw err;
    }
    res.send(user);
  });
});

module.exports = router;
