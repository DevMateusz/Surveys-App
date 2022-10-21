require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const auth = require('./middleware/auth');
const User = require('./model/user');
const register = require('./routes/register');
const login = require('./routes/login');

const app = express();

app.use(express.json());

// Register
app.use('/register', register);

// Login
app.use('/login', login)

// Welcome
app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome');
})


module.exports = app;