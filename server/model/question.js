const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, require: true },
  question: { type: String, require: true },
  description: String,
  data: {
    options: [
      { text: { type: String, require: true }}
    ]
  },
});

// database automaticlly create colection taking name user and add s
module.exports = questionSchema;