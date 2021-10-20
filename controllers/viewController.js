const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const Exhibitor = require("./../models/exhibitorModel");
const User = require("./../models/userModel");
// const { findById } = require("./../models/exhibitorModel");
// const html_to_pdf = require("html-pdf-node");
const axios = require("axios");

exports.getOverview = function(req, res) {
  res.status(200).render("opening-page");
};

exports.getLoginForm = function(req, res, next) {
  // console.log("viewController.getLoginForm", req.cookies.jwt);
  // console.log(req.user);

  res.status(200).render("login", {
    title: "Login Form",
  });
};

exports.getAllExhibitors = async function(req, res, next) {
  // const totalExhibitors = await Exhibitor.count();

  // const exhibitors = await Exhibitor.find();

  let query = Exhibitor.find();

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }
  const exhibitors = await query;

  res.status(200).render("exhibitor-list", {
    title: "Exhibitor List",
    exhibitors,
  });
};

exports.getExhibitorsLayout = async function(req, res, next) {
  // const totalExhibitors = await Exhibitor.count();

  res.status(200).render("exhibitors-layout", {
    title: "Exhibitors Layout",
  });
};

exports.getExhibitorList = async function(req, res, next) {
  let page;
  if (!req.query.page) req.query.page = 1;
  page = req.query.page * 1;

  // CONVERTING NEGATIVE TO POSITIVE
  if (page < 0) {
    page = -page;
  }

  const limit = 7;
  const skip = (page - 1) * limit;
  const totalExhibitors = await Exhibitor.count();

  const exhibitors = await Exhibitor.find()
    .skip(skip)
    .limit(limit);

  const maxPages = Math.ceil(totalExhibitors / limit);
  exhibitors.page = page;
  exhibitors.count = totalExhibitors;
  exhibitors.maxPages = maxPages;

  res.status(200).render("exhibitor-list", {
    title: "Exhibitor List",
    exhibitors,
  });
};

exports.getExhibitorsVisited = async function(req, res, next) {
  try {
    exhibitors = await axios({
      method: "GET",
      url: "/api/v1/exhibitors/visited",
    });

    res.status(200).render("exhibitors-visited", {
      title: "Exhibitors Visited",
      exhibitors,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("error"); // not sure if it's the right way
  }
};

exports.displayExhibitor = catchAsync(async function(req, res, next) {
  const exhibitor = await Exhibitor.findOne({ slug: req.params.slug });

  if (!exhibitor) {
    return next(
      new AppError("This exhibitor does not exist in the records", 404)
    );
  }

  console.log(exhibitor);

  res.status(200).render("exhibitor", {
    title: `${exhibitor.name}`,
    exhibitor,
  });
});

exports.getAccount = catchAsync(async function(req, res, next) {
  const user = await User.findById(req.user.id);

  // user.firstName &&
  // user.lastName &&
  // user.email &&
  // user.mobile &&
  // user.company &&
  // user.profile &&
  // user.country &&
  // user.nationality &&
  // user.visitorId &&
  // user.type
  user.eventoId > 0 ? (user.authorized = true) : (user.authorized = false);

  console.log("user from /me", user);
  console.log("user.authorized", user.authorized);

  res.status(200).render("account", {
    title: "My Account",
    user,
  });
});

exports.getSettings = async function(req, res, next) {
  const user = await User.findById(req.user.id);
  res.status(200).render("settings", {
    title: "My Settings",
    user,
  });
};

exports.getProfile = async function(req, res, next) {
  const user = await User.findById(req.user.id);
  res.status(200).render("profile", {
    title: "My Profile",
    user,
  });
};

// exports.getTicket = function(req, res, next) {
//   res.status(200).render("ticket", {
//     title: "Ticket",
//   });
// };

exports.getAPI = async function(req, res, next) {
  try {
    data = await axios({
      method: "POST",
      url: "/api/v1/eticket/addOneExhibitor",
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("error"); // not sure if it's the right way
  }
};
