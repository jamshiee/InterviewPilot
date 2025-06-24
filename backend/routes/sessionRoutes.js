import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createSessions, deleteSession, getMySessions, getSessionById } from '../controllers/sessionController.js'

const router = express.Router()

router.post('/create',protect,createSessions)
router.get('/my-sessions',protect,getMySessions)
router.get('/:id',protect,getSessionById)
router.delete('/:id',protect,deleteSession)


export default router