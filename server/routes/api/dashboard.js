const express = require('express');
const router = express.Router();
const dashboardControler = require('../../controllers/dashboardController');

router.route('/')
  .get(dashboardControler.getDashboard)

module.exports = router;