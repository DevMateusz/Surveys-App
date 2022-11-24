const getArrayOfAllAnswers = (user) => {
  let answers = [];
  user.surveys.forEach((survey) => {
    survey.answers.forEach((answer) => {
      delete answer.answers
      const {created_at, _id} = JSON.parse(JSON.stringify(answer))
      answers.push({created_at, "answerId": _id, "surveyId": survey._id, "surveyTitle": survey.title})
    })
  })
  answers.sort(function(a,b) {
    return new Date(b.created_at) - new Date (a.created_at);
  })
  return answers;
}

module.exports = getArrayOfAllAnswers;