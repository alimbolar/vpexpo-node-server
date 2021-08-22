const express = require("express");
const router = express.Router();
const exhibitorController = require("./../controllers/exhibitorController");

router
  .route("/")
  .get(exhibitorController.getAllExhibitors)
  .post(exhibitorController.createOneExhibitor);

// router
//   .route("/:id")
//   .get(boothController.getOneBooth)
//   .patch(boothController.updateOneBooth)
//   .delete(boothController.deleteOneBooth);

module.exports = router;
