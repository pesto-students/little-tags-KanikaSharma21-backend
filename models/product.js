const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");

const ProductSchema = new mongoose.Schema({
  title: { type: String, maxLength: 50, default: "" },
  brand: { type: String, default: "" },
  averageRating: { type: String, default: "" },
  totalRating: { type: String, default: "" },
  discountPercentage: { type: String, default: "" },
  actualPrice: { type: String, default: "" },
  sellingPrice: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  subImages: { type: String, default: "" },
  description: { type: String, default: "" },
  totalSold: { type: Number, default: 0 },
  totalInWishlist: { type: Number, default: 0 },
  category: { type: String, default: "" },
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

const Product = mongoose.model("Product", ProductSchema);

function validateProductV1Get(sponsor) {
  const schema = Joi.object({
    maxPrice: Joi.string(),
    minPrice: Joi.string(),
    limit: Joi.number(),
    offset: Joi.number(),
    brand: Joi.string(),
    category: Joi.string(),
  });
  return schema.validate(sponsor);
}

function productProjection() {
  return {
    _id: 0,
    productId: "$_id",
    title: 1,
    brand: 1,
    image: 1,
    averageRating: 1,
    totalRating: 1,
    discountPercentage: 1,
    actualPrice: 1,
    sellingPrice: 1,
    subImages: 1,
    description: 1,
    category: 1,
  };
}

module.exports.Product = Product;
module.exports.validateProductV1Get = validateProductV1Get;
module.exports.productProjection = productProjection;
