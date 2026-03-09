// backend/src/controllers/budgetController.ts
import { Response } from 'express'
import { Budget } from '../models'
import { AuthRequest } from '../middleware/auth'

// POST /api/budget
export async function setBudget(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { monthYear, targetAmount, alertAt } = req.body

    if (!monthYear || !targetAmount) {
      res.status(400).json({ success: false, error: 'monthYear and targetAmount are required' })
      return
    }

    if (!/^\d{4}-\d{2}$/.test(monthYear)) {
      res.status(400).json({ success: false, error: 'monthYear must be in YYYY-MM format' })
      return
    }

    const budget = await Budget.findOneAndUpdate(
      { userId: req.userId, monthYear },
      { targetAmount, alertAt: alertAt ?? 80 },
      { upsert: true, new: true, runValidators: true }
    )

    res.json({ success: true, data: budget })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// GET /api/budget/:monthYear
export async function getBudget(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { monthYear } = req.params
    const budget = await Budget.findOne({ userId: req.userId, monthYear })

    res.json({ success: true, data: budget ?? null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
