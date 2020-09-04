const express = require("express");
const { Users } = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await Users.findByCredentials(req.body.email, req.body.password);
  if (!user) return res.send("Invalid username or password");

  const token = await user.genToken();

  res.send(token);
});

module.exports = router;
