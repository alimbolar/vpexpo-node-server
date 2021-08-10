const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

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
