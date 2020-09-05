const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    required: true,
  },

  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    trim: true,
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

  tokens: [{ type: String, required: true }],

  isAdmin: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

usersSchema.methods.genToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "secretKey");

  this.tokens.push(token);
  await this.save();

  return token;
};

usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) return null;

  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass) return null;

  return user;
};

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Users = mongoose.model("Users", usersSchema);

function validateUser(obj) {
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
  validateUser: validateUser,
};
