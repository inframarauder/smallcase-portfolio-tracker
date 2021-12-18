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

//returns trade objects from the database grouped by security ticker
exports.findTradesBySecurityTicker = () => {
	//using $group operator in aggregation pipeline
	return new Promise((resolve, reject) => {
		Trade.aggregate([
			{
				$group: {
					_id: "$securityTicker",
					trades: { $push: "$$ROOT" },
				},
			},
		])
			.then((trades) => resolve(trades))
			.catch((error) => reject(error));
	});
};

//returns portfolio after performing aggregation
exports.getPortfolio = () => {
	return new Promise((resolve, reject) => {
		Trade.aggregate([
			{
				$group: {
					_id: "$securityTicker",
					//final no. of shares = (no. of shares bought) - (no. shares sold)
					totalQty: {
						$sum: {
							$cond: [
								{ $eq: ["$type", "buy"] },
								"$qty",
								{ $multiply: ["$qty", -1] },
							],
						},
					},

					//total buy price = sum(price[ticker] * qty[ticker]) for buy trades
					totalBuyPrice: {
						$sum: {
							$cond: [
								{ $eq: ["$type", "buy"] },
								{ $multiply: ["$price", "$qty"] },
								0,
							],
						},
					},

					//total qty bought = sum(qty[ticker]) for buy trades
					totalQtyBought: {
						$sum: {
							$cond: [{ $eq: ["$type", "buy"] }, "$qty", 0],
						},
					},
				},
			},
			{
				$project: {
					_id: 1,
					totalQty: 1,
					//avg buy price = (total buy price) / (total qty bought)
					avgBuyPrice: {
						$divide: ["$totalBuyPrice", "$totalQtyBought"],
					},
				},
			},
		])
			.then((portfolio) => resolve(portfolio))
			.catch((error) => reject(error));
	});
};
