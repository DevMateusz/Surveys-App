const mongoose = require('mongoose');
const questionSchema = require('./Question');
const slug = require('slug');

const surveySchema = new mongoose.Schema({
  title: { type: String, require: true },
  slug: { type: String, default: function() {return slug(this.title, "_")} },
  status: { type: String },
  image: { type: String },
  description: { type: String },
  created_at: { type: Date, immutable: true, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
  expire_at: { type: Date },
  questions: [ questionSchema ]
});

surveySchema.methods.updateSlug = function() {
  this.slug = slug(this.title, "_");
}

surveySchema.methods.updateDate = function() {
  this.updated_at = Date.now();
}

// database automaticlly create colection taking name user and add s
module.exports = surveySchema;