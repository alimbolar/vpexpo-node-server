const Exhibitor = require("./../models/exhibitorModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { findById } = require("./../models/exhibitorModel");
const User = require("./../models/userModel");
const html_to_pdf = require("html-pdf-node");

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
    title: "Exhibitor List",
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

exports.printMe = catchAsync(async function(req, res, next) {
  // console.log(req.params);

  // console.log("Inside Print Me");

  const user = await User.findById(req.user.id);

  const ticketMarkup = `<div class="ticket">
  <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
  <div class="ticket__data"><div class="ticket__name">${user.firstName} ${user.lastName}</div><div class="ticket__company">${user.company}</div>
  <div class="ticket__country">${user.country}</div>
  <div class="ticket__profile">${user.profile}</div>
 </div>
   <div class="ticket__code" ><img src="https://qrtag.net/api/qr_6.svg?url=https://vp-expo-node-server.herokuapp.com/api/v1/users/${user.id}" alt="qrtag">
  </br> ${user._id}</div>
  <button class="btn ticket__print-ticket"> Print Ticket </button>
  </div>`;

  // https://www.npmjs.com/package/html-pdf-node

  const options = { format: "A4" };
  const ticket = { content: ticketMarkup };

  const pdfBuffer = await html_to_pdf.generatePdf(ticket, options);

  // console.log(pdfBuffer);

  res.status(200).json({
    status: "success",
    // data: pdfBuffer,
  });
});
