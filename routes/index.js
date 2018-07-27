const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("If you are seeing this, something may be wrong");
});

module.exports = router;
