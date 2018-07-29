const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

/* 
  Main List Render - Aggregates list of connections that are not the current loggedInUser 
and people the loggedInUser is currently not connected to 
*/
// Find all users
// Filter out current loggedInUsers
// Filter Tech vs Non-Tech
// Filter out current connections

router.get("/", requireAuth, (req, res) => {
  const loggedInUserID = req.user._id;
  const { isTechnical } = req.query; // Note: returns String, not Boolean
  // Filtering current loggedInUser ($ne === not equal)
  User.find({ _id: { $ne: loggedInUserID } })
    .populate("pendingConnectionRequests")
    //Filter isTech/Non-Tech - if none(undefined) === all founders
    .then(userList => {
      if (isTechnical === "false" || isTechnical === "true") {
        return userList.filter(
          user => user.isTechnical.toString() === isTechnical
        );
      } else {
        return userList;
      }
    })
    .then(list => res.send(list))
    .catch(err => console.log(err));
});

module.exports = router;
