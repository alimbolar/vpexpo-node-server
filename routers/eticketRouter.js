const express = require("express");
const router = express.Router();
const eticketController = require("./../controllers/eticketController");

router.post("/addOneExhibitor", eticketController.addOneExhibitorToCreator);

module.exports = router;
