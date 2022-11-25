const mongoose = require('mongoose');
const questionSchema = require('./Question');
const answerSchema = require('./Answer');
const slug = require('slug');
const getDateWithTime = require('../helper/getDateWithTime');

const surveySchema = new mongoose.Schema({
  title: { type: String },
  slug: { type: String },
  status: { type: Boolean },
  image: { type: String },
  description: { type: String },
  created_at: { type: String, immutable: true, default: () => getDateWithTime()},
  updated_at: { type: String, default: () => getDateWithTime()},
  expire_at: { type: String },
  questions: [ questionSchema ],
  answers: [ answerSchema ]
});

surveySchema.methods.updateSlug = function() {
  this.slug = slug(this.title, "_");
}

surveySchema.methods.updateDate = function() {
  this.updated_at = getDateWithTime();
}
surveySchema.methods.deleteAnswers = function() {
  const answerNumber = this.answers.length
  this.answers = [];
  return answerNumber;
}

module.exports = surveySchema;