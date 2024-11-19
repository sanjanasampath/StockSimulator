const axios = require("axios");
const cheerio = require("cheerio");
const StockData = require("../models/stockDataModel");
const { TICKERS } = require("../config/stocksData");

const scrapeStockData = async (ticker) => {
  const url = `https://finance.yahoo.com/quote/${ticker}`;
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = {
      ticker: ticker,
      date: new Date().toISOString(),
      open: parseFloat($('fin-streamer[data-field="regularMarketOpen"]').text().replace(/,/g, '')),
      close: parseFloat($('fin-streamer[data-field="regularMarketPreviousClose"]').text().replace(/,/g, '')),
      high: parseFloat($('fin-streamer[data-field="regularMarketDayRange"]').text().split(' - ')[1].replace(/,/g, '')),
      low: parseFloat($('fin-streamer[data-field="regularMarketDayRange"]').text().split(' - ')[0].replace(/,/g, '')),
      last: parseFloat($('fin-streamer[data-field="regularMarketPrice"]').text().replace(/,/g, '')),
      volume: Number($('fin-streamer[data-field="regularMarketVolume"]').text().replace(/,/g, '')),
    };

    return data;
  } catch (error) {
    console.error(`Error scraping data for ${ticker}:`, error);
    return null;
  }
};

(async function myFunction() {
  console.log("Function is running!");
  try {
    for (const ticker of TICKERS) {
      const data = await scrapeStockData(ticker);
      if (data) {
        const stockData = new StockData(data);
        await stockData.save();
        console.log({
          data,
          ticker: data.ticker,
          date: data.date,
          currentPrice: data.last,
        });
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Error fetching current price");
  }
  // Schedule the function to run again after 3 minutes (180,000 milliseconds)
  setTimeout(myFunction, 180000);
})();
