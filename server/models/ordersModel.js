const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
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
	orderType: {
		type: String,
		required: true,
	},
	orderAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ["open", "executed", "pending"],
	},
	executedPrice: {
		type: Number,
		required: false,
	},
	executedAt: {
		type: Date,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		required: false,
		immutable: true,
	},
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
