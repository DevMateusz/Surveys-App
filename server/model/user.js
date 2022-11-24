const mongoose = require('mongoose');
const surveySchema = require('./Survey');

const userSchema = new mongoose.Schema({
  name: { type: String, default: null, require: true  },
  email: { type: String, default: null, require: true, lowercase: true },
  password: { type: String, default: null, require: true },
  token: { type: String },
  surveys: [ surveySchema ]
});

module.exports = mongoose.model('User', userSchema);