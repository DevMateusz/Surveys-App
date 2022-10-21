const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  token: {type: String},
});

// database automaticlly create colection taking name survey and add s
module.exports = mongoose.model('survey', surveySchema);