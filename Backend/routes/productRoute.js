const express=require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const router=express.Router();
// Get Products 
router.route("/products").get(getAllProducts);
// Save a new Product
router.route("/product/new").post(createProduct);
// Update , Get and delete Product by using it's id
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)
module.exports=router;