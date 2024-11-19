const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockDataSchema = new Schema({
	ticker: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		required: false,
	},
	lastSaleTimestamp: {
		type: Date,
		required: false,
	},
	quoteTimestamp: {
		type: Date,
		required: false,
	},
	close: {
		type: Number,
		required: false,
	},
	open: {
		type: Number,
		required: true,
	},
	high: {
		type: Number,
		required: true,
	},
	low: {
		type: Number,
		required: true,
	},
	mid: {
		type: Number,
		required: false,
	},
	tngoLast: {
		type: Number,
		required: false,
	},
	last: {
		type: Number,
		required: false,
	},
	lastSize: {
		type: Number,
		required: false,
	},
	bidSize: {
		type: Number,
		required: false,
	},
	bidPrice: {
		type: Number,
		required: false,
	},
	askPrice: {
		type: Number,
		required: false,
	},
	askSize: {
		type: Number,
		required: false,
	},
	prevClose: {
		type: Number,
		required: false,
	},
	volume: {
		type: Number,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	}
});

const StockData = mongoose.model("StockData", stockDataSchema);

module.exports = StockData;
