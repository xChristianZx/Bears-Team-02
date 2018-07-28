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
// Filter out current connections
router.get("/", requireAuth, (req, res) => {
  const loggedInUserID = req.user._id;
  // * Need .toString for ObjectId comparison

  // Filtering current loggedInUser ($ne === does not equal)
  User.find({ _id: { $ne: loggedInUserID } })
    //Required for filter on /client/connectcomp Btn Rendering
    .populate("pendingConnectionRequests")
    .populate("connections")
    //Filter current connections
    .then(list => res.send(list))
    .catch(err => console.log(err));
});

module.exports = router;
