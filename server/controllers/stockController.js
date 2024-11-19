const User = require("../models/userModel");
const Stock = require("../models/stockModel");
const STOCKDATA = require("../config/stocksData");
const Portfolio = require("../models/portfolioDataModel");
const Orders = require("../models/ordersModel");
const { getPrice } = require("../utils/getPrice");

exports.purchaseStock = async (req, res) => {
	try {
		const { userId, ticker, quantity, price } = req.body;

		if (req.user !== userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const totalPrice = quantity * price;

		if (user.balance - totalPrice < 0) {
			return res.status(200).json({
				status: "fail",
				message: `You don't have enough cash to purchase this stock.`,
			});
		}

		const portfolioData = await Portfolio.find({ userId, ticker })

		if (portfolioData.length == 0) {
			const avgPrice = ((Number(price) * Number(quantity)) / Number(quantity));
			const portfolio = new Portfolio({ userId, ticker, quantity, avgPrice });
			await portfolio.save();
		}
		else {
			const updatedQuantity = (Number(portfolioData[0].quantity) + Number(quantity));
			const updatedAvg = (((Number(portfolioData[0].quantity) * Number(portfolioData[0].avgPrice)) / updatedQuantity) + ((Number(quantity) * Number(price)) / updatedQuantity)).toFixed(2);

			await Portfolio.findByIdAndUpdate(portfolioData[0]._id, { quantity: updatedQuantity, avgPrice: updatedAvg })
		}
		const purchase = new Stock({ userId, ticker, quantity, price });
		await purchase.save();

		const updatedUser = await User.findByIdAndUpdate(userId, {
			balance:
				Math.round((user.balance - totalPrice + Number.EPSILON) * 100) / 100,
		});

		return res.status(200).json({
			status: "success",
			stockId: purchase._id,
			user: {
				username: updatedUser.username,
				id: updatedUser._id,
				balance:
					Math.round((user.balance - totalPrice + Number.EPSILON) * 100) / 100,
			},
		});


	} catch (error) {
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened.",
		});
	}
};

exports.saveOrder = async (req, res) => {
	try {
		const { userId, ticker, quantity, orderAmount, orderType } = req.body;

		if (req.user !== userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		if (orderType === 'limit') {
			const totalPrice = quantity * orderAmount;

			if (user.balance < totalPrice) {
				return res.status(200).json({
					status: "fail",
					message: "Insufficient balance for limit order.",
				});
			}
		} else if (orderType === 'stop_loss' || orderType === 'take_profit') {
			const portfolioData = await Portfolio.findOne({ userId, ticker });

			if (!portfolioData || portfolioData.quantity < quantity) {
				return res.status(200).json({
					status: "fail",
					message: "Insufficient quantity for stop loss or take profit order.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "Invalid order type.",
			});
		}

		const order = new Orders({
			userId,
			ticker,
			quantity,
			orderAmount,
			orderType,
			status: 'open',
		});

		await order.save();

		return res.status(200).json({
			status: "success",
			message: "Order saved successfully.",
			order,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

exports.sellStock = async (req, res) => {
	try {
		const { userId, ticker, quantity, price } = req.body;
		console.log(price)

		if (req.user !== userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		// const stock = await Stock.findById(stockId);

		// if (!stock) {
		//   return res.status(200).json({
		//     status: "fail",
		//     message: "Credentials couldn't be validated.",
		//   });
		// }

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		// if (quantity > stock.quantity) {
		//   return res.status(200).json({
		//     status: "fail",
		//     message: "Invalid quantity.",
		//   });
		// }

		// if (quantity == stock.quantity) {
		//   await Stock.findByIdAndUpdate(stockId, {
		//     closed: true,
		//   });
		// } else if (quantity < stock.quantity) {
		//   await Stock.findByIdAndUpdate(stockId, {
		//     quantity: stock.quantity - quantity,
		//   });


		// }

		const portfolioData = await Portfolio.find({ userId, ticker })

		const portfolioQuantity = Number(portfolioData[0].quantity);
		if (quantity > portfolioQuantity) {
			return res.status(200).json({
				status: "fail",
				message: "Invalid quantity.",
			});
		}

		const updatedPortfolioQuantity = (portfolioQuantity - Number(quantity)).toFixed(2);

		if (updatedPortfolioQuantity == 0) {
			await Portfolio.deleteOne(portfolioData[0]._id)
		} else {
			await Portfolio.findByIdAndUpdate(portfolioData[0]._id, { quantity: updatedPortfolioQuantity }, { new: true })
		}

		const saleProfit = quantity * price;
		const realisedPL = (((saleProfit / (portfolioData[0].avgPrice * quantity)) - 1) * 100).toFixed(2);

		// new sell stock row
		const sellStock = new Stock({
			userId,
			ticker,
			quantity,
			price,
			realisedPL,
			closed: true,
		});

		await sellStock.save();


		const updatedUser = await User.findByIdAndUpdate(userId, {
			balance:
				Math.round((user.balance + saleProfit + Number.EPSILON) * 100) / 100,
		});

		return res.status(200).json({
			status: "success",
			user: {
				username: updatedUser.username,
				id: updatedUser._id,
				balance:
					Math.round((user.balance + saleProfit + Number.EPSILON) * 100) / 100,
			},
		});
	} catch (error) {
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened.",
		});
	}
};




const getPricesData = async (stocks) => {

	try {
		const promises = stocks.map(async (stock) => {
			return await getPrice(stock.ticker);
		});


		const results = await Promise.all(promises);
		return results;
	} catch (error) {

		return [];
	}
};

exports.getPortfolioForUser = async (req, res) => {
	try {
		if (req.user !== req.params.userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}
		const portfolioData = await Portfolio.find({ userId: req.params.userId })
		const portfolioDataWithNames = portfolioData.map(portfolio => {
			let name = '';
			STOCKDATA.stockData.forEach(stock => {
				if (stock.ticker.toLowerCase() === portfolio.ticker.toLowerCase()) {
					name = stock.name;
				}
			});
			return {
				...portfolio.toObject(),
				name
			};
		});
		console.log("portfolioData", portfolioData)
		console.log("portfolioDataWithNames", portfolioDataWithNames)
		return res.status(200).json({
			status: "success",
			portfolioData: portfolioDataWithNames
		});

	} catch (error) {
		console.log(error)
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened!"
		})
	}
}

exports.getStockForUser = async (req, res) => {
	try {
		if (req.user !== req.params.userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const stocks = await Stock.find({ userId: req.params.userId });
		let stocksData = await getPricesData(stocks);

		const modifiedStocks = stocks.map((stock) => {
			let name;
			let currentPrice;
			let currentDate;
			STOCKDATA.stockData.forEach((stockData) => {
				if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
					name = stockData.name;
				}
			});

			stocksData.forEach((stockData) => {
				if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
					currentDate = stockData.date;
					currentPrice = stockData.adjClose;
				}
			});

			return {
				id: stock._id,
				ticker: stock.ticker,
				name,
				purchasePrice: stock.price,
				purchaseDate: stock.date,
				quantity: stock.quantity,
				realisedPL: stock.realisedPL,
				closed: stock.closed,
				currentDate,
				currentPrice,
			};
		});

		return res.status(200).json({
			status: "success",
			stocks: modifiedStocks,
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened.",
		});
	}
};

exports.getOrdersForUser = async (req, res) => {
	try {
		if (req.user !== req.params.userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const orders = await Orders.find({ userId: req.params.userId });

		return res.status(200).json({
			status: "success",
			orders,
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened.",
		});
	}
};

exports.resetAccount = async (req, res) => {
	try {
		if (req.user !== req.params.userId) {
			return res.status(200).json({
				status: "fail",
				message: "Credentials couldn't be validated.",
			});
		}

		const stocks = await Stock.find({ userId: req.params.userId });
		stocks.forEach(async (stock) => {
			await Stock.findByIdAndDelete(stock._id);
		});

		const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
			balance: 100000,
		});

		return res.status(200).json({
			status: "success",
			user: {
				username: updatedUser.username,
				id: updatedUser._id,
				balance: 100000,
			},
		});
	} catch (error) {
		return res.status(200).json({
			status: "fail",
			message: "Something unexpected happened.",
		});
	}
};


exports.getPrice = getPrice;