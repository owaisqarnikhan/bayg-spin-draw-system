const express = require('express');
const { startSpin } = require('../controllers/spinController');
const router = express.Router();

router.post('/start', startSpin);

module.exports = router;
