const Trade = require("../models/trade.model");

exports.createTrade = (trade) => {
	return new Promise((resolve, reject) => {
		Trade.create(trade)
			.then((trade) => {
				resolve(trade);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
