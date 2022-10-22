require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const auth = require('./middleware/auth');
// Routes
const register = require('./routes/register');
const login = require('./routes/login');
const surveys = require('./routes/api/surveys');

const app = express();

app.use(express.json());

// Register
app.use('/register', register);

// Login
app.use('/login', login);

// Surveys
app.use('/api/surveys', auth, surveys)


module.exports = app;