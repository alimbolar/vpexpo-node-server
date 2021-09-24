const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

router.use(authController.isLoggedIn);

router.get("/", viewController.getOverview);
router.get("/login", viewController.getLoginForm);
router.get("/exhibitors", viewController.getExhibitorList);
router.get("/exhibitors/visited", viewController.getExhibitorsVisited);
router.get("/exhibitor/:slug", viewController.displayExhibitor);
router.get("/me", authController.protect, viewController.getAccount);
router.get("/me/settings", authController.protect, viewController.getSettings);
router.get("/me/ticket", viewController.getTicket);
router.get("/printme", authController.protect, viewController.printMe);

module.exports = router;
