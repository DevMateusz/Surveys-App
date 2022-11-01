const express = require('express');
const router = express.Router();
const registerControler = require('../controllers/registerController');

router.post('/', registerControler.handleNewUser);

module.exports = router;