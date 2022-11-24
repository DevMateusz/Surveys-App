const mongoose = require('mongoose');
const getDateWithTime = require('../helper/getDateWithTime');

const answerSchema = new mongoose.Schema({
  created_at: { type: String, immutable: true, default: () => getDateWithTime()},
  answers: []
});

module.exports = answerSchema;