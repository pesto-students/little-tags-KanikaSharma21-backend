const winston = require("winston");
const express = require("express");
const config = require("config");
const { render } = require("ejs");
const { Product } = require("./models/product");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const axios = require("axios");
const product = require("./views/product/product");
const app = express();

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
app.use(cookieParser());

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

app.use(methodOverride("_method"));

app.get("/product/delete/:productId", product.deleteProduct);

app.get("/product/edit/:productId", async (req, res) => {
  const product = await Product.findById(req.params.productId);
  res.render("editProduct", { product: product });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.post("/api/product/add", urlencodedParser, product.addProduct);

app.put("/api/product/:productId", urlencodedParser, product.editProduct);

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
