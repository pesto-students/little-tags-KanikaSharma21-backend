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
    res.redirect("/viewproducts");
  } catch (error) {
    const errorMessage = error.response.data.data.data.replace(/['"]+/g, "");
    res.render("addproduct", { show_modal: true, error: errorMessage });
  }
};

exports.addCategory = async function (req, res) {
  const { jwt } = req.cookies;
  try {
    let results = await axios.post(baseUrl + `api/category`, req.body, {
      headers: { Authorization: jwt },
    });
    res.redirect("/viewproducts");
  } catch (error) {
    const errorMessage = error.response.data.data.data.replace(/['"]+/g, "");
    res.render("addproduct", { show_modal: true, error: errorMessage });
  }
};
