const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Error:", error);

    process.exit(1);
  }
}

module.exports = connectDB;
