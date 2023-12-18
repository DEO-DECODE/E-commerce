const Product = require("../models/productModel");
const errorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeatures= new ApiFeatures(Product.find(), req.query).search();
  // Product.find() query hai and req.query query string
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update a product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
// Delete a Product by Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander("Product Not Found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
// Get a single product for admin
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHander("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
