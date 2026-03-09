// backend/src/routes/metrics.ts
import { Router } from 'express'
import { getMetrics } from '../controllers/metricsController'

const router = Router()

// TODO: add admin key middleware before going to production
router.get('/', getMetrics)

export default router
