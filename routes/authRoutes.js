const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { isLoggedIn } = require("../middleware/helper");
/* 
  * TEMP Routing
*/
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/secret", isLoggedIn, (req, res) => {
  res.render("secret");
});

// == Register == //
router.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const isTechnical = req.body.isTechnical ? true : false;

  const newUser = {
    firstName,
    lastName,
    username,
    email,
    isTechnical
  };

  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    passport.authenticate("local")(req, res, () => {
      console.log("req.user", req.user);
      const user = req.user;
      return res.redirect("secret");
    });
  });
});

// == Login == //
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(`User Logged In - ${req.user.username}`);
  res.redirect("secret");
});

// == Logout == //
router.get("/logout", (req, res) => {
  console.log(`Logged Out - ${req.user.username}`);
  const logoutMsg = `${req.user.username} has been successfully logged out.`;
  req.logout();
  res.status(200).send({ msg: logoutMsg });
});

module.exports = router;
