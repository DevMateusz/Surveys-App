require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const User = require('./model/user');
const { db } = require('./model/user');

// Register
app.post('/register', async (req, res) => {
  try{
    const
      name = req.body.name,
      email = req.body.email.toLowerCase(), 
      password = req.body.password, 
      confirmation_password = req.body.confirmation_password

    if(!(name && email && password && confirmation_password)) {
      res.status(400).send('All input is required');
    }

    if(password !== confirmation_password){
      res.status(409).send('password are not the same');
    }

    const userExist = await User.findOne({ email });

    if(userExist) {
      return res.status(409).send('User already exist');
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email,
      password: encryptedPassword,
    });

    const token = jwt.sign({user_id: user._id, email}, process.env.TOKEN_KEY, {expiresIn: '2h'});

    user.token = token;

    res.status(201).json(user);
  } catch(err) {
    console.log(err);
  }

})

// Login
app.post('/login', async(req, res) => {
  
})

module.exports = app;