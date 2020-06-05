const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// Sign up

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((error, save) => {
    console.log("reached signup endpoint");
    if (error) {
      return res.status(400).json({
        message: "Check fields, there is an error",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};
// Sign in
