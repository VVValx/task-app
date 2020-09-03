const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/task", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("conneted to database"))
    .catch((err) => console.log(err));
};
