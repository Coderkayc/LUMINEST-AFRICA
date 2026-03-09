// backend/src/routes/referrals.ts
import { Router } from 'express'
import { getMyCode, getReferralStats } from '../controllers/referralsController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect)

router.get('/my-code', getMyCode)
router.get('/stats',   getReferralStats)

export default router
