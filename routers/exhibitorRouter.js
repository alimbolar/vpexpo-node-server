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
router.get(
  "/visited",
  authController.protect,
  exhibitorController.getExhibitorsVisited
);

router
  .route("/:id")
  .get(exhibitorController.getOneExhibitor)
  .patch(exhibitorController.updateOneExhibitor)
  .delete(exhibitorController.deleteOneExhibitor);

module.exports = router;
