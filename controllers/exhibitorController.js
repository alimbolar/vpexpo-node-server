const { find } = require("../models/exhibitorModel");
const Exhibitor = require("../models/exhibitorModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");

exports.getAllExhibitors = factory.getAll(Exhibitor);
exports.createOneExhibitor = factory.createOne(Exhibitor);
exports.getOneExhibitor = factory.getOne(Exhibitor);
exports.updateOneExhibitor = factory.updateOne(Exhibitor);
exports.deleteOneExhibitor = factory.deleteOne(Exhibitor);

exports.getExhibitorsVisited = catchAsync(async function(req, res, next) {
  //   console.log(req.user.firstName);
  console.log(req.user);
  //   console.log(req.user.company);

  const creatorId = +req.user.creatorId;
  //   console.log(creatorID);
  exhibitors = await Exhibitor.find({ potential: creatorId });

  res.status(200).json({
    status: "success",
    result: exhibitors.length,
    exhibitors,
  });
});
