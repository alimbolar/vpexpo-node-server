const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.createOneUser);

router
  .route("/:id")
  .get(authController.protect, userController.getOneUser)
  .patch(authController.protect, userController.updateOneUser)
  .delete(authController.protect, userController.deleteOneUser);

module.exports = router;
