const { CATEGORY_CONSTANTS } = require("../config/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Category, validateCategoryPost, validateCategoryPut } = require("../models/category");
const { adminAuth } = require("../middleware/auth");
const { Product } = require("../models/product");

/*  
    get list of categories   
    Used for: Admin Panel
    APP screen:Category screen
*/
router.get("/", adminAuth, async (req, res) => {
  let categoriesList = await Category.aggregate([
    {
      $project: {
        _id: 0,
        category: "$_id",
      },
    },
  ]);

  return res.send({ statusCode: 200, message: "Success", data: { categoriesList } });
});

/*  
    create a category which will be used in product  
    Used for: Admin Panel
    APP screen:create Category screen
*/
router.post("/", adminAuth, async (req, res) => {
  const { error } = validateCategoryPost(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: error.details[0].message });

  let category = await Category.findOne({ _id: req.body.category });
  if (category)
    return res
      .status(400)
      .send({ statusCode: 400, message: "Failure", data: CATEGORY_CONSTANTS.CATEGORY_ALREADY_EXISTS });

  category = new Category({ _id: req.body.category });
  try {
    category = await category.save();
    const response = _.pick(category, ["_id"]);
    return res.send({ statusCode: 200, message: "Success", data: response });
  } catch (Ex) {
    if (Ex.code === 11000)
      return res
        .status(400)
        .send({ statusCode: 400, status: "Failure", data: CATEGORY_CONSTANTS.CATEGORY_ALREADY_EXISTS });
    else {
      return res.status(400).send({ statusCode: 400, status: "Failure", data: CATEGORY_CONSTANTS.SERVER_FAILURE });
    }
  }
});

/*    
    Used for: Admin Panel
    APP screen:Category screen
*/
router.put("/", adminAuth, async (req, res) => {
  const { error } = validateCategoryPut(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: error.details[0].message });

  let category = await Category.findOne({ _id: req.body.category });
  if (!category)
    return res.status(400).send({ statusCode: 400, message: "Failure", data: CATEGORY_CONSTANTS.CATEGORY_NOT_FOUND });

  //if new category is same as old caegory then,here we need to handle duplicacy
  if (req.body.newCategory) {
    category = new Category({
      _id: req.body.newCategory,
    });
    try {
      await category.save();
      await Product.updateMany({ category: req.body.category }, { $set: { "category.$": req.body.newCategory } });
      await Category.deleteOne({ _id: req.body.category });
    } catch (Ex) {
      if (Ex.code === 11000)
        return res
          .status(400)
          .send({ statusCode: 400, status: "Failure", data: CATEGORY_CONSTANTS.CATEGORY_ALREADY_EXISTS });
      else {
        return res.status(400).send({ statusCode: 400, status: "Failure", data: CATEGORY_CONSTANTS.SERVER_FAILURE });
      }
    }
  }

  res.send({ statusCode: 200, message: "Success", data: CATEGORY_CONSTANTS.CATEGORY_UPDATED });
});

/*  to delete any category of needed
    Used for: Admin Panel
    APP screen:Category screen
*/
router.delete("/:category", adminAuth, async (req, res) => {
  let category = await Category.findOne({ _id: req.params.category });
  if (!category) {
    res.status(400).send({ statusCode: 400, message: "Failure", data: CATEGORY_CONSTANTS.CATEGORY_NOT_FOUND });
  } else {
    await Category.deleteOne({ _id: req.params.category });
    res.send({ statusCode: 200, message: "success", data: CATEGORY_CONSTANTS.CATEGORY_DELETED });
  }
});

module.exports = router;
