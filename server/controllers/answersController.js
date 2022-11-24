const User =  require('../model/User');
const getArrayOfAllAnswers = require('../helper/getArrayOfAllAnswers')



const getAllShowcaseAnswers = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  const answers = getArrayOfAllAnswers(user)
  if(!answers) return req.status(204).json({ "message": "no answers found" });
  res.status(200).json({ "data": answers })
}

const deleteAnswer = async (req, res) => {
  if(!req.params.sid || !req.params.aid) return res.status(400).json({ "message": "survey id and question id is required" });
  const id = req.user.id;
  const user = await User.findOne({ _id: id });
  const survey = await user.surveys.id(req.params.sid);
  survey.answers = survey.answers.filter((answer) => {
    return answer._id != req.params.aid
  })
  await user.save();
  res.status(200).json({"message": `answer with id: ${req.params.aid} has been removed`})
}

const getAnswer = async (req, res) => {
  if(!req.params.sid || !req.params.aid) return res.status(400).json({ "message": "survey id and question id is required" });
  const id = req.user.id;
  const user = await User.findOne({ _id: id });

  const survey = JSON.parse(JSON.stringify(user.surveys.id(req.params.sid)));
  if(!survey) return res.status(400).json({ "message": "survey not found" })
  
  const answer = survey.answers.find((answer)=>{
    return answer._id == req.params.aid
  })
  if(!answer) return res.status(400).json({ "message": "answer not found" })

  survey.questions.forEach((question) => {
    delete question.data
    delete question.type
    answer.answers.forEach((a) => {
      if(question.id == a.questionId){
        question.answer = a.answer
        return
      }
    })
  });

  const data = {title: survey.title, image: survey.image, description: survey.description, questions: survey.questions, _id: answer._id, created_at: answer.created_at }
  res.status(200).json({ data })
}

module.exports = {
  getAllShowcaseAnswers,
  deleteAnswer,
  getAnswer
}



