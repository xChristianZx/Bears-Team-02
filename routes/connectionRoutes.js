const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");
const ConnectionRequest = mongoose.model("ConnectionRequest");
const requireAuth = passport.authenticate("jwt", { session: false });

/* Route prefix: /connections */

// == Main Handler for /connect list render == //
router.get("/", requireAuth, (req, res) => {
  const userID = req.user._id;
  const userConnections = req.user.connections;
  const blockedConnections = req.user.blockedConnections;
  const { hiddenUsers } = req.user;
  const { isTechnical } = req.query; // Note: returns a String, not a Boolean
  /*  
    .find() params: Filters current loggedInUser and current connections
    with ($nin: "not in" - matches none of values in array ) 
   */
  User.find({
    _id: {
      $nin: [userID, ...userConnections, ...blockedConnections, ...hiddenUsers]
    }
  })
    .populate("pendingConnectionRequests")
    //Filter isTech/Non-Tech - if none(undefined) === all founders
    .then(userList => {
      if (isTechnical === "false" || isTechnical === "true") {
        return userList.filter(user => user.isTechnical.toString() === isTechnical);
      } else {
        return userList;
      }
    })
    .then(list => res.send(list))
    .catch(err => console.log(err));
});

/*  Endpoint for getPendingConnections() Action Creator*/
router.get("/pendingconnections", requireAuth, (req, res) => {
  let connectionRequests = {
    pending: [],
    acceptable: []
  };

  ConnectionRequest.find({ requestingUser: req.user._id })
    .populate("requestedUser")
    .exec((err, connReqs) => {
      let error = null;

      if (err) {
        error = err;
      }

      connReqs.map(connReq => {
        if (connReq.status === "Pending") {
          connectionRequests.pending.push(connReq);
        }
      });

      ConnectionRequest.find({ requestedUser: req.user._id })
        .populate("requestingUser")
        .exec((err, connReqs) => {
          if (err) {
            error = err;
          }
          connReqs.map(connReq => {
            if (connReq.status === "Pending") {
              connectionRequests.acceptable.push(connReq);
            }
          });

          let count = connectionRequests.pending.length + connectionRequests.acceptable.length;
          if (error) {
            res.json({
              success: false,
              error
            });
          } else {
            res.json({
              success: true,
              connectionRequests,
              pendingRequests: count
            });
          }
        });
    });
});

/* Send Connection Request */
router.post("/connectionrequest", requireAuth, (req, res) => {
  let newConnectionRequest = {
    requestingUser: req.user._id,
    requestedUser: req.body.requestedUser
  };
  // console.log(`NOTE to self: newConnectionRequest .create is commented out; not creating new requests`)
  ConnectionRequest.create(newConnectionRequest, (err, conReq) => {
    if (conReq) {
      res.json({
        success: true,
        conReq
      });
    }
  });
});

/*
	Takes a connection request ID the requesting user and action. It then finds the connection
	changes the status to the given action. If the action is accepted it will add the new
	connection to each users connections array.
*/
router.post("/pendingconnectionresponse", requireAuth, (req, res) => {
  let connectionRequest = req.body.connectionRequest.toString();
  let acceptingUser = req.user._id.toString();
  let action = req.body.action;

  ConnectionRequest.findById(connectionRequest, (err, connReq) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    }

    connReq.status = action;
    connReq.save();

    if (action === "Accepted") {
      User.findById(acceptingUser, (err, user) => {
        if (err) {
          res.json({
            success: false,
            error: err
          });
        }
        user.connections.push(connReq.requestingUser);
        user.save();

        User.findById(connReq.requestingUser, (err, user) => {
          if (err) {
            res.json({
              success: false,
              error: err
            });
          }

          user.connections.push(acceptingUser);
          user.save();
          res.json({
            success: true,
            message: "Connection request accepted."
          });
        });
      });
    } else {
      res.json({
        success: true,
        message: "Connection request declined."
      });
    }
  });
});

/* Block/ Hide a connection */
router.post("/blockconnection", requireAuth, (req, res) => {
  const loggedInUserId = req.user._id;
  const userToBlock = req.body.blockedUserId;

  // ? - Better way to handle multiple docs update async; as queries do not return promises

  /*  1. Find userToBlock and remove loggedInUser from their connections list */
  const updateBlockedUserConnections = User.findByIdAndUpdate(
    userToBlock,
    {
      $addToSet: { hiddenUsers: loggedInUserId },
      $pull: { connections: loggedInUserId }
    },
    { new: true }
  );

  /*  2. Find loggedInUser and remove userToBlock from connections and add to blockedConnections */
  const updateLoggedInUser = User.findByIdAndUpdate(
    loggedInUserId,
    {
      $addToSet: { blockedConnections: userToBlock },
      $pull: { connections: userToBlock }
    },
    { new: true }
  );

  return Promise.all([updateBlockedUserConnections, updateLoggedInUser])
    .then(() =>
      User.findById(loggedInUserId)
        .populate("connections")
        //   .populate("blockedConnections")  // No need to populate for now, id should suffice
        .then(user => res.status(200).send({ message: "Connection Blocked", user }))
    )
    .catch(error => res.status(400).send({ error: error.message }));
});

module.exports = router;

/* Note to future self re: block connection*/

// Started here
/* User.find({
  $and: [
    { _id: { $ne: loggedInUserID } },
    { _id: { $nin: loggedInUserConnections } }
  ]
}) */

//Refactored to here
/* User.find({
    { _id: { $ne: loggedInUserID }, $nin: loggedInUserConnections }
}) */

// And Finally
/* User.find({
  _id: {
    $nin: [loggedInUserID, ...loggedInUserConnections]
  }
}) */
