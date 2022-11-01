const mongoose = require('mongoose');
const surveySchema = require('./Survey');

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  token: { type: String },
  surveys: [ surveySchema ]
});

// database automaticlly create colection taking name user and add s
module.exports = mongoose.model('User', userSchema);