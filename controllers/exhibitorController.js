const Exhibitor = require("../models/exhibitorModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");

exports.getAllExhibitors = factory.getAll(Exhibitor);
exports.createOneExhibitor = factory.createOne(Exhibitor);
exports.getOneExhibitor = factory.getOne(Exhibitor);
exports.updateOneExhibitor = factory.updateOne(Exhibitor);
exports.deleteOneExhibitor = factory.deleteOne(Exhibitor);
