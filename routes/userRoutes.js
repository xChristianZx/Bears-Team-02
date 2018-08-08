const express = require("express");
const router = express.Router();
const User = require("../models/User");
const chalk = require("chalk");
const passport = require("passport");
const jwt = require("jwt-simple");

const requireAuth = passport.authenticate("jwt", { session: false });

/* Currently Unused, maintaining for potential future refactor to separate some authRoutes */

/* 
  * Route prefix: /user
  * This routing should be used for the User Info & Profile page
  * to retrieve and update user info
*/

/* Retrieve LoggedIn User info */
// router.get("/", (req, res) => {
//   const { id } = req.user;
//   User.findById({ _id: id }, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     }
//     res.send(user);
//   });
// });

// /*

/* Update User info */
router.put("/", requireAuth, (req, res) => {
  // * Handling updates to user profile
  const { _id } = req.user;
  const { body } = req;
  // console.log("Body", body);
  User.findByIdAndUpdate({ _id }, body, { new: true }, (err, user) => {
      if (err) {
        console.log(err);
        res.send({ err, message: `There was an error with the update` });
      }
      // console.log("NEWUSER", user)
      res.send({
        user,
        message: `${user.firstName} has been successfully updated`
      });
    });
});

// router.delete("/deleteUser", (req, res) => {
//   const { id } = req.user;
//   User.findByIdAndRemove({ _id: id }, (err, user) => {
//     if (err) {
//       throw err;
//     }
//     console.log(chalk.green(`${user.name} has been deleted`));
//     return res.status(200);
//   });
// });

module.exports = router;
