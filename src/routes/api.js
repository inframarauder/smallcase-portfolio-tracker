const router = require("express").Router();
const { addTrade } = require("../controllers/trade.controller");
const errorHandler = require("../middlewares/errorHandler");

router.post("/trades", addTrade);

//error handling for all routes
router.use(errorHandler);

module.exports = router;
