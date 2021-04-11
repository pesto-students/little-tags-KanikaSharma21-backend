const { PRODUCT_CONSTANTS, ORDER_CONSTANTS } = require("../config/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");
const { OrderHistory, validateOrderHistoryV1Post } = require("../models/orderHistory");
const { Product, productProjection } = require("../models/product");

/*  
    place the order
    Used for: Web app
    APP screen:Checkout screen
*/
router.post("/", async (req, res) => {
  const { error } = validateOrderHistoryV1Post(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: error.details[0].message });

  let order = new OrderHistory(
    _.pick(req.body, [
      "products",
      "address",
      "deliveryType",
      "convenienceFee",
      "estimatedDelivery",
      "paymentType",
      "invoiceDetails",
    ])
  );
  order.userId = "5e258331a2a53400175082c2";
  let products = order.products;
  for (let index = 0; index < products.length; ++index) {
    let product = await Product.findOne({ _id: products[index].productId });
    if (!product)
      return res
        .status(400)
        .send({ statusCode: 400, message: "Failure", data: PRODUCT_CONSTANTS.NO_PRODUCT_NOT_FOUND });

    order.totalAmount += product.sellingPrice;
    order.totalDiscount += product.actualPrice * (product.discountPercentage / 100);
    products[index].totalAmount = product.sellingPrice;
    products[index].discount = product.actualPrice * (product.discountPercentage / 100);
    products[index].actualAmount = product.actualPrice;
    products[index].title = product.title;
  }
  try {
    await order.save();
    return res.send({ statusCode: 200, message: "Success", data: ORDER_CONSTANTS.ORDER_PLACED });
  } catch (Ex) {
    return res.status(400).send({ statusCode: 400, status: "Failure", data: ORDER_CONSTANTS.SERVER_FAILURE });
  }
});

router.get("/", async (req, res) => {
  var skipVal, limitVal;
  if (isNaN(parseInt(req.query.offset))) skipVal = 0;
  else skipVal = parseInt(req.query.offset);

  if (isNaN(parseInt(req.query.limit))) limitVal = 20;
  else limitVal = parseInt(req.query.limit);

  let orderHistory = await OrderHistory.aggregate([
    {
      $match: { userId: "5e258331a2a53400175082c2" },
    },
    { $skip: skipVal },
    { $limit: limitVal },
    { $unwind: "$products" },
    { $addFields: { productId: { $toObjectId: "$products.productId" } } },
    {
      $lookup: {
        from: "products",
        let: { productId: "$productId" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$_id", "$$productId"] }] } } },
          {
            $project: productProjection(),
          },
        ],
        as: "productData",
      },
    },
    { $unwind: "$productData" },
    {
      $group: {
        _id: "$_id",
        productList: { $push: "$productData" },
        orderHistoryId: { $last: "$_id" },
        products: { $last: "$products" },
        address: { $last: "$address" },
        deliveryType: { $last: "$deliveryType" },
        convenienceFee: { $last: "$convenienceFee" },
        estimatedDelivery: { $last: "$estimatedDelivery" },
        paymentType: { $last: "$paymentType" },
        invoiceDetails: { $last: "$invoiceDetails" },
        deliveredOn: { $last: "$deliveredOn" },
        insertDate: { $last: "$insertDate" },
        creationDate: { $last: "$creationDate" },
        totalAmount: { $last: "$totalAmount" },
        totalDiscount: { $last: "$totalDiscount" },
      },
    },
    {
      $project: {
        _id: 0,
        orderHistoryId: "$_id",
        products: 1,
        address: 1,
        deliveryType: 1,
        convenienceFee: 1,
        estimatedDelivery: 1,
        paymentType: 1,
        invoiceDetails: 1,
        deliveredOn: 1,
        productList: 1,
        insertDate: 1,
        creationDate: 1,
        totalAmount: 1,
        totalDiscount: 1,
      },
    },
  ]);
  return res.send({ statusCode: 200, status: "Success", data: { orderHistory: orderHistory } });
});

module.exports = router;
