const express = require("express");
const User = require("./../models/userModel");
const APIFeatures = require("./../utils/APIFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

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
