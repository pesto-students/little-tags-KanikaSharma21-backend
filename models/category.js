const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: String,
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

const Category = mongoose.model("Category", categorySchema);

function validateCategoryPost(category) {
  const schema = Joi.object({
    category: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(category);
}

function validateCategoryPut(category) {
  const schema = Joi.object({
    category: Joi.string().min(1).max(50).required(),
    newCategory: Joi.string().min(1).max(50),
  });
  return schema.validate(category);
}
exports.Category = Category;
exports.validateCategoryPost = validateCategoryPost;
exports.validateCategoryPut = validateCategoryPut;
