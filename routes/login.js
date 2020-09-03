const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await Users.findOne().or([
    { email: req.body.email },
    { username: req.body.username },
  ]);

  if (!user) return res.status(400).send("Invalid username/email or password");

  const isPass = await bcrypt.compare(req.body.password, user.password);
  if (!isPass)
    return res.status(400).send("Invalid username/email or password");

  const token = user.genToken();
  res.send(token);
});

module.exports = router;
