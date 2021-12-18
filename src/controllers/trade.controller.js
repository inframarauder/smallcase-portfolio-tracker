const {
	createTrade,
	updateTrade,
	deleteTrade,
} = require("../services/trade.service");
const { BadRequest } = require("../utils/error");

exports.addTrade = async (req, res, next) => {
	try {
		//creating new trade
		const trade = await createTrade(req.body);
		return res.status(201).json({ message: "Trade added!", trade });
	} catch (error) {
		next(error);
	}
};

exports.modifyTrade = async (req, res, next) => {
	try {
		//extracting updateable fields
		const allowedUpdates = ["type", "avgBuyPrice", "qty", "securityTicker"];
		let update = {};
		Object.keys(req.body).forEach((key) => {
			if (allowedUpdates.includes(key)) {
				update[key] = req.body[key];
			} else {
				throw new BadRequest(`Invalid update field: ${key}`);
			}
		});

		//updating trade
		const trade = await updateTrade(req.params.tradeId, update);
		return res.status(200).json({ message: "Trade updated!", trade });
	} catch (error) {
		next(error);
	}
};

exports.removeTrade = async (req, res, next) => {
	try {
		//deleting trade
		await deleteTrade(req.params.tradeId);
		return res.status(200).json({ message: "Trade deleted!" });
	} catch (error) {
		next(error);
	}
};
