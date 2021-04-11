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
const baseUrl = `http://localhost:7000/api/`;
// const baseUrl = `https://fullcart-admin.herokuapp.com/api/`;
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

app.get("/viewproducts", async (req, res) => {
  try {
    const productList = await axios.get(baseUrl + "product/v1");

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

app.get("/dashboard", async (req, res) => {
  const { jwt } = req.cookies;
  try {
    const stats = await axios.get(baseUrl + "dashboard", { headers: { Authorization: jwt } });
    const productsData = await axios.get(baseUrl + "dashboard/products", {
      headers: { Authorization: jwt },
    });

    res.render("dashboard", {
      stats: stats.data.data,
      productsData: productsData.data.series,
    });
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
});

app.get("/order", async (req, res) => {
  const { jwt } = req.cookies;
  try {
    const orderList = await axios.get(baseUrl + "dashboard/orders", {
      headers: { Authorization: jwt },
    });

    res.render("order", {
      top5Orders: orderList.data.data.top5Orders,
      totalOrdersCategoryData: orderList.data.data.totalOrdersCategoryData,
    });
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
});

app.post("/api/product/add", urlencodedParser, product.addProduct);

app.put("/api/product/:productId", urlencodedParser, product.editProduct);

app.get("/addproduct", async (req, res) => {
  try {
    const categoryList = await axios.get(baseUrl + "category");

    res.render("addproduct", {
      show_modal: false,
      categoryList: categoryList.data.data.categoriesList,
    });
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
});

app.get("/add-category", (req, res) => {
  res.render("addCategory");
});

app.post("/api/category/add", urlencodedParser, product.addCategory);

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
