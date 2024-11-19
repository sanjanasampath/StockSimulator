const fs = require("fs")
const Product = require("../models/productsModel")


async function cacheTicker(ticker, data) {
  // check if ticker is already in the database
  const existingTicker = await getTicker(ticker)
  if (existingTicker) {
    // push the new data to the existing ticker
    existingTicker.data = data;
    return await existingTicker.save()
  }

  const product = new Product({
    ticker,
    data
  });

  return await product.save()
}


async function getTicker(ticker) {
  return await Product.findOne({ ticker: ticker })
}


const cacheFile = "server/data/cache.json"
function setCache(key, data) {
  let cache = {}
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile))
  } catch {

  }
  if (cache[key]) {
    // merge the new data with the existing data
    cache[key] = { ...cache[key], ...data }
  } else {
    cache[key] = data
  }

  fs.writeFileSync(cacheFile, JSON.stringify(cache))
}

function getCache(key) {
  try {
    const cache = JSON.parse(fs.readFileSync(cacheFile))
    return cache[key] || null
  } catch (err) {
    return null
  }
}


module.exports = {
  cacheTicker,
  getTicker,
  setCache,
  getCache
}