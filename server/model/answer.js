const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  token: {type: String},
});

// database automaticlly create colection taking name answer and add s
module.exports = mongoose.model('answer', answerSchema);