const express = require('express');
const Survey = require('../../model/survey');

const router = express.Router();

// router.get('/', (req, res) => {
//   const surverys = Survey.fin
// });

router.post('/', (req, res) => {
  const {name, img} = req.body;
  const {user_id} = req.user;
  res.status(200).send(`${name} ${img} ${user_id}`);
});

module.exports = router;