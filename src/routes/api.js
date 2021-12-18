const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.get("/trades", (req, res) => {
	res.send("works");
});

//error handling for all routes
router.use(errorHandler);

module.exports = router;
