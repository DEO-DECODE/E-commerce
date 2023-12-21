const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token Decoded:', decodedData);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHander("JWT token has expired", 401));
    }
    // Handle other errors if needed
    return next(new ErrorHander("Invalid token", 401));
  }
  
});
