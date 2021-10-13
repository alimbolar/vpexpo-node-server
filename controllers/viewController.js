const fs = require("fs");
const path = require("path");
const Exhibitor = require("./../models/exhibitorModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { findById } = require("./../models/exhibitorModel");
const User = require("./../models/userModel");
const html_to_pdf = require("html-pdf-node");
const axios = require("axios");

exports.getOverview = function(req, res) {
  res.status(200).render("opening-page");
};

exports.getLoginForm = function(req, res, next) {
  res.status(200).render("login", {
    title: "Login Form",
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

exports.printMe = async function(req, res, next) {
  try {
    const root = process.env.PWD;

    const user = await User.findById(req.user.id);

    const ticketMarkup = `<div class="ticket">
  <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
  <div class="ticket__data"><div class="ticket__name">${user.firstName} ${user.lastName}</div><div class="ticket__company">${user.company}</div>
  <div class="ticket__country">${user.country}</div>
  <div class="ticket__profile">${user.profile}</div>
 </div>
   <div class="ticket__code" ><img src="https://qrtag.net/api/qr_6.svg?url=https://vp-expo-node-server.herokuapp.com/api/v1/users/${user.id}" alt="qrtag">
  </br> ${user._id}</div>`;

    // https://www.npmjs.com/package/html-pdf-node

    const options = {
      format: "A4",
      path: path.join(root, `/public/uploads/${user.creatorId}.pdf`),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
    // const ticket = { content: ticketMarkup };
    const ticket = { url: "http://127.0.0.1:3000/me/ticket" };

    const pdfBuffer = await html_to_pdf.generatePdf(ticket, options);

    // fs.writeFileSync(`${user.creatorID}.pdf`, pdfBuffer);

    // const pdfUrl = `uploads/${user.creatorId}.pdf`;
    // console.log(pdfBuffer);

    res.status(200).json({
      status: "success",
      // data: pdfUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.getTicket = function(req, res, next) {
  res.status(200).render("ticket", {
    title: "Ticket",
  });
};

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
