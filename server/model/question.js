const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: String,
  question: String,
  description: String,
  data: {
    options: [
      { text: String}
    ]
  },
});

// database automaticlly create colection taking name user and add s
module.exports = questionSchema;