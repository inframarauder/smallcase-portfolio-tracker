const {
	createTrade,
	getTradeById,
	updateTrade,
	deleteTrade,
	findTradesBySecurityTicker,
	countQtyBySecurity,
	getPortfolio,
} = require("../services/trade.service");
const { BadRequest } = require("../utils/error");

exports.addTrade = async (req, res, next) => {
	try {
		//for sell trade, check if the required no. of shares are present
		const { type, securityTicker, qty } = req.body;
		if (type && securityTicker && qty && type === "sell") {
			const count = await countQtyBySecurity(securityTicker);
			if (count < qty) {
				throw new BadRequest("Insufficient no. of shares in portfolio");
			}
		}
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
		const allowedUpdates = ["type", "price", "qty", "securityTicker"];
		let update = {};
		Object.keys(req.body).forEach((key) => {
			if (allowedUpdates.includes(key)) {
				update[key] = req.body[key];
			} else {
				throw new BadRequest(`Invalid update field: ${key}`);
			}
		});
		//for sell trade, check if required no. of shares are present
		const { type, qty } = req.body;
		if (type && qty && type === "sell") {
			const trade = await getTradeById(req.params.tradeId);
			const count = await countQtyBySecurity(trade.securityTicker);
			if (count < qty) {
				throw new BadRequest("Insufficient no. of shares in portfolio");
			}
		}

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

exports.fetchTrades = async (req, res, next) => {
	try {
		//fetching trades grouped by security ticker
		const groupedTrades = await findTradesBySecurityTicker();
		return res.status(200).json({ groupedTrades });
	} catch (error) {
		next(error);
	}
};

exports.fetchPortfolio = async (req, res, next) => {
	try {
		//performing aggregation and returning portfolio
		const portfolio = await getPortfolio();
		return res.status(200).json({ portfolio });
	} catch (error) {
		next(error);
	}
};

exports.fetchCumulativeReturns = async (req, res, next) => {
	try {
		const portfolio = await getPortfolio();
		let cumulativeReturn = 0;
		let currentPrice = 100; //setting this as per assignment guidelines

		//calculating cumulative returns across portfolio
		portfolio.forEach((security) => {
			cumulativeReturn +=
				(currentPrice - security.avgBuyPrice) * security.totalQty;
		});
		return res.status(200).json({ cumulativeReturn });
	} catch (error) {
		next(error);
	}
};
