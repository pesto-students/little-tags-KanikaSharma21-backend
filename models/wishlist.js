const mongoose = require("mongoose");
const Joi = require("joi");

const wishListSchema = new mongoose.Schema({
  userId: { type: String },
  productId: { type: String },
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

const WishList = mongoose.model("WishList", wishListSchema);

function validateWishListV1Get(wishList) {
  const schema = Joi.object({
    limit: Joi.number(),
    offset: Joi.number(),
  });
  return schema.validate(wishList);
}

module.exports.WishList = WishList;
module.exports.validateWishListV1Get = validateWishListV1Get;
