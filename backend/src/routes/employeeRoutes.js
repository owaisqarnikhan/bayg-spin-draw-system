const express = require('express');
const multer = require('multer');
const { importEmployees, getEmployees } = require('../controllers/employeeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), importEmployees);
router.get('/', getEmployees);

module.exports = router;
