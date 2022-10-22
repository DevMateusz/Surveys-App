const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  survey_id: {type: mongoose.Schema.ObjectId, ref: 'Survey', required: true },
  start_date: { type: Date, default: null },
  end_date: { type: Date, default: null },

});

// database automaticlly create colection taking name answer and add s
module.exports = mongoose.model('answer', answerSchema);