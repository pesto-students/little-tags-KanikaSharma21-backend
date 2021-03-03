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
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men",
      image:
        "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      productId: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/c0b715eb-dfcb-4897-83e0-1827bb690f4f1566454100639-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/acfba45f-8f9c-4b97-b5bc-a909418bdf4c1566454100620-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/a158d792-8e7d-44ed-a5bf-5b229dc5c98c1566454100598-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-4.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/b7868593-94f4-4b6e-97de-931733a74a0f1566454100581-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-5.jpg",
      ],
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men clothing",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/7142624c-9184-47db-bf67-5610bd756c761566454100661-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-1.jpg",
    },
    {
      productId: 3,
      title: "Mens Cotton Jacket",
      averageRating: 4.7,
      totalRating: 50,
      discountPercentage: 72,
      actualPrice: 2999,
      sellingPrice: 839,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10986124/2019/11/27/8323a4f1-568d-4c20-b08f-52004bb9e6e41574857500077-DILLINGER-Men-Sweatshirts-4431574857498487-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10986124/2019/11/27/d377a9b9-fad8-4fe1-ae80-3a648d162bf91574857500041-DILLINGER-Men-Sweatshirts-4431574857498487-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10986124/2019/11/27/862d4085-ae7a-4019-b818-b4f17dffcbcc1574857499964-DILLINGER-Men-Sweatshirts-4431574857498487-5.jpg",
      ],
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men clothing",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10986124/2019/11/27/6250b59b-fbf4-421e-9b36-e0200e3c3a4b1574857500113-DILLINGER-Men-Sweatshirts-4431574857498487-1.jpg",
    },
    {
      productId: 4,
      title: "Jump Suits",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 52,
      actualPrice: 2199,
      sellingPrice: 1055,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/594ea3f6-8dcf-41d1-b702-ee44e6047e571602716020843-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/89cd9643-e416-4d37-9f69-17186d1045241602716020893-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/7701b411-55f5-4aab-879a-4d6744faed941602716020959-4.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/351c026c-f44d-4fe5-ba97-c538930cf47f1602716021022-5.jpg",
      ],
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/8945f359-034d-4aa6-a6bd-0aa13f9a9fbd1602716020778-1.jpg",
    },
    {
      productId: 5,
      title: "Sony's Head phone",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1548378329-437e1ef34263?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 6,
      title: "Sony digital Camera",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
      description: "Sony HDRCX405 9.2MP HD Handycam Camcorder with Free Carrying Case (Black)",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbWVyYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 7,
      title: "Dress",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f9f13ec3-c11a-460a-b35a-9f6ec31590871556781497682-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-1.jpg",
    },

    {
      productId: 8,
      title: "PR Fashion Lycra Embroidery Designer Saree",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women clothing",
      image: "https://5.imimg.com/data5/VK/TE/MY-8330475/prn8662-500x500.jpg",
    },

    {
      productId: 9,
      title: "Dress",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/209bbba3-3c6c-4c5d-b977-5dcd8a18ed541556781497654-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f55abcf6-88b0-4fc1-87ac-c79a532ae3f11556781497623-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/352a3b51-7fd6-4711-92c8-bec39c01b3031556781497566-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/b0c93e08-b15a-47d7-93eb-86fca976665b1556781497545-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-6.jpg",
      ],
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
