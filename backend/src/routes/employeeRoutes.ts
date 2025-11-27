import express from 'express';
import multer from 'multer';
import { importEmployees, getEmployees } from '../controllers/employeeController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), importEmployees);
router.get('/', getEmployees);

export default router;
