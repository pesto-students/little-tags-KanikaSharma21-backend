const winston = require("winston");
const express = require("express");
const config = require("config");
const { render } = require("ejs");
const { Product } = require("./models/product");
const app = express();

const axios = require("axios");
const product = require("./views/product/product");

require("./startup/logging")();
require("./startup/logger");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");

// template engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/addproduct", (req, res) => {
  res.render("addproduct");
});

app.get("/viewproducts", async (req, res) => {
  try {
    const productList = await axios.get("http://localhost:7000/api/product/v1");

    res.render("viewproducts", {
      productList: productList.data.data.productList,
    });
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
});

app.get("/product/delete/:productId", product.deleteProduct);

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
