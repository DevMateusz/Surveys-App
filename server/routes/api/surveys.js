const express = require('express');
const router = express.Router();
const surveysControler = require('../../controllers/surveysController');

router.route('/')
  .get(surveysControler.getAllShowcaseSurveys)
  .post(surveysControler.createNewSurvey)
  .put(surveysControler.updateSurvey)
  .delete(surveysControler.deleteSurvey);

router.route('/:id')
  .get(surveysControler.getSurvey);

module.exports = router;