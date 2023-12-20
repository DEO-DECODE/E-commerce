// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    /*
    httpOnly: This option is set to true, making the cookie accessible only through HTTP/S protocols. This is a security measure to help prevent client-side access to the cookie through JavaScript, reducing the risk of cross-site scripting (XSS) attacks.
    */
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
  /*
  .cookie("token", token, options): Sets a cookie in the response. It takes three parameters:

"token": The name of the cookie.
token: The actual value of the cookie, which is the JWT token in this case.
options: The options object defined earlier, specifying expiration time and HTTP-only.
  */
};

module.exports = sendToken;
