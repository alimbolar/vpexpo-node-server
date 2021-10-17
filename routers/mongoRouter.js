const express = require("express");
const router = express.Router();
const mongoController = require("./../controllers/mongoController");

router.route("/visitor").post(mongoController.addOneVisitor);
router.route("/exhibitor").post(mongoController.addOneExhibitor);

module.exports = router;
