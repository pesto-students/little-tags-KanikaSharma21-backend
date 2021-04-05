const axios = require("axios");
const express = require("express");
const app = express();

exports.deleteProduct = async function (req, res) {
  const { jwt } = req.cookies;
  console.log(jwt);
  try {
    const productList = await axios
      .delete(
        `http://localhost:7000/api/product/${req.params.productId}`,
        { headers: { Authorization: jwt } },
        {
          params: { isProductInCart: false },
        }
      )
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
  const { jwt } = req.cookies;
  try {
    await axios.put(`http://localhost:7000/api/product`, req.body, { headers: { Authorization: jwt } });
    res.redirect("/viewproducts");
  } catch (error) {
    console.log("error>>>>>>>>>>>>>>", error);
  }
};

exports.addProduct = async function (req, res) {
  const { jwt } = req.cookies;
  try {
    let results = await axios.post("http://localhost:7000/api/product", req.body, { headers: { Authorization: jwt } });
    res.redirect("/viewproducts");
  } catch (error) {}
};
