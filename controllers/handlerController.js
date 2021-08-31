const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const APIFeatures = require("./../utils/APIFeatures");

exports.getAll = (Model) =>
  catchAsync(async function(req, res, next) {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async function(req, res, next) {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async function(req, res, next) {
    const features = new APIFeatures(
      Model.findById(req.params.id),
      req.query
    ).limitFields();
    const doc = await features.query;

    // const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("A document with this ID does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async function(req, res, next) {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("A document with this ID does not exist", 400));
    }

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async function(req, res, next) {
    const doc = await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
