const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
  }).then(() => {
    console.log('Successfully connected to database');
  }).catch((error) => {
    console.log('Database connection failed');
    console.error(error);
    process.exit(1);
  });
};