const { createTrade, updateTrade } = require("../services/trade.service");

exports.addTrade = async (req, res, next) => {
	try {
		const trade = await createTrade(req.body);
		return res.status(201).json({ message: "Trade added!", trade });
	} catch (error) {
		next(error);
	}
};

exports.modifyTrade = async (req, res, next) => {
	try {
		const trade = await updateTrade(req.params.tradeId, req.body);
		return res.status(200).json({ message: "Trade modified!", trade });
	} catch (error) {
		next(error);
	}
};
