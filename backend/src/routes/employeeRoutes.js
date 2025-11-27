const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { importEmployees, getEmployees, deleteEmployee, deleteAllEmployees } = require('../controllers/employeeController');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer with file size limits and file type validation
const upload = multer({
    dest: uploadsDir,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'));
        }
    }
});

// Routes
router.post('/import', upload.single('file'), importEmployees);
router.get('/', getEmployees);
router.delete('/:id', deleteEmployee);
router.delete('/', deleteAllEmployees);

module.exports = router;
