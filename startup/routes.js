const path = require("path");
const express = require("express");
const home = require("../routes/home");
const users = require("../routes/users");
const tasks = require("../routes/tasks");
const login = require("../routes/login");
const logout = require("../routes/logout");
const notFound = require("../routes/404");

module.exports = function (app) {
  //directories
  const views = path.join(__dirname, "../views/main");
  const public = path.join(__dirname, "../public");

  //set views
  app.set("view engine", "hbs");
  app.set("views", views);

  //set public
  app.use(express.static(public));

  //for body
  app.use(express.json());

  //use routes
  app.use("/", home);
  app.use("/users", users);
  app.use("/tasks", tasks);
  app.use("/login", login);
  app.use("/logout", logout);
  app.use("/", notFound);
};
