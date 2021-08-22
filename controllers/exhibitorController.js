const Exhibitor = require("../models/exhibitorModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllExhibitors = catchAsync(async function(req, res, next) {
  const exhibitors = await Exhibitor.find();

  res.status(200).json({
    status: "success",
    result: exhibitors.length,
    data: {
      booths,
    },
  });
});

exports.createOneExhibitor = catchAsync(async function(req, res, next) {
  const newExhibitor = await Exhbitor.create(req.body);

  res.status(200).json({
    status: "success",
    message: "Exhibitor created",
    data: {
      booth: newExhibitor,
    },
  });
});
