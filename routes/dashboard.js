const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { adminAuth } = require("../middleware/auth");
const { OrderHistory } = require("../models/orderHistory");

mongoose.set("debug", true);

router.get("/", adminAuth, async (req, res) => {
  let userCount = await User.find({ role: "user" }).count();
  let adminCount = await User.find({ role: "admin" }).count();
  let productCount = await Product.find().count();
  let response = {
    userCount: userCount,
    adminCount: adminCount,
    productCount: productCount,
  };
  return res.send({ statusCode: 200, status: "Success", data: response });
});

router.get("/userData", adminAuth, async (req, res) => {
  let userData = await User.aggregate([
    { $group: { _id: "$status", value: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);
  return res.send({ statusCode: 200, message: "Success", data: { userData: userData } });
});

router.get("/products", adminAuth, async (req, res) => {
  let criteria = {};

  criteria.insertDate = {
    $gte: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
  };
  let productMonthlyData = await Product.aggregate([
    {
      $match: criteria,
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: "$creationDate" },
          month: { $month: "$creationDate" },
          year: { $year: "$creationDate" },
        },
        value: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
    {
      $project: {
        _id: 0,
        date: {
          $concat: [{ $toString: "$_id.month" }, "-", { $toString: "$_id.day" }, "-", { $toString: "$_id.year" }],
        },
        value: 1,
      },
    },
  ]);

  return res.status(200).send({ statusCode: 200, name: "Total Users", series: productMonthlyData });
});

/*  for order stats 
     => top 5 products according to the total sold count
     => total number of sold products according to category
    Used for: Admin Panel
    APP screen:Order Screen
*/
router.get("/orders", adminAuth, async (req, res) => {
  let top5Orders = await Product.aggregate([
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    { $project: { _id: 0, productName: "$title", value: "$totalSold" } },
  ]);

  let recent5Orders = await OrderHistory.aggregate([
    { $sort: { insertDate: -1 } },
    { $limit: 5 },
    { $project: { _id: 0, productName: "$product.title", value: "$creationDate" } },
  ]);

  let totalOrdersCategoryData = await Product.aggregate([
    { $unwind: "$category" },
    { $group: { _id: "$category", value: { $sum: "$totalSold" } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);

  return res.send({
    statusCode: 200,
    message: "Success",
    data: {
      top5Orders: top5Orders,
      totalOrdersCategoryData: totalOrdersCategoryData,
      recent5Orders: recent5Orders,
    },
  });
});

module.exports = router;
