const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
  size: { type: String },
  quantity: { type: Number, default: 0 },
  deliveryType: { type: String, enum: ["paid", "free"] },
  totalDiscount: { type: Number, default: 0 },
  convenienceFee: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  deliveredOn: { type: Date },
  estimatedDelivery: { type: Date },
  paymentType: { type: String, enum: ["COD", "Card"] },
  invoiceDetails: { type: Object },
  creationDate: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  insertDate: {
    type: Number,
    default: () => {
      return +new Date();
    },
  },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

function validateOrderHistoryV1Post(orderHistory) {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    address: Joi.object(),
    size: Joi.string().required(),
    quantity: Joi.number().strict().required(),
    deliveryType: Joi.string(),
    totalDiscount: Joi.number().strict(),
    convenienceFee: Joi.number().strict(),
    checkSum: Joi.string(),
    estimatedDelivery: Joi.string().required(),
    totalAmount: Joi.number().strict(),
    paymentType: Joi.string().required(),
    transactionTime: Joi.string(),
  });
  return schema.validate(orderHistory);
}

module.exports.OrderHistory = OrderHistory;
module.exports.validateOrderHistoryV1Post = validateOrderHistoryV1Post;
