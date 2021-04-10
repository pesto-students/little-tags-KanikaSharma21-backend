const express = require("express");
const config = require("config");
const products = require("../routes/products");
const users = require("../routes/users");
const admins = require("../routes/admins");
const dashboard = require("../routes/dashboard");
const categories = require("../routes/categories");
const OrderHistories = require("../routes/orderHistories");
const reqLogger = require("../startup/logger");

module.exports = function (app) {
  app.use(express.json());
  app.use(reqLogger);
  app.use("/api/product", products);
  app.use("/api/user", users);
  app.use("/api/admin", admins);
  app.use("/api/dashboard", dashboard);
  app.use("/api/category", categories);
  app.use("/api/order/history", OrderHistories);
};
