const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");

exports.addOneVisitor = catchAsync(async function(req, res, next) {
  console.log(req.body);
});
