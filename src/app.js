//require dependencies & modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const api = require("./routes/api");

//initialize express app
const app = express();
app.use(express.json());
app.use(cors());

//connect database
db.connectDb();

//root handler
app.get("/", (req, res) => {
	return res.status(200).send("OK");
});

//configure api routes
app.use("/api", api);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
