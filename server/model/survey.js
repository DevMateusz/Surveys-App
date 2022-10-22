const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  status: { type: Number, integer:true, required: true },
  description: { type: String, required: true, default: null },
  created_date: {type: Date, default: Date.now },
  expire_date: {type: Date, default: null },
});

// database automaticlly create colection taking name survey and add s
module.exports = mongoose.model('survey', surveySchema);