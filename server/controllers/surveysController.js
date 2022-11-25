const User =  require('../model/User');
const fs = require('fs');
const path = require('path');
const slug = require('slug');

function saveImage(baseImage) {
  const localPath = path.join(__dirname, '..', 'public', 'images')
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
  const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
  const base64Data = baseImage.replace(regex, "");
  const rand = Math.ceil(Math.random()*1000);
  const filename = `img_${Date.now()}_${rand}.${ext}`;
  const fileURL = `${process.env.API_BASE_URL}/api/images/${filename}`

  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath, {recursive: true}, err =>{});
  }
  fs.writeFileSync(path.join(localPath, filename), base64Data, 'base64');
  return fileURL;
}

function deleteImage(imageURL) {
  
  const nameImage = imageURL.replace(`${process.env.API_BASE_URL}/api/images/`, '');
  const imagePath = path.join(__dirname, '..', 'public', 'images', nameImage);
  if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
  }
  return;
}

const getAllShowcaseSurveys = async (req, res) => {
  const id = req.user.id;
  const surveys = (await User.findOne({ _id: id }).select('surveys._id surveys.title surveys.slug surveys.status surveys.image surveys.description surveys.expire_at')).surveys;
  if(!surveys) return req.status(204).json({ "message": "no surveys found" });
  res.status(200).json({ "data": surveys })
}

const createNewSurvey = async (req, res) => {
  if(!req.body) return res.status(400).json({ "message": "survey data not entered" });
  if(req.body.image) {
    req.body.image = saveImage(req.body.image)
  }

  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });
    req.body.slug = slug(req.body.title, "_");
    await user.surveys.push(req.body);
    await user.save();
    const newSurvey = user.surveys.reverse().slice(0,1)[0]
    res.status(200).json( newSurvey )
  } catch (err) {
    console.error(err.message);
  }
}

const updateSurvey = async (req, res) => {
  if(!req.params.id) return res.status(400).json({ "message": "survey id is required" });
  if(!req.body) return res.status(400).json({ "message": "survey data is required" });


  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id });
    const survey = user.surveys.id(req.params.id);
    if(req.body.image?.includes("base64")) {
      req.body.image = await saveImage(req.body.image)
      if(survey.image) {
        deleteImage(survey.image);
      }
    }
    await survey.set(req.body);
    survey.updateSlug()
    survey.updateDate()
    await user.save();
    res.status(200).json( survey )
  } catch (err) {
    console.error(err.message)
  }
}

const deleteSurvey = async (req, res) => {
  if(!req.params.id) return res.status(400).json({ "message": "survey id is required" });
  const id = req.user.id;
  const user = await User.findOne({ _id: id });
  const survey = await user.surveys.id(req.params.id);
  if(survey.image) {
    deleteImage(survey.image);
  }
  await survey.remove();
  await user.save();
  res.status(200).json({"message": `survey with id: ${req.params.id} has been removed`})
}

const getSurvey = async (req, res) => {
  if(!req.params.id) return res.status(400).json({ "message": "survey id is required" });
  const id = req.user.id;
  const user = await User.findOne({ _id: id });

  const survey = user.surveys.id(req.params.id);
  if(!survey) return res.status(400).json({ "message": "survey not found" })
  res.status(200).json({ "data": survey })
}

module.exports = {
  getAllShowcaseSurveys,
  createNewSurvey,
  updateSurvey,
  deleteSurvey,
  getSurvey
}



