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

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "This email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Wrong password or email",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

/* exports.isAdmin = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(401).json({
      error: "Access denied. You might need permission.",
    });
  }
  next();
};*/
