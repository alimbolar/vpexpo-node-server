const express = require("express");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const factory = require("./handlerController");

exports.getAllUsers = factory.getAll(User);
exports.createOneUser = factory.createOne(User);
exports.getOneUser = factory.getOne(User);
exports.updateOneUser = factory.updateOne(User);
exports.deleteOneUser = factory.deleteOne(User);

const filterObj = function(obj, ...allowedFields) {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = function(req, res, next) {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async function(req, res, next) {
  // **Create Error if user posts password data**

  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("This is the wrong route. Please use /updateMyPassword", 401)
    );

  // **Filter out unwanted fields to ensure only needed fields and its data exist**

  const filteredBody = filterObj(req.body, "firstName", "email");

  // **Update Data**
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async function(req, res, next) {
  //

  const deletedUser = await User.findByIdAndUpdate(req.user._id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: {
      user: null,
    },
  });
});
