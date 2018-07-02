const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

/* 
*TEMP 
*/
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/secret", (req, res) => {
  res.render("secret");
});

// Register
router.post("/register", (req, res) => {
  const { firstName, lastName, userName, email } = req.body;
  const isTechnical = req.body.isTechnical ? true : false;
  console.log("tech", isTechnical);

  const newUser = { firstName, lastName, userName, email, isTechnical };
  console.log(req.body);

  // res.redirect("secret");
  User.create(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.status(400).send(err);
    }
    passport.authenticate("local")(req, res, () => {
      console.log("req.user", req.user);
      const user = req.user;
      return res.status(200).send(user);
    });
  });
});

// == Login == //
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(`User Logged In - ${req.user.username}`);
  const user = req.user;
  res.send(user);
});

// == Logout == //
router.get("/logout", (req, res) => {
  console.log(`Logged Out - ${req.user.username}`);
  const logoutMsg = `${req.user.username} has been successfully logged out.`;
  req.logout();
  res.status(200).send({ msg: logoutMsg });
});

module.exports = router;
