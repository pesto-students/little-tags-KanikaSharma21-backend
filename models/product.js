const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const productSchema = new mongoose.Schema({
  title: { type: String, maxLength: 50, default: "" },
  brand: { type: String, default: "" },
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  discountPercentage: { type: Number },
  actualPrice: { type: Number },
  sellingPrice: { type: Number },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  subImages: { type: Array },
  image: { type: String },
  description: { type: String, default: "" },
  totalSold: { type: Number, default: 0 },
  totalInWishlist: { type: Number, default: 0 },
  category: { type: Array },
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

const Product = mongoose.model("Product", productSchema);

function validateProductV1Get(product) {
  const schema = Joi.object({
    maxPrice: Joi.string(),
    minPrice: Joi.string(),
    limit: Joi.number(),
    offset: Joi.number(),
    brand: Joi.string(),
    category: Joi.string(),
    productId: Joi.objectId(),
  });
  return schema.validate(product);
}

function validateProductV1Post(product) {
  const schema = Joi.object({
    title: Joi.string().required(),
    brand: Joi.string().required(),
    discountPercentage: Joi.number().strict(),
    actualPrice: Joi.number().strict().required(),
    subImages: Joi.array(),
    description: Joi.string(),
    image: Joi.string(),
    category: Joi.array(),
  });
  return schema.validate(product);
}

function validateProductV1Delete(product) {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    isProductInCart: Joi.boolean(),
  });
  return schema.validate(product);
}
function validateProductV1Put(product) {
  const schema = Joi.object({
    productId: Joi.objectId().required(),
    title: Joi.string(),
    brand: Joi.string(),
    discountPercentage: Joi.number().strict(),
    actualPrice: Joi.number().strict(),
    subImages: Joi.array(),
    description: Joi.string(),
    image: Joi.string(),
    category: Joi.array(),
  });
  return schema.validate(product);
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
module.exports.validateProductV1Post = validateProductV1Post;
module.exports.validateProductV1Delete = validateProductV1Delete;
module.exports.validateProductV1Put = validateProductV1Put;
