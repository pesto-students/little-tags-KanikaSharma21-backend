const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../models/user");

userAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({ statusCode: 401, message: "Failure", data: "Access denied. No token provided" });

  let user = {};
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role === "user") {
      user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res.status(401).send({ statusCode: 401, message: "Failure", data: "Access denied. No token provided" });
      }

      req.userData = user;
    } else {
      return res.status(403).send({ statusCode: 403, message: "Failure", data: "Access denied" });
    }

    next();
  } catch (ex) {
    res.status(401).send({ statusCode: 401, message: "Failure", data: "Invalid token" });
  }
};

adminAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({ statusCode: 401, message: "Failure", data: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role !== "admin")
      return res.status(403).send({ statusCode: 403, message: "Failure", data: "Access denied" });

    next();
  } catch (ex) {
    res.status(401).send({ statusCode: 401, message: "Failure", data: "Invalid token" });
  }
};

userAdminAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: "Access denied. No token provided" });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role === "user") {
      let user = await User.findOne({ _id: mongoose.Types.ObjectId(decoded.userId) });

      if (!user) {
        return res.status(401).send({ statusCode: 401, message: "Failure", data: "Access denied. No token provided" });
      }

      req.userData = user;
    } else if (decoded.role === "admin") {
      let admin = await User.findOne({ _id: decoded.userId });
    } else {
      return res.status(403).send({ apiId: req.apiId, statusCode: 403, message: "Failure", data: "Access denied" });
    }

    next();
  } catch (ex) {
    res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: "Invalid token" });
  }
};

module.exports.adminAuth = adminAuth;
module.exports.userAuth = userAuth;
module.exports.userAdminAuth = userAdminAuth;
