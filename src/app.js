//require dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//initialize express app
const app = express();
app.use(express.json());
app.use(cors());

//root handler
app.get("/", (req, res) => {
	return res.status(200).send("OK");
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
