const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const { Users, validateUser } = require("../models/users");

router.get("/", admin, async (req, res) => {
  const users = await Users.find().select("username email -_id");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = req.user;
  res.send({ name: user.name, username: user.username, email: user.username });
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
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

  const token = await user.genToken();

  user = await user.save();

  res.header("x-token", token).send({
    name: user.name,
    username: user.username,
    email: user.email,
  });
});

router.patch("/:id", auth, async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedKeys = ["name", "username", "password", "email"];
  const isAllowed = keys.every((key) => allowedKeys.includes(key));

  if (!isAllowed) return res.status(400).send("Update now allowed");

  let user = await Users.findById(req.params.id);
  if (!user) return res.status(404).send("User does not exist");

  keys.forEach(async (key) => (user[key] = req.body[key]));

  user = await user.save();

  res.send(req.body);
});

router.delete("/", auth, async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User does not exist");

  user = await Users.findOneAndDelete({ email: req.body.email });

  res.send({ email: user.email });
});

module.exports = router;
