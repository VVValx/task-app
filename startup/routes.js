const path = require("path");
const express = require("express");
const home = require("../routes/home");
const users = require("../routes/users");
const notFound = require("../routes/404");

module.exports = function (app) {
  //directories
  const views = path.join(__dirname, "../views/main");

  //set views
  app.set("view engine", "hbs");
  app.set("views", views);

  //for body
  app.use(express.json());

  //use routes
  app.use("/", home);
  app.use("/users", users);
  app.use("/", notFound);
};
