const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { adminAuth } = require("../middleware/auth");
const { OrderHistory } = require("../models/orderHistory");

mongoose.set("debug", true);

router.get("/userData", adminAuth, async (req, res) => {
  let userData = await User.aggregate([
    { $group: { _id: "$status", value: { $sum: 1 } } },
    { $project: { _id: 0, name: "$_id", value: 1 } },
  ]);
  return res.send({ statusCode: 200, message: "Success", data: { userData: userData } });
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
    },
  });
});

module.exports = router;
