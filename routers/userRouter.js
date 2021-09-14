const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

// ALL ROUTES AFTER THSI ARE PROTECTED
// router.use(authController.protect);

router.route("/updateMyPassword").patch(authController.updateMyPassword);

router.route("/me").get(userController.getMe, userController.getOneUser);

router.route("/updateMe").patch(userController.updateMe);

router.route("/deleteMe").delete(userController.deleteMe);

// ALL ROUTES AFTER THIS ARE RESTRICTED
// router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateOneUser)
  .delete(userController.deleteOneUser);

module.exports = router;
