// backend/src/routes/auth.ts
import { Router } from 'express'
import { register, verifyOtp, getMe } from '../controllers/authController'
import { protect } from '../middleware/auth'

const router = Router()

router.post('/register',   register)
router.post('/verify-otp', verifyOtp)
router.get('/me',          protect, getMe)

export default router
