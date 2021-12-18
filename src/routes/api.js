const router = require("express").Router();

router.get("/trades", (req, res) => {
	res.send("works");
});

module.exports = router;
