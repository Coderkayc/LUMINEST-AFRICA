// backend/src/routes/logs.ts
import { Router } from 'express'
import { createLog, getLogs, deleteLog } from '../controllers/logsController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect) // all log routes require auth

router.post('/',     createLog)
router.get('/',      getLogs)
router.delete('/:id', deleteLog)

export default router
