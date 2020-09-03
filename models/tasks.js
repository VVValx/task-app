const mongoose = require("mongoose");
const Joi = require("joi");

const tasksSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  DateCreated: {
    type: Date,
    default: Date.now,
  },
  DateCompleted: {
    type: Date,
    required: function () {
      return this.completed;
    },
  },
});

const Tasks = mongoose.model("Task", tasksSchema);

function validateTask(obj) {
  const schema = Joi.object({
    description: Joi.string().min(5).max(50).required(),
    completed: Joi.boolean(),
  });

  return schema.validate(obj);
}

module.exports = {
  tasksSchema: tasksSchema,
  Tasks: Tasks,
  validateTask: validateTask,
};
