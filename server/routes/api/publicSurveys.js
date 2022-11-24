const express = require('express');
const router = express.Router();
const publicSurveysControler = require('../../controllers/publicSurveysController');

router.route('/:id/:slug')
  .get(publicSurveysControler.getSurvey)

router.route('/:uid/:sid')
  .post(publicSurveysControler.createNewAnswers);


module.exports = router;