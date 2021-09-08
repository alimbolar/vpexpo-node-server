const crypto = require("crypto");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const AppError = require("../utils/AppError");
const sendMail = require("./../utils/email");

signToken = function(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};
if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

const createSendToken = function(user, statusCode, res) {
  const token = signToken(user._id);

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async function(req, res, next) {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
  // const token = signToken(newUser._id);

  // res.status(200).json({
  //   status: "success",
  //   token: token,
  // });
});

exports.login = catchAsync(async function(req, res, next) {
  // check if email and password exist
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError("Email or password not provided. Please try again", 401)
    );

  console.log(req.body.email);
  // check if user exists and password matches
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError("User or Password does not match. Please try again", 401)
    );
  }

  // sign JWT

  createSendToken(user, 200, res);
});

exports.logout = function(req, res, next) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

// 'IS LOGGED IN' MIDDLEWARE

exports.isLoggedIn = async function(req, res, next) {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );
      // check if user exists
      const user = await User.findById(decoded.id);

      if (!user) return next();

      // check if password was changed after JWT Token was issued

      if (user.changedPasswordAfter(decoded.iat)) return next();

      // Grant Access
      res.locals.user = user;
      return next();
    } catch (err) {
      console.log(err);
    }
  }

  next();
};

// PROTECT MIDDLEWARE
exports.protect = catchAsync(async function(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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
  res.locals.user = user;
  next();
});

exports.restrictTo = function(...roles) {
  return function(req, res, next) {
    if (!roles.includes(req.user.role))
      return next(new AppError("Not Authorised", 401));
    next();
  };
};

exports.forgotPassword = catchAsync(async function(req, res, next) {
  // 1. Get user based on POST email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("User with email does not exist", 404));

  // 2. Generate random token

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  console.log(resetToken);

  // 3. Send it back as an email

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Here's your link \n ${resetURL}`;

  try {
    sendMail({
      email: user.email,
      subject: "Your reset password link for the next 10 minutes",
      text: message,
    });

    res.status(200).json({
      status: "success",
      resetToken: resetToken,
      message: "Token sent by email",
      data: {
        user: user,
      },
    });
  } catch (err) {
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Email could not be sent", 500));
  }
});

exports.resetPassword = catchAsync(async function(req, res, next) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(hashedToken);
  console.log(req.params);

  // 1. Get User based on token

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    // passwordResetExpires: { $gt: Date.now() },
  });

  console.log(user);
  // 2. Check that there's a user and that the token has not expired

  if (!user)
    return next(new AppError("User with this token does not exist", 400));

  // 3. Set New Password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4. Update passwordChangedAt property for the user

  // 5. Log in the user by sending the JWT Token

  createSendToken(user, 201, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: "success",
  //   token: token,
  //   data: {
  //     user: user,
  //   },
  // });
});

exports.updateMyPassword = catchAsync(async function(req, res, next) {
  // **Get user from collection and ensure .select('+password)**

  const user = await User.findById(req.user._id).select("+password");

  if (!user) return next(new AppError("User with this ID does not exist", 401));

  // **Check if POSTed password is correct**

  console.log(user);

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError("Current Password is not right", 401));

  // **If so, update the password**

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // **Create And Send Token**

  createSendToken(user, 200, res);
});
