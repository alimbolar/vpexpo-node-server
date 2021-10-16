const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");
const User = require("./../models/userModel");
const userController = require("./../controllers/userController");
const factory = require("./handlerController");
// const fetch = require("node-fetch");

const filterObj = function(obj, ...allowedFields) {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.addOneVisitor = catchAsync(async function(req, res, next) {
  //   const data = req.body;
  const visitorId = req.body.visitorId;

  const visitor = await User.findOne({ visitorId });

  console.log("mongo-visitor", visitor);

  if (!visitor) {
    // userController.createOneUser();

    const doc = await User.create(req.body);

    console.log("visitor created in mongo");

    res.status(201).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  } else {
    const filteredBody = filterObj(
      req.body,
      "eventoId",
      "visitorId",
      "firstName",
      "lastName",
      "email",
      "mobile",
      "company",
      "profile",
      "country",
      "nationality",
      "type"
    );

    const doc = await User.findOneAndUpdate({ visitorId }, filteredBody, {
      new: true,
      runValidators: true,
    });

    console.log("mongo-updated-visitor", doc);
    console.log("visitor updated in mongo");

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  }

  //   next();
});