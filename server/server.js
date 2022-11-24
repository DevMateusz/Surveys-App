require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// connect to mongodb
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb',extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// server static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/api/answers', auth, require('./routes/api/answers'));
app.use('/api/surveys', auth, require('./routes/api/surveys'));
app.use('/api/dashboard', auth, require('./routes/api/dashboard'));
app.use('/api/guest_survey', require('./routes/api/publicSurveys'));
app.use('/api/images', express.static(path.join(__dirname, 'public', 'images')));

app.all('*', (req ,res) => {
    res.status(404);
    res.json({ error: "404 Not Found" })
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
