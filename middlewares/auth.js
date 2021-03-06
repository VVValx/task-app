const jwt = require("jsonwebtoken");
const { Users } = require("../models/users");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretKey");

    const user = await Users.findOne({
      _id: decoded._id,
      tokens: { $in: token },
    });
    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send("Unathorised Acess");
  }
};
