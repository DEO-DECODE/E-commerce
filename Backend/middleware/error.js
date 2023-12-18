const errorHander = require("../utils/errorHander");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.name === "castError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new errorHander(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack,
  });
};
