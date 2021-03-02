const express = require("express");
const config = require("config");
const products = require("../routes/products");
const reqLogger = require("../startup/logger");

module.exports = function (app) {
  app.use(express.json());
  app.use(reqLogger);
  app.use("/api/product", products);
};
