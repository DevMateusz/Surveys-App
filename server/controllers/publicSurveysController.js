const User =  require('../model/User');
const isSurveyActive = require('../helper/isSurveyActive')

const createNewAnswers = async (req, res) => {
  if(!req.body) return res.status(400).json({ "message": "answer data not entered" });

  const userId = req.params.uid;
  const surveyId = req.params.sid
  try {
    const user = await User.findOne({ _id: userId });
    const survey = user.surveys.id(surveyId);
    await survey.answers.push(req.body);
    await user.save();
    res.status(201).json({ "message": "answer was created" })
  } catch (err) {
    console.error(err.message);
  }
}

const getSurvey = async (req, res) => {
  if(!req.params.id || !req.params.slug) return res.status(400).json({ "message": "User id and survey slug is required" });
  const id = req.params.id;
  const slug = req.params.slug;

  const user = await User.findOne({ _id: id });

  const survey = user.surveys.find((survey) => survey.slug === slug);
  if(!survey) res.status(404).json({ "message": "Survey does not exist" });
  if( !isSurveyActive(survey) ) {
    return res.status(403).json({ "data": "Survey is inactive" })
  }
  if(!survey) return res.status(400).json({ "message": "Survey not found" })
  return res.status(200).json({ "data": survey })
}

module.exports = {
  createNewAnswers,
  getSurvey
}



