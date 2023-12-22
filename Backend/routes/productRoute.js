const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/isAuthenticatedUser");
const router = express.Router();
// Get Products
router.route("/products").get(getAllProducts);
// Save a new Product
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
// Update , Get and delete Product by using it's id
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
