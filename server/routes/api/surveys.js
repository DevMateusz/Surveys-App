const express = require('express');
const router = express.Router();
const surveysControler = require('../../controllers/surveysController');

router.route('/')
  .get(surveysControler.getAllShowcaseSurveys)
  .post(surveysControler.createNewSurvey);
  

router.route('/:id')
  .get(surveysControler.getSurvey)
  .put(surveysControler.updateSurvey)
  .delete(surveysControler.deleteSurvey);

module.exports = router;