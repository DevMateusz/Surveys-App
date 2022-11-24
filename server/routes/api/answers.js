const express = require('express');
const router = express.Router();
const answersControler = require('../../controllers/answersController');

router.route('/')
  .get(answersControler.getAllShowcaseAnswers)

router.route('/:sid/:aid') // sid - surveyID  aid - auestionID
  .get(answersControler.getAnswer)
  .delete(answersControler.deleteAnswer);

module.exports = router;