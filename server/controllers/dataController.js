const Axios = require("axios");
const data = require("../config/stocksData");
const { getPrice } = require("../utils/getPrice");
const sortByDate = require("../utils/date");
const { cacheTicker, getTicker, setCache, getCache } = require("../utils/cacheTickers");
const Product = require("../models/productsModel");
const StockData = require("../models/stockDataModel");

exports.getStockMetaData = async (req, res) => {
  // check if ticker in cache
  const ticker = await getTicker(req.params.ticker);

  if (ticker) {
    return res.status(200).json({
      status: "success",
      data: ticker.data,
    });
  }


  try {
    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}?token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);
    // cache ticker
    //await cacheTicker(req.params.ticker, response.data);
    // get currentPrice from products 
    // find last date Price from products 
    /*   const lastProduct = Product.findOne({ ticker: req.params.ticker, "data.0": { $exists: true } }).sort({ "data.date": -1 });
      response.data.push({
        adjClose: lastProduct.data[0].adjClose,
        date: lastProduct.data[0].date
      }) */

    cacheTicker(req.params.ticker, response.data)
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
    });
  }
};

exports.getStockInfo = (req, res) => {
  let info;
  data.stockData.forEach((stock) => {
    if (stock.ticker.toLowerCase() === req.params.ticker.toLowerCase()) {
      info = stock;
    }
  });

  if (info) {
    return res.status(200).json({
      status: "success",
      data: info,
    });
  } else {
    return res.status(200).json({
      status: "fail",
    });
  }
};
exports.getCurrentPrice = async (req, res) => {
  const { ticker } = req.query;

  try {
    // const result = await getPrice(ticker);
    // return res.status(200).json(result);
    const url = `https://api.tiingo.com/iex/${ticker}?token=${process.env.TIINGO_API_KEY}`;
    const response = await Axios.get(url);
    const data = response.data[0]

    const stockData = new StockData({ ticker, date: data.timestamp, open: data.open, close: data.last, high: data.high, low: data.low, last: data.last, volume: data.volume });
    await stockData.save();
    return res.status(200).json({
      ticker: ticker,
      date: data.timestamp,
      currentPrice: data.last,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: "fail",
      message: "Error fetching current price",
    });
  }
}
exports.getStockData = async (req, res) => {

  try {

    const storedData = await StockData.find({ ticker: req.params.ticker })

    return res.status(200).json({
      status: "success",
      data: storedData
    });
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: "fail",
      message: "Error while fetching stock data"
    })
  }
}

// Data needed: average for each of the last 6 months + latest daily data + last month of data points + last 2 years of data points, sampled weekly
exports.getStockHistoricData = async (req, res) => {

  try {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();
    const frequency = '15min'

    const url = `https://api.tiingo.com/iex/${req.params.ticker}/prices?startDate=${year}-${month}-${day}&resampleFreq=${frequency}&token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);
    const data = response.data;

    // const deleted = await StockData.deleteMany({ ticker: req.params.ticker });

    let stockData;
    for (let i = 0; i < data.length; i++) {
      stockData = new StockData({ ticker: req.params.ticker, date: data[i].date, open: data[i].open, close: data[i].close, high: data[i].high, low: data[i].low, volume: data[i].volume });
      await stockData.save();
    }

    return res.status(200).json("success");
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "fail",
    });
  }
};

const getRandomTicker = () => {
  const randomIndex = 4 || Math.floor(
    Math.random() * Math.floor(data.stockData.length)
  );
  return {
    ticker: data.stockData[randomIndex].ticker,
    name: data.stockData[randomIndex].name,
  };
};

exports.getRandomStockData = async (req, res) => {
  // check if ticker in cache
  const ticker = await getTicker("BTC");

  if (ticker) {
    return res.status(200).json({
      status: "success",
      ticker: "BTC",
      name: "Bitcoin",
      data: ticker.data,
    });
  }


  try {
    const stock = getRandomTicker();

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const url = `https://api.tiingo.com/tiingo/daily/${stock.ticker}/prices?startDate=${year}-${month}-${day}&token=${process.env.TIINGO_API_KEY}`;

    const response = await Axios.get(url);

    const data = [];
    for (let i = response.data.length - 1; i >= 0; i -= 5) {
      data.push({
        date: response.data[i].date,
        adjClose:
          Math.round((response.data[i].adjClose + Number.EPSILON) * 100) / 100,
      });
    }

    data.reverse();

    // cache ticker
    await cacheTicker(stock.ticker, data);

    return res.status(200).json({
      status: "success",
      ticker: stock.ticker,
      name: stock.name,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      status: "fail",
    });
  }
};



// NOTE
// this function is used to update the last price of a ticker
// this just for demonstration purposes

exports.setLastPriceForTicker = async (request, response) => {
  const { ticker } = request.query;
  const product = await Product.findOne({ ticker: ticker });

  if (!product || !product.data) {
    return;
  }

  const data = sortByDate([...product.data])
  const price = data[data.length - 1].adjClose;
  let newPrice = price + (Math.random() * 5 - 1);
  newPrice = parseFloat(newPrice.toFixed(2));
  product.data.push({
    date: Date.now(),
    adjClose: newPrice,
  });

  await product.save();


  response.status(200).json({
    status: "success",
  });
}


