const express = require("express");
const User = require("./../models/userModel");

exports.getAllUsers = async function(req, res) {
  const data = await User.find();
  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
};

exports.createOneUser = async function(req, res) {
  const data = await User.create(req.body);

  res.status(200).json({
    status: "success",
    result: data.length,
    data,
  });
};
