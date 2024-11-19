const express = require("express");
const router = express.Router();
const {
  getStockInfo,
  getStockData,
  getStockHistoricData,
  getRandomStockData,
  setLastPriceForTicker,
  getCurrentPrice
} = require("../controllers/dataController");

router.route("/prices/:ticker").get(getStockInfo);
router.route("/prices/:ticker/stockHistoricData").get(getStockHistoricData);
router.route("/prices/:ticker/full").get(getStockData);
router.route("/random").get(getRandomStockData);
router.route("/setPriceForTicker").get(setLastPriceForTicker);
router.route("/getPriceForTicker").get(getCurrentPrice);


module.exports = router;
