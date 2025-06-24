import express from 'express'
import { addQuestionsToSession } from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add',protect,addQuestionsToSession)

export default router