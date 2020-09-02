const express = require("express");
const router = express.Router();

const { Users, validate } = require("../models/users");

router.get("/", async (req, res) => {
  const users = await Users.find().select("name username email");
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

  const { error } = validate(obj);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  user = new Users({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  user = await user.save();

  res.send({
    name: user.name,
    username: user.username,
    email: user.email,
  });
});

module.exports = router;
