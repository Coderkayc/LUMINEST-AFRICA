// backend/src/routes/budget.ts
import { Router } from 'express'
import { setBudget, getBudget } from '../controllers/budgetController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect)

router.post('/',              setBudget)
router.get('/:monthYear',     getBudget)

export default router
