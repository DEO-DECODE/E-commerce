const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    /*
    validate: [validator.isEmail, "Please Enter a valid Email"]: Uses a custom validator function (validator.isEmail), provided by a validator library, to validate that the entered value is a valid email address.
    */
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
    /*
    Specifies that by default, the password field should not be included in the query results.
    */
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//  jb v UserSchema save hoga usse phle
userSchema.pre("save", async function (next) {
  // Hm arrow function ke ander this use nhi kr skte isliye function likha
  /*
  This code is a Mongoose middleware function that is executed before saving a user document to the database.
  userSchema.pre("save", async function (next): This line indicates that the middleware function should be executed before the save operation on the userSchema.

  if (!this.isModified("password")) { next(); }: This condition checks whether the password field of the user document has been modified. If the password is not modified (which means the document is being saved for reasons other than a password change), the middleware calls next(), which moves the execution to the next middleware in the stack or completes the save operation.
  */
  if (!this.isModified("password")) {
    next();
  }
  // this.isModified ye check krega ki kya password field modify huaa hai?
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  /*
  userSchema.methods.getJWTToken = function () { ... }: This line adds a method named getJWTToken to the methods of the userSchema. In Mongoose, methods is a property that allows you to add instance methods to documents.

  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });: This line generates a JWT using the jwt.sign method. The payload of the JWT is an object containing the user's ID (this._id). The signing key (process.env.JWT_SECRET) is provided as the second argument, and an options object is passed as the third argument.
  */
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// // Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// // Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("User", userSchema);
