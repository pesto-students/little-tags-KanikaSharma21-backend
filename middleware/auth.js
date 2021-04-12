const jwt = require("jsonwebtoken");
const { MIDDLEWARE_AUTH_CONSTANTS } = require("../config/constants.js");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../models/user");

const userAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();
  req.apiId = mongoose.Types.ObjectId();
  req.startTimeMilli = Math.round(new Date());

  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role === "user") {
      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return res
          .status(401)
          .send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_USER });
      }

      req.userData = user;
    } else {
      return res
        .status(403)
        .send({ statusCode: 403, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN });
    }

    next();
  } catch (ex) {
    res.status(401).send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_AUTH_TOKEN });
  }
};

const adminAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  req.apiId = mongoose.Types.ObjectId();
  req.startTimeMilli = Math.round(new Date());
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role !== "admin")
      return res
        .status(403)
        .send({ statusCode: 403, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN });

    next();
  } catch (ex) {
    res.status(401).send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_AUTH_TOKEN });
  }
};

const userAdminAuth = async function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  req.apiId = mongoose.Types.ObjectId();
  req.startTimeMilli = Math.round(new Date());
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ apiId: req.apiId, statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED });

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.jwtData = decoded;

    if (decoded.role === "user") {
      let user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        return res
          .status(401)
          .send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_USER });
      }

      req.userData = user;
    } else if (decoded.role === "admin") {
      let admin = await User.findOne({ _id: decoded.userId });
      if (!admin) {
        return res
          .status(401)
          .send({ statusCode: 401, message: "Failure", data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_ADMIN });
      }
    } else {
      return res.status(403).send({
        apiId: req.apiId,
        statusCode: 403,
        message: "Failure",
        data: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN,
      });
    }

    next();
  } catch (ex) {
    res.status(401).send({
      apiId: req.apiId,
      statusCode: 401,
      message: "Failure",
      data: MIDDLEWARE_AUTH_CONSTANTS.INVALID_AUTH_TOKEN,
    });
  }
};

module.exports.adminAuth = adminAuth;
module.exports.userAuth = userAuth;
module.exports.userAdminAuth = userAdminAuth;
