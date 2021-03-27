const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: { type: String },
  fullName: { type: String, default: "" },
  type: { type: String, enum: ["facebook", "google", "normal"] },
  uId: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { uId: { $type: "string" } },
    },
  },
  address: [
    {
      name: { type: String },
      mobileNo: { type: Number },
      location: { type: String },
      locality: { type: String },
      city: { type: String },
      state: { type: String },
      pinCode: { type: Number },
    },
  ],
  cart: [
    {
      productId: { type: String },
      quantity: { type: Number },
      size: { type: String },
    },
  ],
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  password: { type: String },
  totalProductsBought: { type: Number, default: 0 },
  lastActivityAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      role: "user",
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "3h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUserPost(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid(["facebook", "google", "web"]).required(),
    uId: Joi.when("type", {
      is: "web",
      then: Joi.string(),
      otherwise: Joi.string().required(),
    }),
    password: Joi.when("type", {
      is: "web",
      then: Joi.string().min(5).max(20).required(),
    }),
  });
  return schema.validate(user);
}

function validateUserPut(user) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    fullName: Joi.string().min(1).max(50),
    email: Joi.string().email(),
  });
  return schema.validate(user);
}

function validateProductV1Get(user) {
  const schema = Joi.object({
    maxPrice: Joi.string(),
    minPrice: Joi.string(),
    limit: Joi.number(),
    offset: Joi.number(),
    brand: Joi.string(),
    category: Joi.string(),
  });
  return schema.validate(user);
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

module.exports.User = User;
module.exports.validateProductV1Get = validateProductV1Get;
module.exports.productProjection = productProjection;
module.exports.validateUserPost = validateUserPost;
module.exports.validateUserPut = validateUserPut;
