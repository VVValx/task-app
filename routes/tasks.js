const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Tasks, validateTask } = require("../models/tasks");

router.get("/", async (req, res) => {
  const tasks = await Tasks.find({ completed: false }).select(
    "description -_id"
  );

  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const obj = {
    description: req.body.description,
  };
  const { error } = validateTask(obj);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Tasks(obj);
  task = await task.save();

  res.send({ description: task.description });
});

router.patch("/:id", auth, async (req, res) => {
  const { error } = validateTask({ description: req.body.description });
  if (error) return res.status(400).send(error.details[0].message);

  let task = await Tasks.findById(req.params.id);
  if (!task) return res.status(404).send("Task does not exist");

  const keys = Object.keys(req.body);
  keys.forEach((key) => (task[key] = req.body[key]));

  task = await task.save();

  res.send({ description: task.description });
});

router.delete("/:id", auth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validId) return res.status(400).send("Invalid task id");

  let task = await Tasks.findById(req.params.id);
  if (!task) return res.status(404).send("Task does not exist");

  task = await Tasks.findByIdAndDelete(req.body.id);

  res.send(task);
});

module.exports = router;
