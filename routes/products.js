const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const {
  Product,
  productProjection,
  validateProductV1Get,
} = require("../models/product");

mongoose.set("debug", true);

// get list pf products
router.get("/v1", async (req, res) => {
  const { error } = validateProductV1Get(req.query);
  if (error)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: error.details[0].message },
    });

  var skipVal, limitVal;
  if (isNaN(parseInt(req.query.offset))) skipVal = 0;
  else skipVal = parseInt(req.query.offset);

  if (isNaN(parseInt(req.query.limit))) limitVal = 20;
  else limitVal = parseInt(req.query.limit);

  let criteria = {};
  let { category, minPrice, maxPrice, brand } = req.query;
  if (category && category.length >= 3) {
    let regexName = new RegExp("^" + category + ".*", "i");
    criteria.category = regexName;
  } else if (minPrice && maxPrice) {
    criteria.sellingPrice = {
      $gte: parseInt(minPrice),
      $lte: parseInt(maxPrice),
    };
  } else if (brand && brand >= 3) {
    let regexName = new RegExp("^" + brand + ".*", "i");
    criteria.brand = regexName;
  }

  let productList = await Product.aggregate([
    { $match: criteria },
    {
      $project: productProjection(),
    },
  ]);

  return res.send({
    statusCode: 200,
    message: "Success",
    data: { productList: productList },
  });
});

module.exports = router;
