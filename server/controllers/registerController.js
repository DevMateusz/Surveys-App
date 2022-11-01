const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
  try{
    const
      name = req.body.name,
      email = req.body.email.toLowerCase(), 
      password = req.body.password, 
      password_confirmation = req.body.password_confirmation;

    if(!(name && email && password && password_confirmation)) {
      return res.status(400).json({"message": "All input is required"});
    }

    if(password !== password_confirmation){
      return res.status(409).json({"message": "password are not the same"});
    }

    const userExist = await User.findOne({ email });

    if(userExist) {
      return res.status(409).json({"message": "User already exist"});
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email,
      password: encryptedPassword,
    });
    
    const token = jwt.sign({id: newUser._id, email}, process.env.TOKEN_KEY, {expiresIn: '2h'});

    newUser.token = token;

    res.status(201).json(newUser);
  } catch(err) {
    console.log(err);
  }
}

module.exports = { handleNewUser };