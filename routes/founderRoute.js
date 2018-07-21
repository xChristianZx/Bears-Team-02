const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, (req, res) => {
  const loggedInUserID = req.user._id;
  // * Need .toString for ObjectId comparison
  User.find({})
    .populate("pendingConnectionRequests")
    .then(userList => {
      return userList.filter(
        user => user._id.toString() !== loggedInUserID.toString()
      );
    })
    .then(list => res.send(list))
    .catch(err => console.log(err));
});

module.exports = router;
