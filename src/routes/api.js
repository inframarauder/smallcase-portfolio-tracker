const router = require("express").Router();
const { addTrade, modifyTrade } = require("../controllers/trade.controller");
const errorHandler = require("../middlewares/errorHandler");

// @route   POST /api/trades
// @desc    Add a new trade
router.post("/trades", addTrade);

// @route   PUT /api/trades/:tradeId
// @desc    Update a trade
router.put("/trades/:tradeId", modifyTrade);

//error handling for all routes
router.use(errorHandler);

module.exports = router;
