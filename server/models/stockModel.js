const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
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
	price: {
		type: Number,
		required: true,
	},
	realisedPL: {
		type: Number,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	closed: {
		type: Boolean,
		default: false,
	},
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
