const SERVER_FAILURE = "Server got failed due to some error.Please try after some other time";

const MIDDLEWARE_AUTH_CONSTANTS = {
  ACCESS_DENIED: "Access denied. No authorization token provided",
  RESOURCE_FORBIDDEN: "You don't have access to the request resource.",
  INVALID_AUTH_TOKEN: "Invalid token",
  INVALID_USER: "No user found with given id",
  INVALID_ADMIN: "No admin found with given id",
};

const ADMIN_CONSTANTS = {
  ADMIN_NOT_FOUND: "No admin Found with given email",
  INVALID_CREDENTIALS: "Either email or password is inavlid",
};

const PRODUCT_CONSTANTS = {
  PRODUCT_NOT_FOUND: "Product not found with given id",
  PRODUCT_IN_CART: "Product found in some user's cart.Be sure if you want to delete the product or not",
  NO_PRODUCT_IN_CART: "This product doesn't seem to be in any user's cart",
  PRODUCT_DELETED: "Product with given id is successfully deleted",
};

// category
const CATEGORY_CONSTANTS = {
  CATEGORY_ALREADY_EXISTS: "Category with given name already exists",
  CATEGORY_NOT_FOUND: "Category not found",
  CATEGORY_UPDATED: "Category updated successfully",
  CATEGORY_DELETED: "Category deleted successfully",
  SERVER_FAILURE,
};

module.exports.ADMIN_CONSTANTS = ADMIN_CONSTANTS;
module.exports.PRODUCT_CONSTANTS = PRODUCT_CONSTANTS;
module.exports.CATEGORY_CONSTANTS = CATEGORY_CONSTANTS;
module.exports.MIDDLEWARE_AUTH_CONSTANTS = MIDDLEWARE_AUTH_CONSTANTS;
