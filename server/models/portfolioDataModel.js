const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioDataSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	ticker: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	avgPrice: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
		required: false,
		immutable: true,
	},
	closed: {
		type: Boolean,
		default: false,
	},
});

const Portfolio = mongoose.model("Portfolio", portfolioDataSchema);

module.exports = Portfolio;
