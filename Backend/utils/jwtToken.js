const sendToken = (user, statusCode, res) => {
  // Generate a JWT token for the user
  const token = user.getJWTToken();

  // Parse the COOKIE_EXPIRE value into a number
  const expiresInDays = parseInt(process.env.COOKIE_EXPIRE, 10);

  if (isNaN(expiresInDays) || expiresInDays <= 0) {
    console.error("Invalid COOKIE_EXPIRE value:", process.env.COOKIE_EXPIRE);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }

  // Calculate the expiration time for the cookie
  const expiresInMilliseconds = expiresInDays * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + expiresInMilliseconds);

  // Options for the cookie
  const options = {
    expires: expirationDate,
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });

  // Options for the cookie

  // httpOnly: Set to true to make the cookie accessible only through HTTP/S protocols, preventing client-side access through JavaScript and reducing the risk of XSS attacks.
  // Options for the cookie

  /*
    .cookie("token", token, options): Sets a cookie in the response. It takes three parameters:
    "token": The name of the cookie.
    token: The actual value of the cookie, which is the JWT token in this case.
    options: The options object defined earlier, specifying expiration time and HTTP-only.
  */
};

module.exports = sendToken;
