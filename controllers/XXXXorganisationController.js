const Organisation = require("../models/XXXX organisationModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrganisations = catchAsync(async function(req, res, next) {
  const organisations = await Organisation.find();

  res.status(200).json({
    status: "success",
    result: organisations.length,
    organisations,
  });
});

exports.createOneOrganisation = catchAsync(async function(req, res, next) {
  const newOrganisation = await Organisation.create(req.body);

  res.status(200).json({
    status: "success",
    message: "Organisation created",
    organisation: newOrganisation,
  });
});
