const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updateMyPassword);

router
  .route("/updateMe")
  .patch(authController.protect, userController.updateMe);

router
  .route("/deleteMe")
  .delete(authController.protect, userController.deleteMe);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.protect, userController.createOneUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(authController.protect, userController.updateOneUser)
  .delete(authController.protect, userController.deleteOneUser);

module.exports = router;
