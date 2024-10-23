const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

const protect = asyncHandler(async (req, res,next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token form the header

      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await Users.findById(decoded.id).select("-password");

      // checking if user was found
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
