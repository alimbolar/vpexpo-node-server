const express = require("express");
const User = require("./../models/userModel");
const APIFeatures = require("./../utils/APIFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

const filterObj = function(obj, ...allowedFields) {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async function(req, res, next) {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
});

exports.updateMe = catchAsync(async function(req, res, next) {
  // **Create Error if user posts password data**

  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This is the wrong route. Please user /updateMyPassword",
        401
      )
    );

  // **Filter out unwanted fields to ensure only needed fields and its data exist**

  const filteredBody = filterObj(req.body, "name", "email");

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

exports.createOneUser = catchAsync(async function(req, res, next) {
  const data = await User.create(req.body);

  res.status(201).json({
    status: "success",
    result: data.length,
    data,
  });
});

exports.getOneUser = catchAsync(async function(req, res, next) {
  const data = await User.findById(req.params.id);

  if (!data) {
    return next(new AppError("User with this ID does not exist", 400));
  }

  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
});

exports.updateOneUser = catchAsync(async function(req, res, next) {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new AppError("User with this ID does not exist", 400));
  }

  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
});

exports.deleteOneUser = catchAsync(async function(req, res, next) {
  const data = await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    result: data.length,
    data: null,
  });
});
