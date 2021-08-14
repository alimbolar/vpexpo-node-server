const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("../utils/AppError");
const { findOne } = require("./../models/userModel");

signToken = function(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async function(req, res, next) {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.login = catchAsync(async function(req, res, next) {
  // check if email and password exist
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError("Email or password not provided. Please try again", 401)
    );

  // check if user exists and password matches
  const user = await User.findOne({ email: req.body.email });

  console.log(await user.correctPassword(password, user.password));
  if (!user && !(await user.correctPassword(password, user.password)))
    return next(
      new AppError("User or Password does not match. Please try again", 401)
    );

  // sign JWT

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
});

exports.protect = catchAsync(async function(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("Token does not exist", 401));

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  // check if user exists
  const user = await User.findById(decoded.id);

  if (!user)
    return next(new AppError("User with this token does not exist", 400));

  // check if password was changed after JWT Token was issued

  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("Password changed after JWT Token was issued"),
      401
    );

  // Grant Access
  req.user = user;
  next();
});
