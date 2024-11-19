const express = require("express");
const router = express.Router();
const auth = require("../controllers/authMiddleware");
const { purchaseStock, saveOrder, sellStock, getStockForUser, getOrdersForUser, resetAccount, getCurrentPrice, getPortfolioForUser } = require("../controllers/stockController");

router.route("/").post(auth, purchaseStock);
router.route("/saveOrder").post(auth, saveOrder);
router.route("/").patch(auth, sellStock)
router.route("/portfolio/:userId").get(auth, getPortfolioForUser);
router.route("/:userId").get(auth, getStockForUser);
router.route("/:userId/getOrders").get(auth, getOrdersForUser);
router.route("/:userId").delete(auth, resetAccount);


module.exports = router;
