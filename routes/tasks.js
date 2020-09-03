const express = require("express");
const router = express.Router();
const { Tasks, validateTask } = require("../models/tasks");

router.get("/", async (req, res) => {
  const tasks = await Tasks.find().select("description completed");

  res.send(tasks);
});

router.post("/", async (req, res) => {
  const obj = {
    description: req.body.description,
  };
  const { error } = validateTask(obj);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Tasks(obj);
  task = await task.save();

  res.send({ description: task.description });
});

module.exports = router;
