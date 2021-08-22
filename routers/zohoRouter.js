const express = require("express");
const router = express.Router();
const zohoController = require("./../controllers/zohoController");

router.route("/*").get(zohoController.getAllData);
// router.route("/exhibitors").get(zohoController.getAllExhibitorsData);

// router.route("/importVisitors").get(zohoController.importAllVisitorsData);
// router.route("/importExhibitors").get(zohoController.importAllExhibitorsData);
module.exports = router;
