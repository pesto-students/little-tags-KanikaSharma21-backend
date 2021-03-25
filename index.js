const winston = require("winston");
const express = require("express");
const config = require("config");
const { render } = require("ejs");
const { Product } = require("./models/product");
const app = express();

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
  let productList = await Product.find({}).limit(20);

  res.render("viewproducts", { productList: productList });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
