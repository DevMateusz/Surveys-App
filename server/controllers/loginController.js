const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUserToAccount = async(req, res) => {
  try {
    const 
      email = req.body.email.toLowerCase(),
      password = req.body.password;
    
    if(!(email && password)) {
      return res.status(200).json({"message": "all input is required"});
    }
    
    let user = await User.findOne({ email }, { _id: 1, name: 1, email: 1, password: 1});

    if(user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({id: user._id, email}, process.env.TOKEN_KEY, {expiresIn: '2h'});
      
      user.token = token;

      return res.status(200).json(user);
    };
    return res.status(422).json({"message": "invalid credentials"});
  } catch(err) {
    return console.log(err);
  }
}

module.exports = { loginUserToAccount };