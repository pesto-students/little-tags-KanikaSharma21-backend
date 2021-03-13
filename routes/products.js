const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

mongoose.set("debug", true);

// get list pf products
router.get("/", async (req, res) => {
  let productList = [
    {
      productId: 1,
      title: "mivi",
      brand: "lenovo",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/2/9/37b78c45-6a06-43fd-8dae-0dafd06b2e3e1612887864214-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/2/9/747ff7a8-dbb8-4bb5-9fe7-a7844b55f7d41612887864237-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/2/9/358ce63c-4fcc-470c-983c-ec6992fd024f1612887864276-5.jpg",
      ],
      description:
        "Lenovo IdeaPad Slim 3i Intel Celeron N4020 15.6-inch HD Thin and Light Laptop (4GB/256GB SSD/Windows 10/Platinum Grey/1.7Kg), 81WQ003LIN",
      category: "electronics",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/2/9/9f317a52-1858-4bef-926e-4fbdff52996b1612887864191-1.jpg",
    },
    {
      productId: 2,
      brand: "octave",
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
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/7142624c-9184-47db-bf67-5610bd756c761566454100661-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-1.jpg",
    },
    {
      productId: 3,
      brand: "nike",
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
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10986124/2019/11/27/6250b59b-fbf4-421e-9b36-e0200e3c3a4b1574857500113-DILLINGER-Men-Sweatshirts-4431574857498487-1.jpg",
    },

    {
      productId: 3,
      brand: "puma",
      title: "Men Maroon Virat Kohli Ms Jacquard Polo Collar Self Design T-shirt",
      averageRating: 4.7,
      totalRating: 50,
      discountPercentage: 72,
      actualPrice: 2999,
      sellingPrice: 839,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352484/2020/9/21/40ebf378-97d4-4ecf-a08a-a7513205c0701600664103673PumaMenOliveGreenSolidSlimFitEvostripeTrackPantsTrackPantsPu2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352484/2020/9/21/c0f8e824-014d-43dc-b410-4b8f097746f31600664103744PumaMenOliveGreenSolidSlimFitEvostripeTrackPantsTrackPantsPu3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352484/2020/9/21/8bae41d1-9b56-4c62-b2db-950f733adbfa1600664103809PumaMenOliveGreenSolidSlimFitEvostripeTrackPantsTrackPantsPu4.jpg",
      ],
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352452/2020/9/21/827adc14-c33c-45f1-8b1d-d5788ba6208f1600664071873PumaMenOliveGreenSolidSlimFitEvostripeTrackPantsTrackPantsPu1.jpg",
    },
    {
      productId: 3,
      brand: "puma",
      title: "Men Maroon Virat Kohli Ms Jacquard Polo Collar Self Design T-shirt",
      averageRating: 4.7,
      totalRating: 50,
      discountPercentage: 72,
      actualPrice: 2999,
      sellingPrice: 839,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352262/2020/9/24/c9357cf6-2c48-4585-8918-09239c5f618f1600948572165-Puma-Men-Olive-Green-Virat-Kohli-Ms-Jacquard-Polo-collar-Sel-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352262/2020/9/24/500d06ce-afac-43d8-84fe-32c964d629fb1600948572119-Puma-Men-Olive-Green-Virat-Kohli-Ms-Jacquard-Polo-collar-Sel-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352262/2020/9/24/b90c56f5-1692-4b79-9e35-254023e1a5851600948572067-Puma-Men-Olive-Green-Virat-Kohli-Ms-Jacquard-Polo-collar-Sel-4.jpg",
      ],
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352262/2020/9/24/b4af3603-2fbb-44d3-8432-102403fc1e201600948572233-Puma-Men-Olive-Green-Virat-Kohli-Ms-Jacquard-Polo-collar-Sel-1.jpg",
    },

    {
      productId: 3,
      brand: "puma",
      title: "Men Navy & White Slim Fits Dot Pattern Polo T-Shirt",
      averageRating: 4.7,
      totalRating: 50,
      discountPercentage: 72,
      actualPrice: 2999,
      sellingPrice: 839,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352602/2020/9/30/b2e0bc41-9bc6-4c29-8d8d-c2c6541a333c1601462690779-Puma-Men-Navy--White-Slim-Fits-Dot-Pattern-Polo-T-Shirt-4311-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352602/2020/9/30/6f1881d0-1f49-44b9-b3f0-79f75a681c0e1601462690665-Puma-Men-Navy--White-Slim-Fits-Dot-Pattern-Polo-T-Shirt-4311-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352602/2020/9/30/f97c1af2-4fd0-4a1a-a477-238083dcacb81601462690588-Puma-Men-Navy--White-Slim-Fits-Dot-Pattern-Polo-T-Shirt-4311-4.jpg",
      ],
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352602/2020/9/30/71032ad3-f3d8-469d-965b-78e9c487e8a61601462690878-Puma-Men-Navy--White-Slim-Fits-Dot-Pattern-Polo-T-Shirt-4311-1.jpg",
    },

    {
      productId: 3,
      brand: "puma",
      title: "Men White Solid Slim Fit ATHLETICS Polo Collar T-shirt With Printed Detail",
      averageRating: 4.7,
      totalRating: 50,
      discountPercentage: 72,
      actualPrice: 2999,
      sellingPrice: 839,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448804/2020/2/15/809de81c-7c8c-4db2-9fad-2a5372ad31d71581742440687-Puma-Men-Tshirts-2811581742439447-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448804/2020/2/15/f196ffc9-27e5-4bf7-9d5f-7f90c686faa21581742440653-Puma-Men-Tshirts-2811581742439447-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448804/2020/2/15/379e1976-a757-4a7c-a665-3ea6156715971581742440617-Puma-Men-Tshirts-2811581742439447-4.jpg",
      ],
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12352602/2020/9/30/71032ad3-f3d8-469d-965b-78e9c487e8a61601462690878-Puma-Men-Navy--White-Slim-Fits-Dot-Pattern-Polo-T-Shirt-4311-1.jpg",
    },

    {
      productId: 4,
      brand: "dressberry",
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
        " Black Mivi Roam 2 5 W Bluetooth Speaker     Small frame Big sound- Roam 2 wireless speaker is designed to deliver loud and clear music by pumping out sharp trebles, detailed mids and punchy bass. Heavy Bass - Small in size yet big on Bass Waterproof - IPX7 dust and waterproof Bluetooth speaker that can withstand all weathers and deliver unaltered performance each time 24 hours play time-The only portable 5W speaker which gives you not 4 or 5 but a whopping 24hrs playtime at 70% volume. Warranty: 1 year Warranty provided by manufacturer/brand.",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/15/8945f359-034d-4aa6-a6bd-0aa13f9a9fbd1602716020778-1.jpg",
    },
    {
      productId: 5,
      brand: "sony",
      title: "Sony's Head phone",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://images-na.ssl-images-amazon.com/images/I/71F1BvfJ7rL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61852ZlhFIL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61o-1OE-MLL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/61wk80laaCL._SL1500_.jpg",
      ],
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1548378329-437e1ef34263?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 6,
      brand: "sony",
      title: "Sony digital Camera",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://images-na.ssl-images-amazon.com/images/I/71gsaZAz0vL._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/71LPngcNZ5L._SL1500_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51lNfaji09L._SL1128_.jpg",
        "https://images-na.ssl-images-amazon.com/images/I/51Yqvsah50L._SL1143_.jpg",
      ],
      description: "Sony HDRCX405 9.2MP HD Handycam Camcorder with Free Carrying Case (Black)",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbWVyYXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      productId: 7,
      brand: "dressberry",
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
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2525392/2019/5/2/f9f13ec3-c11a-460a-b35a-9f6ec31590871556781497682-RARE-Women-Blue-Printed-Maxi-Dress-3951556781495634-1.jpg",
    },

    {
      productId: 8,
      brand: "roadster",
      title: "Pink Printed Cotton Blend Designer Saree",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11419146/2020/2/26/608b22ee-165d-4ab7-b943-0704b8e7c7621582700961489-Vaamsi-Women-Sarees-2261582700960929-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11419146/2020/2/26/b42a10df-2787-413e-8d03-406284bf01fc1582700961443-Vaamsi-Women-Sarees-2261582700960929-4.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11419146/2020/2/26/8577c3ae-6300-4c9b-8a6d-0fadf1c68ab11582700961394-Vaamsi-Women-Sarees-2261582700960929-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11419146/2020/2/26/ffeb4ec2-2fad-42d3-87f5-0f8fddb847cd1582700961545-Vaamsi-Women-Sarees-2261582700960929-2.jpg",
      ],
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11419146/2020/2/26/7e94f05b-5c96-4b40-9213-89350f5873071582700961593-Vaamsi-Women-Sarees-2261582700960929-1.jpg",
    },

    {
      productId: 8,
      brand: "roadster",
      title: "Pink Printed Cotton Blend Designer Saree",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448980/2020/2/15/31526d53-798a-489d-bb72-b93471024f811581742483411-Puma-Men-Tshirts-7221581742481874-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448980/2020/2/15/1b2d49ed-8c0c-4a7f-b7bc-23dabd48fcb31581742483368-Puma-Men-Tshirts-7221581742481874-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448980/2020/2/15/17b5acca-4580-4816-9054-d3b1accc147b1581742483324-Puma-Men-Tshirts-7221581742481874-4.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448980/2020/2/15/cbcf73b3-139a-41c0-995d-71494d2db79a1581742483279-Puma-Men-Tshirts-7221581742481874-5.jpg",
      ],
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11448980/2020/2/15/bfaf3c01-57c2-4cab-b528-58881e4ece121581742483454-Puma-Men-Tshirts-7221581742481874-1.jpg",
    },

    {
      productId: 9,
      brand: "dressberry",
      title: "Women Pink & Orange Floral Printed A-Line Dress",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 55,
      actualPrice: 1699,
      sellingPrice: 764,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/e698b1e1-07d3-446d-987f-bc8a75db18f91600207614701-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/b566836e-89c2-4495-b33e-7110d2434c441600207614771-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/59f13865-f642-4953-b9e6-7a362cc492031600207614895-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/be287303-c021-43ba-b5f4-72750ffb57651600207615024-7.jpg",
      ],
      description: "Women Pink & Orange Floral Printed A-Line Dress from Harpa",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/25f5b6a7-ce25-4e66-8a61-3aa2037b6c741600207614629-1.jpg",
    },
    {
      productId: 11,
      brand: "dressberry",
      title: "Women Pink & Orange Floral Printed A-Line Dress",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 55,
      actualPrice: 1699,
      sellingPrice: 764,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/e698b1e1-07d3-446d-987f-bc8a75db18f91600207614701-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/b566836e-89c2-4495-b33e-7110d2434c441600207614771-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/59f13865-f642-4953-b9e6-7a362cc492031600207614895-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/be287303-c021-43ba-b5f4-72750ffb57651600207615024-7.jpg",
      ],
      description: "Women Pink & Orange Floral Printed A-Line Dress from Harpa",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/25f5b6a7-ce25-4e66-8a61-3aa2037b6c741600207614629-1.jpg",
    },
    {
      productId: 12,
      brand: "puma",
      title: "Women Pink & Orange Floral Printed A-Line Dress",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 55,
      actualPrice: 1699,
      sellingPrice: 764,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/e698b1e1-07d3-446d-987f-bc8a75db18f91600207614701-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/b566836e-89c2-4495-b33e-7110d2434c441600207614771-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/59f13865-f642-4953-b9e6-7a362cc492031600207614895-5.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/be287303-c021-43ba-b5f4-72750ffb57651600207615024-7.jpg",
      ],
      description: "Women Pink & Orange Floral Printed A-Line Dress from Harpa",
      category: "women",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/9/16/25f5b6a7-ce25-4e66-8a61-3aa2037b6c741600207614629-1.jpg",
    },
    {
      productId: 13,
      brand: "nike",
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
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/7488103/2019/8/22/7142624c-9184-47db-bf67-5610bd756c761566454100661-Dennis-Lingo-Men-Green-Slim-Fit-Solid-Casual-Shirt-358156645-1.jpg",
    },
    {
      productId: 14,
      brand: "puma",
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      averageRating: 4.5,
      totalRating: 50,
      discountPercentage: 10,
      actualPrice: 1300,
      sellingPrice: 1170,
      subImages: [
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1932796/2017/5/30/11496123701348-Puma-Men-Tshirts-4271496123701269-2.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1932796/2017/5/30/11496123701335-Puma-Men-Tshirts-4271496123701269-3.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1932796/2017/5/30/11496123701321-Puma-Men-Tshirts-4271496123701269-4.jpg",
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1932796/2017/5/30/11496123701308-Puma-Men-Tshirts-4271496123701269-5.jpg",
      ],
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men",
      image:
        "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/1932796/2017/5/30/11496123701364-Puma-Men-Tshirts-4271496123701269-1.jpg",
    },
  ];

  if (req.query.category) {
    productList = productList.filter((Product) => Product.category === req.query.category);
  } else if (req.query.minPrice || req.query.maxPrice) {
    productList = productList.filter((product) => {
      if (
        product.sellingPrice >= parseInt(req.query.minPrice) &&
        product.sellingPrice <= parseInt(req.query.maxPrice)
      ) {
        return product;
      }
    });
  } else if (req.query.brand) {
    productList = productList.filter((Product) => Product.brand === req.query.brand.toLowerCase());
  }
  return res.send({ statusCode: 200, message: "Success", data: { productList: productList } });
});

module.exports = router;
