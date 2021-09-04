const Exhibitor = require("./../models/exhibitorModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = function(req, res) {
  res.status(200).render("opening-page");
};

exports.getExhibitorList = catchAsync(async function(req, res, next) {
  const exhibitors = await Exhibitor.find();
  res.status(200).render("exhibitor-list", {
    title: "VP Expo 2021",
    exhibitors,
  });
});
