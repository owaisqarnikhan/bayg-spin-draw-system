import express from 'express';
import { startSpin } from '../controllers/spinController';

const router = express.Router();

router.post('/start', startSpin);

export default router;
