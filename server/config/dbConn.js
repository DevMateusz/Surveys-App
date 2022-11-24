const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Database connection attempt...');
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch(err) {
    console.error(err);
    console.log("Retry connection in 10 seconds");
    setTimeout(connectDB, 10000);
  }
}

module.exports = connectDB;