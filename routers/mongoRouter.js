const express = require("express");
const router = express.Router();
const mongoController = require("./../controllers/mongoController");

router.route("/visitor").post(mongoController.addOneVisitor);

module.exports = router;
