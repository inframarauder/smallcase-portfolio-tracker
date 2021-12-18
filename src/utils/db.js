const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error("Error in connecting to database", error);
	}
};

module.exports = { connectDb };
