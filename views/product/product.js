const axios = require("axios");

exports.deleteProduct = async function (req, res) {
  try {
    const productList = await axios
      .delete(`http://localhost:7000/api/product/${req.params.productId}`, {
        params: { isProductInCart: false },
      })
      .then((res) => {
        console.log("res>>>>", res);
      });
    const updatedProductList = await axios.get(
      "http://localhost:7000/api/product/v1"
    );
    res.render("viewproducts", {
      productList: updatedProductList.data.data.productList,
    });
  } catch (error) {
    if (error.res) {
      console.log(error.res);
    } else {
      console.log("error is >>>", error);
    }
  }
};
