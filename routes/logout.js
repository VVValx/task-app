const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  const user = req.user;
  const token = req.token;

  const index = user.tokens.indexOf(token);
  user.tokens.splice(index, 1);

  await user.save();
  res.send("logged out sucessfully");
});

router.post("/all", auth, async (req, res) => {
  req.user.tokens = [];

  await user.save();
  res.send("logged out of all accounts");
});
module.exports = router;
