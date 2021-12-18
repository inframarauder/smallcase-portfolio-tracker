const Trade = require("../models/trade.model");

//creates a new Trade object and saves it to the database
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

//finds and updates a Trade object in the database
exports.updateTrade = (tradeId, update) => {
	return new Promise((resolve, reject) => {
		//using 'runValidators' flag to ensure validation rules are followed while updating
		Trade.findByIdAndUpdate(tradeId, update, { new: true, runValidators: true })
			.then((trade) => {
				resolve(trade);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

//finds and deletes a Trade object in the database
exports.deleteTrade = (tradeId) => {
	return new Promise((resolve, reject) => {
		Trade.findByIdAndDelete(tradeId)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};

//finds all trade objects in the database based on query
exports.findTrades = (query = {}) => {
	return new Promise((resolve, reject) => {
		Trade.find(query)
			.lean()
			.then((trades) => {
				resolve(trades);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
