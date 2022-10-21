const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async(req, res) => {
  try {
    const 
      email = req.body.email.toLowerCase(),
      password = req.body.password;
    
    if(!(email && password)) {
      return res.status(200).send('All input is required');
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({user_id: user._id, email}, process.env.TOKEN_KEY, {expiresIn: '2h'});

      user.token = token;

      return res.status(200).json(user);
    };
    return res.status(400).send('Invalid Credentials');
  } catch(err) {
    return console.log(err);
  }
});

module.exports = router;