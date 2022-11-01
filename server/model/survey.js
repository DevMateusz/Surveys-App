const mongoose = require('mongoose');
const questionSchema = require('./Question');

const surveySchema = new mongoose.Schema({
  title: String,
  slug: String,
  status: String,
  image: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  expire_at: Date,
  questions: [ questionSchema]
});

// database automaticlly create colection taking name user and add s
module.exports = surveySchema;