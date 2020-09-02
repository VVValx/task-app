const path = require("path");
const home = require("../routes/home");
const notFound = require("../routes/404");

module.exports = function (app) {
  //directories
  const views = path.join(__dirname, "../views/main");

  //set views
  app.set("view engine", "hbs");
  app.set("views", views);

  //use routes
  app.use("/", home);
  app.use("/", notFound);
};
