const express = require("express");
const router = express.Router();
const boothController = require("./../controllers/boothController");

router
  .route("/")
  .get(boothController.getAllBooths)
  .post(boothController.createOneBooth);

// router
//   .route("/:id")
//   .get(boothController.getOneBooth)
//   .patch(boothController.updateOneBooth)
//   .delete(boothController.deleteOneBooth);

module.exports = router;
