const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

mongoose.set("debug", true);

// get list pf products
router.get("/", async (req, res) => {
  const productList = [
    {
      productId: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men clothing",
      image:
        "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      productId: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men clothing",
      image:
        "https://images.unsplash.com/photo-1552252059-9d77e4059ad1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fG1lbnMlMjAlMjBzbGltJTIwZml0JTIwc2hpcnRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men clothing",
      image:
        "https://images.unsplash.com/photo-1581381685617-4dc270458aa6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      productId: 4,
      title: "Jump Suits",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image:
        "https://images.unsplash.com/photo-1515951912835-71c13b2f08ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=700&q=80",
    },
    {
      productId: 5,
      title: "Sony's Head phone",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1548378329-437e1ef34263?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 6,
      title: "Sony digital Camera",
      price: 90000,
      description: "Sony HDRCX405 9.2MP HD Handycam Camcorder with Free Carrying Case (Black)",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbWVyYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 7,
      title: "Dress",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },

    {
      productId: 8,
      title: "PR Fashion Lycra Embroidery Designer Saree",
      price: 20000,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image: "https://5.imimg.com/data5/VK/TE/MY-8330475/prn8662-500x500.jpg",
    },

    {
      productId: 9,
      title: "Dress",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ];
  return res.send({ statusCode: 200, message: "Success", data: { productList: productList } });
});

module.exports = router;
