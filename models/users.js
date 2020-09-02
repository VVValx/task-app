const mongoose = require("mongoose");
const Joi = require("joi");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true,
    required: true,
  },

  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    trim: true,
    lowercase: true,
    required: true,
  },

  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    lowercase: true,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", usersSchema);

function validate(obj) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    username: Joi.string().alphanum().min(5).max(50).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
    repassword: Joi.ref("password"),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });

  return schema.validate(obj);
}

module.exports = {
  usersSchema: usersSchema,
  Users: Users,
  validate: validate,
};
