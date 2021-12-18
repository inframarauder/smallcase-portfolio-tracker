const mongoose = require("mongoose");
const { BadRequest } = require("../utils/error");

const tradeSchema = new mongoose.Schema({
	type: {
		type: String,
		required: [true, "Type of trade is required"],
		enum: {
			values: ["buy", "sell"],
			message: "Type of trade must be buy or sell",
		},
		trim: true,
	},
	securityTicker: {
		type: String,
		required: [true, "Security ticker is required"],
		trim: true,
	},
	qty: {
		type: Number,
		required: [true, "Quantity is required"],
		min: [1, "Quantity must be greater than 0"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
		min: [0, "Price must be positive"],
	},
});

module.exports = mongoose.model("Trade", tradeSchema);
