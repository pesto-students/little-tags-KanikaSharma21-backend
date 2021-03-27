const mongoose = require("mongoose");
const Joi = require("joi");

const orderHistorySchema = new mongoose.Schema({
  userId: { type: String },
  productId: { type: String },
  address: {
    name: { type: String },
    mobile: { type: Number },
    address1: { type: String },
    town: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  deliveredOn: { type: Number },
  creationDate: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  insertDate: {
    type: Number,
    default: () => {
      return Math.round(new Date() / 1000);
    },
  },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

function validateOrderHistoryV1Get(orderHistory) {
  const schema = Joi.object({
    limit: Joi.number(),
    offset: Joi.number(),
  });
  return schema.validate(orderHistory);
}

module.exports.OrderHistory = OrderHistory;
module.exports.validateOrderHistoryV1Get = validateOrderHistoryV1Get;
