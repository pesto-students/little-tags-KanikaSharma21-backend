const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// Create a new user
router.post("/", async (req, res) => {
  const { error } = validateUserPost(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: error.details[0].message });

  var email, phone;
  if (req.body.email) email = req.body.email.toLowerCase() || "NMB";
  if (req.body.phone) phone = req.body.phone || "NMB";
  let user = await User.findOne({ $or: [{ email: email }, { phone: phone }] });

  if (user) {
    if (email === user.email)
      return res.status(400).send({ statusCode: 400, message: "Failure", data: USER_CONSTANTS.EMAIL_ALREADY_EXISTS });

    if (req.body.phone && req.body.phone != "" && req.body.phone === user.phone)
      return res.status(400).send({ statusCode: 400, message: "Failure", data: USER_CONSTANTS.PHONE_ALREADY_EXISTS });
  }

  if (req.body.otpToken) {
    let isValid = await verifyAndDeleteToken(email, req.body.otpToken, "UR");
    if (!isValid) {
      return res.status(400).send({ statusCode: 400, message: "Failure", data: USER_CONSTANTS.INVALID_OTP });
    }
  }

  user = new User(
    _.pick(req.body, [
      "userId",
      "fullName",
      "phone",
      "userType",
      "deviceToken",
      "profilePic",
      "title",
      "organization",
      "pronoun",
      "category",
      "status",
      "notifications",
      "insertDate",
      "bio",
    ])
  );

  user.email = email;

  // encrypt password
  if (req.body.password) user.password = await bcrypt.hash(req.body.password, config.get("bcryptSalt"));
  user.status = "active";
  const token = user.generateAuthToken();
  user.accessToken = token;
  await user.save();
  user.userId = user._id;
  let response = _.pick(user, [
    "userId",
    "email",
    "fullName",
    "phone",
    "userType",
    "deviceToken",
    "profilePic",
    "title",
    "organization",
    "pronoun",
    "category",
    "status",
    "notifications",
    "insertDate",
    "bio",
  ]);
  res.header("Authorization", token).send({ statusCode: 200, message: "Success", data: response });
});

module.exports = router;
