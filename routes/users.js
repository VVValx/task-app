const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { Users, validateUser } = require("../models/users");

router.get("/", async (req, res) => {
  const users = await Users.find().select("name username email -_id");
  res.send(users);
});

router.post("/", async (req, res) => {
  const obj = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    repassword: req.body.repassword,
    email: req.body.email,
  };

  const { error } = validateUser(obj);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne().or([
    { email: req.body.email },
    { username: req.body.username },
  ]);
  if (user) return res.status(400).send("User already exist");

  user = new Users({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  user.password = newPassword;

  user = await user.save();

  res.send({
    name: user.name,
    username: user.username,
    email: user.email,
  });
});

router.put("/", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User does not exist");

  user.name = req.body.name;
  user = await user.save();

  res.send(user);
});

router.delete("/", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User does not exist");

  user = await Users.findOneAndDelete({ email: req.body.email });

  res.send({ email: user.email });
});

module.exports = router;
