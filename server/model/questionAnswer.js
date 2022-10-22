const mongoose = require('mongoose');

const questionAnswerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.ObjectId, ref: 'Question', required: true },
  answer_id: { type: mongoose.Schema.ObjectId, ref: 'Answer', required: true },
  answer: { type: String, required: true },
});

// database automaticlly create colection taking name questionAnswer and add s
module.exports = mongoose.model('questionAnswer', questionAnswerSchema);