const axios = require("axios");
const express = require("express");
const app = express();
exports.deleteProduct = async function (req, res) {
  try {
    const productList = await axios
      .delete(`http://localhost:7000/api/product/${req.params.productId}`, {
        params: { isProductInCart: false },
      })
      .then((res) => {
        console.log("res>>>>", res);
      });
    res.redirect("/viewproducts");
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
};

exports.editProduct = async function (req, res) {
  try {
    await axios.put(
      `http://localhost:7000/api/product/${req.params.productId}`,
      req.body
    );

    res.redirect("/viewproducts");
  } catch (error) {
    console.log("error>>>>>>>>>>>>>>", error);
  }
};

exports.addProduct = async function (req, res) {
  try {
    await axios.post("http://localhost:7000/api/product", req.body);

    res.redirect("/viewproducts");
  } catch (error) {}
};

exports.order = async function (req, res) {
  try {
    console.log("order");
    const productList = await axios.get("http://localhost:7000/api/product/v1");
    red.redirect("/order", { product: productList });
  } catch (error) {}
};
