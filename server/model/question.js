const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  question: { type: String, required: true },
  description: { type: String, required: true },
  data: {type: String, default: null, required: true },
  survey_id: { type: mongoose.Schema.ObjectId, ref: 'Survey', required: true }
});

// database automaticlly create colection taking name question and add s
module.exports = mongoose.model('question', questionSchema);