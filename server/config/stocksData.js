
const companyStocks = [
  {
    description:
      "Apple Inc. (Apple) designs, manufactures and markets mobile communication and media devices, personal computers, and portable digital music players, and a variety of related software, services, peripherals, networking solutions, and third-party digital content and applications. The Company's products and services include iPhone, iPad, Mac, iPod, Apple TV, a portfolio of consumer and professional software applications, the iOS and OS X operating systems, iCloud, and a variety of accessory, service and support offerings. The Company also delivers digital content and applications through the iTunes Store, App StoreSM, iBookstoreSM, and Mac App Store. The Company distributes its products worldwide through its retail stores, online stores, and direct sales force, as well as through third-party cellular network carriers, wholesalers, retailers, and value-added resellers. In February 2012, the Company acquired app-search engine Chomp.",
    endDate: "2020-09-15",
    exchangeCode: "NASDAQ",
    startDate: "1980-12-12",
    name: "Apple Inc",
    ticker: "AAPL",
  },
  {
    description:
      "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Fire tablets, Fire TV, Amazon Echo, and Alexa are some of the products and services pioneered by Amazon.",
    endDate: "2020-09-15",
    exchangeCode: "NASDAQ",
    startDate: "1997-05-15",
    name: "Amazon Inc",
    ticker: "AMZN",
  },
  {
    description:
      "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Fire tablets, Fire TV, Amazon Echo, and Alexa are some of the products and services pioneered by Amazon.",
    endDate: "2020-09-15",
    exchangeCode: "NASDAQ",
    startDate: "1997-05-15",
    name: "Google Inc",
    ticker: "GOOG",
  },
  {
    description:
      "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Fire tablets, Fire TV, Amazon Echo, and Alexa are some of the products and services pioneered by Amazon.",
    endDate: "2020-09-15",
    exchangeCode: "NASDAQ",
    startDate: "1997-05-15",
    name: "Microsoft Inc",
    ticker: "MSFT",
  },
];

const cryptoStocks = exports.cryptoData = [
  {
    description:
      "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    startDate: "2009-01-03",
    name: "Bitcoin",
    ticker: "BTC-USD",
  },
  // {
  //   description:
  //     "Ethereum is a decentralized, open-source blockchain system that features smart contract functionality. It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
  //   startDate: "2015-07-30",
  //   name: "Ethereum",
  //   ticker: "ETH-USD",
  // },
];

const futuresStocks = exports.futuresData = [
  {
    description:
      "Gold futures",
    startDate: "2000-01-01",
    name: "Gold",
    ticker: "GC=F",
  },
  {
    description:
      "Crude oil futures",
    startDate: "1980-01-01",
    name: "Crude Oil",
    ticker: "CL=F",
  }
];


const stockData = companyStocks.concat(cryptoStocks);
const tickers = stockData.map(stock => stock.ticker);

exports.stockData = stockData;
exports.TICKERS = tickers;