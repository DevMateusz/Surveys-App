const sur = {
  title: "New",
  slug: "some-super-survey",
  status: "draft",
  image: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
  description: "My name is john cena. look at my super survay. Try win prize",
  created_at: Date.now(),
  updated_at: Date.now(),
  expire_at: Date.now(),
  questions: [
    {
      type: "select",
      question: "From which country are you?",
      description: null,
      data: {
        options: [
          { text: "USA" },
          { text: "Poland" },
          { text: "Germany" },
          { text: "India" },
          { text: "What is country?" },
        ]
      },
    },
    {
      type: "checkbox",
      question: "Which language do you speak",
      description: "something something something something something something something something something something ",
      data: {
        options: [
          { text: "USA" },
          { text: "Poland" },
          { text: "Germany" },
          { text: "India" },
          { text: "What is country?" },
        ]
      },
    },
    {
      type: "text",
      question: "What is your favorite YouTube channel?",
      description: null,
      data: {},
    },
    {
      type: "textarea",
      question: "What do you think about this survey",
      description: "Write something",
      data: {},
    },
  ],
}






const User =  require('../model/User');

const getAllShowcaseSurveys = async (req, res) => {
  const id = req.user.id;
  console.log(`Current user is: ${id}`);
  const surveys = (await User.findOne({ _id: id }).select('surveys._id surveys.title surveys.slug surveys.status surveys.image surveys.description surveys.created_at')).surveys;
  if(!surveys) return req.status(204).json({ "message": "no surveys found" });
  res.status(200).json({ surveys })
}

const createNewSurvey = async (req, res) => {
  if(!req.body.surveyData) return res.status(400).json({ "message": "survey data not entered" });
  const id = req.user.id;
  console.log(`Current user is: ${id}`);
  try {
    const user = await User.findOne({ _id: id });
    await user.surveys.push(req.body.surveyData); // or { ..sur } to testing
    await user.save();
    const newSurveyId = user.surveys.reverse().slice(0,1)[0]._id
    res.status(200).json({ "id": newSurveyId })
  } catch (err) {
    console.error(err.message);
  }
}

const updateSurvey = async (req, res) => {
  if(!req.body.id) return res.status(400).json({ "message": "survey id is required" });
  if(!req.body.surveyData) return res.status(400).json({ "message": "survey data is required" });
  const id = req.user.id;
  console.log(`Current user is: ${id}`);
  try {
    const user = await User.findOne({ _id: id });
    const survey = user.surveys.id(req.body.id);
    await survey.set(req.body.surveyData);
    survey.updateSlug()
    survey.updateDate()
    await user.save();
    res.status(200).json({ "message": "survey update successful" })
  } catch (err) {
    console.error(err.message)
  }
}

const deleteSurvey = async (req, res) => {
  if(!req.body.id) return res.status(400).json({ "message": "survey id is required" });
  const id = req.user.id;
  console.log(`Current user is: ${id}`);
  const user = await User.findOne({ _id: id });

  user.surveys.pull(req.body.id);
  await user.save();
  res.status(200).json({"message": `survey with id: ${req.body.id} has been removed`})
}

const getSurvey = async (req, res) => {
  if(!req.params.id) return res.status(400).json({ "message": "survey id is required" });
  const id = req.user.id;
  console.log(`Current user is: ${id}`);
  const user = await User.findOne({ _id: id });

  const survey = user.surveys.id(req.params.id);
  if(!survey) return res.status(400).json({ "message": "survey not found" })
  res.status(200).json({ survey })
}

module.exports = {
  getAllShowcaseSurveys,
  createNewSurvey,
  updateSurvey,
  deleteSurvey,
  getSurvey
}



