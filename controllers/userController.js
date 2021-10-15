const express = require("express");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const factory = require("./handlerController");

exports.getAllUsers = factory.getAll(User);
exports.createOneUser = factory.createOne(User);
exports.getOneUser = factory.getOne(User);
exports.updateOneUser = factory.updateOne(User);
exports.deleteOneUser = factory.deleteOne(User);

const filterObj = function(obj, ...allowedFields) {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = function(req, res, next) {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async function(req, res, next) {
  // **Create Error if user posts password data**

  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("This is the wrong route. Please use /updateMyPassword", 401)
    );

  // **Filter out unwanted fields to ensure only needed fields and its data exist**

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "company",
    "profile",
    "email",
    "mobile",
    "country",
    "nationality",
    "type"
  );

  // **Update Data**
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // console.log("updatedUser", updatedUser);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async function(req, res, next) {
  //

  const deletedUser = await User.findByIdAndUpdate(req.user._id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: {
      user: null,
    },
  });
});

// exports.printMe = catchAsync(async function(req, res, next) {
//   // console.log(req.params);
//   const user = await User.findById(req.params.id);

//   const ticketMarkup = `<div class="ticket">
//   <div class="ticket__logo"> <img src="/images/vp-expo-logo.png"> </div>
//   <div class="ticket__data"><div class="ticket__name">${user.firstName} ${user.lastName}</div><div class="ticket__company">${user.company}</div>
//   <div class="ticket__country">${user.country}</div>
//   <div class="ticket__profile">${user.profile}</div>
//  </div>
//    <div class="ticket__code" ><img src="https://qrtag.net/api/qr_6.svg?url=https://vp-expo-node-server.herokuapp.com/api/v1/users/${user.id}" alt="qrtag">
//   </br> ${user._id}</div>
//   <button class="btn ticket__print-ticket"> Print Ticket </button>
//   </div>`;

//   // https://www.npmjs.com/package/html-pdf-node

//   const options = { format: "A4" };
//   const ticket = { content: ticketMarkup };

//   const pdfBuffer = await html_to_pdf.generatePdf(ticket, options);

//   console.log(pdfBuffer);
// });
