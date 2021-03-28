const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const {
  Product,
  productProjection,
  validateProductV1Get,
  validateProductV1Post,
  validateProductV1Delete,
  validateProductV1Put,
} = require("../models/product");
const { User } = require("../models/user");
const { PRODUCT_CONSTANTS } = require("../config/constants");
const { adminAuth, userAdminAuth } = require("../middleware/auth");

const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
/*  
    create a product 
    Used for: Admin Panel
    APP screen:Add product screen
*/
router.post("/", urlencodedParser, async (req, res) => {
  const { error } = validateProductV1Post(req.body);
  if (error)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: error.details[0].message },
    });
  let subimg = req.body.subImages.split(/\n/);

  let product = new Product({
    title: req.body.title,
    brand: req.body.brand,
    category: req.body.category,
    discountPercentage: req.body.discountPercentage,
    actualPrice: req.body.actualPrice,
    subImages: subimg,
    image: req.body.image,
    description: req.body.description,
    averageRating: req.body.averageRating,
    totalRating: req.body.totalRating,
  });

  if (req.body.discountPercentage) {
    product.sellingPrice =
      product.actualPrice -
      product.actualPrice * (product.discountPercentage / 100);
  } else {
    product.sellingPrice = req.body.actualPrice;
  }
  await product.save();
  let response = {
    productId: product._id,
    title: product.title,
    brand: product.brand,
    discountPercentage: product.discountPercentage,
    actualPrice: product.actualPrice,
    sellingPrice: product.sellingPrice,
    subImages: product.subImages,
    description: product.description,
    image: product.image,
    description: product.description,
    averageRating: product.averageRating,
    totalRating: product.totalRating,
  };

  return res.send({ statusCode: 200, message: "Success", data: response });
});

/*  
    fetch all the  posts of a particular restaurant
    QueryParams Supported: category, minPrice, maxPrice, brand 
    Used for: App
    APP screen: view product list / category screen
*/
router.get("/v1", async (req, res) => {
  const { error } = validateProductV1Get(req.query);
  if (error)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: error.details[0].message },
    });

  var skipVal, limitVal;
  if (isNaN(parseInt(req.query.offset))) skipVal = 0;
  else skipVal = parseInt(req.query.offset);

  if (isNaN(parseInt(req.query.limit))) limitVal = 20;
  else limitVal = parseInt(req.query.limit);

  let criteria = {};
  let { category, minPrice, maxPrice, brand, productId } = req.query;
  if (category && category.length >= 3) {
    let regexName = new RegExp("^" + category + ".*", "i");
    criteria.category = regexName;
  } else if (minPrice && maxPrice) {
    criteria.sellingPrice = {
      $gte: parseInt(minPrice),
      $lte: parseInt(maxPrice),
    };
  } else if (brand && brand >= 3) {
    let regexName = new RegExp("^" + brand + ".*", "i");
    criteria.brand = regexName;
  } else if (req.query.productId) {
    criteria._id = mongoose.Types.ObjectId(req.query.productId);
  }
  criteria.status = "active";
  let productList = await Product.aggregate([
    { $match: criteria },
    { $skip: skipVal },
    { $limit: limitVal },
    {
      $project: productProjection(),
    },
  ]);

  return res.send({
    statusCode: 200,
    message: "Success",
    data: { productList: productList },
  });
});

/*  
    delete a product 
    Used for: Admin Panel
    APP screen: In view product screen
*/
router.delete("/:productId", async (req, res) => {
  const { error } = validateProductV1Delete(req.params);
  if (error)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: error.details[0].message },
    });

  let product = await Product.findOne({
    _id: req.params.productId,
    status: "active",
  });
  if (!product)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: PRODUCT_CONSTANTS.PRODUCT_NOT_FOUND },
    });

  if (req.query.isProductInCart == true) {
    let productInCart = await User.find({
      cart: { $elemMatch: { productId: req.params.productId } },
    });
    // console.log(productInCart);
    if (productInCart.length > 0) {
      return res.send({
        statusCode: 400,
        message: "Failure",
        data: { data: PRODUCT_CONSTANTS.PRODUCT_IN_CART },
      });
    } else {
      return res.send({
        statusCode: 400,
        message: "Failure",
        data: { data: PRODUCT_CONSTANTS.NO_PRODUCT_IN_CART },
      });
    }
  }

  await Product.updateOne(
    { _id: req.params.productId },
    { $set: { status: "inactive" } }
  );
  return res.send({
    statusCode: 200,
    message: "Success",
    data: { data: PRODUCT_CONSTANTS.PRODUCT_DELETED },
  });
});

/*  Edit Product
    used: Admin Panel
    App Screen: View Product
 */
router.put("/", adminAuth, async (req, res) => {
  const { error } = validateProductV1Put(req.body);
  if (error)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: error.details[0].message },
    });
  let product = await Product.findOne({
    _id: req.body.productId,
    status: "active",
  });

  if (!product)
    return res.status(400).send({
      statusCode: 400,
      message: "Failure",
      data: { data: PRODUCT_CONSTANTS.PRODUCT_NOT_FOUND },
    });

  product.title = req.body.title || product.title;
  product.brand = req.body.brand || product.brand;
  product.discountPercentage =
    req.body.discountPercentage || product.discountPercentage;
  product.actualPrice = req.body.actualPrice || product.actualPrice;
  product.subImages = req.body.subImages || product.subImages;
  product.description = req.body.description || product.description;

  await product.save();
  return res.send({
    statusCode: 200,
    message: "Success",
    data: { data: "updated" },
  });
});
module.exports = router;
