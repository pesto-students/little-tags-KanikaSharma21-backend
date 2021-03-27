const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");
const { ADMIN_CONSTANTS } = require("../config/constants");

router.post("/", async (req, res) => {
  let email = req.body.email.toLowerCase();
  let admin = await User.findOne({ role: "admin", email: email });
  if (!admin) return res.send({ statusCode: 400, status: "Failure", data: { data: ADMIN_CONSTANTS.ADMIN_NOT_FOUND } });

  const token = admin.generateAuthToken();
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) {
    return res.status(400).send({ statusCode: 400, message: "Failure", data: ADMIN_CONSTANTS.INVALID_CREDENTIALS });
  }

  let response = {
    adminId: admin._id,
    email: admin.email,
  };
  return res.header("Authorization", token).send({ statusCode: 200, message: "Success", data: response });
});

module.exports = router;
