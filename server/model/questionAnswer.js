const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  token: {type: String},
});

// database automaticlly create colection taking name questionAnswer and add s
module.exports = mongoose.model('questionAnswer', questionAnswerSchema);