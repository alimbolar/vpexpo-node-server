const express = require("express");
const router = express.Router();
const exhibitorController = require("./../controllers/exhibitorController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(exhibitorController.getAllExhibitors)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    exhibitorController.createOneExhibitor
  );

// router
//   .route("/:id")
//   .get(boothController.getOneBooth)
//   .patch(boothController.updateOneBooth)
//   .delete(boothController.deleteOneBooth);

module.exports = router;
