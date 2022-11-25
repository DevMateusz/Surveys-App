const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  _id: false,
  id: { type: String },
  type: { type: String},
  question: { type: String},
  description: String,
  data: {
    options: [
      { text: { type: String }, _id: false}
    ]
  },
});

module.exports = questionSchema;