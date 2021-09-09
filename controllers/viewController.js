const Exhibitor = require("./../models/exhibitorModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { findById } = require("./../models/exhibitorModel");
const User = require("./../models/userModel");

exports.getOverview = function(req, res) {
  res.status(200).render("opening-page");
};

exports.getLoginForm = function(req, res, next) {
  res.status(200).render("login", {
    title: "Login Form",
  });
};

exports.getExhibitorList = catchAsync(async function(req, res, next) {
  const exhibitors = await Exhibitor.find();
  res.status(200).render("exhibitor-list", {
    title: "VP Expo 2021",
    exhibitors,
  });
});

exports.displayExhibitor = catchAsync(async function(req, res, next) {
  const exhibitor = await Exhibitor.findOne({ slug: req.params.slug });

  if (!exhibitor) {
    return next(
      new AppError("This exhibitor does not exist in the records", 404)
    );
  }

  res.status(200).render("exhibitor", {
    title: `${exhibitor.name}`,
    exhibitor,
  });
});

exports.getAccount = catchAsync(async function(req, res, next) {
  const user = await User.findById(req.user.id);

  res.status(200).render("account", {
    title: "My Account",
    user,
  });
});
