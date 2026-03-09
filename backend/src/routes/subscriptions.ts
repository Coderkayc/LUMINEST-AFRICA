// backend/src/routes/subscriptions.ts
import { Router } from 'express'
import {
  initiateSubscription,
  verifySubscription,
  getCurrentSubscription,
  cancelSubscription,
} from '../controllers/subscriptionsController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect)

router.post('/initiate', initiateSubscription)
router.post('/verify',   verifySubscription)
router.get('/current',   getCurrentSubscription)
router.post('/cancel',   cancelSubscription)

export default router
