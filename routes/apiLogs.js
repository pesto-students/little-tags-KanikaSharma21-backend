const config = require("config");
const mongoose = require("mongoose");
const { ApiLog } = require("../models/apiLog");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let criteria = {};

  if (req.query.apiId) criteria.apiId = req.query.apiId;
  if (req.query.email) criteria.email = req.query.email;
  if (req.query.url) criteria.url = req.query.url;
  if (req.query.method) criteria.method = req.query.method;
  if (req.query.time == "yes") {
    var startDate = Math.round(new Date().setHours(0, 0, 0) / 1000); // get current date
    var endDate = startDate + 86400;
    criteria.insertDate = {
      $gte: startDate,
      $lt: endDate,
    };
    criteria.responseTimeMilli = { $gt: 1500 };
  }
  if (req.query.statusCode) criteria.statusCode = parseInt(req.query.statusCode);
  let apiList = await ApiLog.aggregate([
    { $match: criteria },
    { $sort: { insertDate: -1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return res.send({ apiId: req.apiId, statusCode: 200, message: "Success", data: { apiList } });
});

module.exports = router;
