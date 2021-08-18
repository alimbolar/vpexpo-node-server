const Booth = require("./../models/boothModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllBooths = catchAsync(async function(req, res, next) {
  const booths = await Booth.find();

  res.status(200).json({
    status: "success",
    result: booths.length,
    data: {
      booths,
    },
  });
});

exports.createOneBooth = catchAsync(async function(req, res, next) {
  const newBooth = await Booth.create(req.body);

  res.status(200).json({
    status: "success",
    message: "booth created",
    data: {
      booth: newBooth,
    },
  });
});
