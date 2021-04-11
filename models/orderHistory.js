const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const orderHistorySchema = new mongoose.Schema({
  userId: { type: String },
  products: [
    {
      productId: { type: String },
      title: { type: String },
      size: { type: String },
      quantity: { type: Number, default: 0 },
      actualAmount: { type: Number, default: 0 },
      totalAmount: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
    },
  ],

  address: {
    name: { type: String },
    mobile: { type: String },
    location: { type: String },
    town: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
  },

  deliveryType: { type: String, enum: ["paid", "free"], default: "free" },
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
  // var address = Joi.object({
  //   name: Joi.string(),
  //   mobile: Joi.number().strict(),
  //   pinCode: Joi.number().strict(),
  //   location: Joi.string(),
  //   town: Joi.string(),
  //   city: Joi.string(),
  //   state: Joi.string(),
  // });
  const schema = Joi.object({
    products: Joi.array().required(),
    address: {
      name: Joi.string(),
      mobile: Joi.string(),
      pinCode: Joi.number(),
      location: Joi.string(),
      town: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
    },
    deliveryType: Joi.string(),
    totalDiscount: Joi.number().strict(),
    convenienceFee: Joi.number().strict(),
    estimatedDelivery: Joi.string().required(),
    paymentType: Joi.string().required(),
  });
  return schema.validate(orderHistory);
}

module.exports.OrderHistory = OrderHistory;
module.exports.validateOrderHistoryV1Post = validateOrderHistoryV1Post;
