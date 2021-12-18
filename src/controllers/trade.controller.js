const { createTrade } = require("../services/trade.service");

exports.addTrade = async (req, res, next) => {
	try {
		const trade = await createTrade(req.body);
		return res.status(201).json({ message: "Trade added!", trade });
	} catch (error) {
		next(error);
	}
};
