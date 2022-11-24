const User =  require('../model/User');
const getArrayOfAllAnswers = require('../helper/getArrayOfAllAnswers')

const getDashboard = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  if(user.surveys.length) {
    const totalSurveys = user.surveys.length;
    const latestSurvey = user.surveys.reverse().slice(0,1)[0];
    const answers = getArrayOfAllAnswers(user)
    const totalAnswers = answers.length;
    const latestAnswers = answers.slice(0, 7);
    return res.status(200).json({"data": {totalSurveys, "latestSurvey": {...JSON.parse(JSON.stringify(latestSurvey)), "answers": latestSurvey.answers.length, "questions": latestSurvey.questions.length}, totalAnswers, latestAnswers}})  
  }
  return res.status(200).json({"data": {"totalSurveys": 0, "latestSurvey": null, "answers": 0, "questions": 0, "totalAnswers": 0, "latestAnswers": []}})  

}

module.exports = {
  getDashboard,
}



