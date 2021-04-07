const axios = require("axios");
const express = require("express");
const app = express();
const baseUrl = ` https://fullcart-admin.herokuapp.com/`;

exports.deleteProduct = async function (req, res) {
  const { jwt } = req.cookies;
  console.log(jwt);
  try {
    const productList = await axios.delete(
      baseUrl + `api/product/${req.params.productId}`,
      { headers: { Authorization: jwt } },
      {
        params: { isProductInCart: false },
      }
    );

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
  const { jwt } = req.cookies;
  try {
    await axios.put(baseUrl + `api/product`, req.body, {
      headers: { Authorization: jwt },
    });
    res.redirect("/viewproducts");
  } catch (error) {
    console.log("error>>>>>>>>>>>>>>", error);
  }
};

exports.addProduct = async function (req, res) {
  const { jwt } = req.cookies;
  try {
    let results = await axios.post(baseUrl + `api/product`, req.body, {
      headers: { Authorization: jwt },
    });
    if (res.status == 400) {
      alert("wrong data has been given");
    }
    res.redirect("/viewproducts");
  } catch (error) {}
};

exports.order = async function (req, res) {
  try {
    const productList = await axios.get(baseUrl + `api/product/v1`);
    red.redirect("/order", { product: productList });
  } catch (error) {}
};
