const { PRODUCT_CONSTANTS, ORDER_CONSTANTS } = require("../config/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");
const { OrderHistory, validateOrderHistoryV1Post } = require("../models/orderHistory");
const { generateCheckSum } = require("../services/commonFunctions");
const { Product } = require("../models/product");

/*  
    place the order
    Used for: Web app
    APP screen:Checkout screen
*/
router.post("/", async (req, res) => {
  const { error } = validateOrderHistoryV1Post(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: error.details[0].message });

  let product = await Product.findOne({ _id: req.body.productId });
  if (!product)
    return res.status(400).send({ statusCode: 400, message: "Failure", data: PRODUCT_CONSTANTS.NO_PRODUCT_NOT_FOUND });

  let order = new OrderHistory(
    _.pick(req.body, [
      "productId",
      "address",
      "size",
      "quantity",
      "deliveryType",
      "totalDiscount",
      "convenienceFee",
      "totalAmount",
      "estimatedDelivery",
      "paymentType",
      "invoiceDetails",
    ])
  );
  order.userId = req.jwtData.userId;
  //calling check sum function
  let checkSumValue = await generateCheckSum(req.body.checkSum, req.body.totalAmount, req.body.transactionTime);

  if (!checkSumValue) {
    return res.status(400).send({ statusCode: 400, message: "Failure", data: ORDER_CONSTANTS.ORDER_NOT_PLACED });
  }

  try {
    await order.save();
    return res.send({ statusCode: 200, message: "Success", data: ORDER_CONSTANTS.ORDER_PLACED });
  } catch (Ex) {
    return res.status(400).send({ statusCode: 400, status: "Failure", data: ORDER_CONSTANTS.SERVER_FAILURE });
  }
});

module.exports = router;
