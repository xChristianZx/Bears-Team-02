const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false })

router.get("/",requireAuth, (req, res) => {
  User.find({})
    .then(userList => res.send(userList))
    .catch(err => console.log(err));
});

module.exports = router;
 