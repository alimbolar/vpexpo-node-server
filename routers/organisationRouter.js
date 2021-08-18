const express = require("express");
const router = express.Router();
const organisationController = require("./../controllers/organisationController");

router
  .route("/")
  .get(organisationController.getAllOrganisations)
  .post(organisationController.createOneOrganisation);

// router
//   .route("/:id")
//   .get(organisationController.getOneOrganisation)
//   .patch(organisationController.updateOneOrganisation)
//   .delete(organisationController.deleteOneOrganisation);

module.exports = router;
