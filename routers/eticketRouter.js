const express = require("express");
const router = express.Router();
const eticketController = require("./../controllers/eticketController");

router.route("/visitor").post(eticketController.addOneVisitor);

module.exports = router;
