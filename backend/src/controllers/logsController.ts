// backend/src/controllers/logsController.ts
import { Response } from 'express'
import { Log, User } from '../models'
import { AuthRequest } from '../middleware/auth'

// POST /api/logs
export async function createLog(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { date, type, amount, units, liters, hoursRun, notes } = req.body

    if (!date || !type || amount === undefined) {
      res.status(400).json({ success: false, error: 'date, type and amount are required' })
      return
    }

    const log = await Log.create({
      userId: req.userId,
      date:   new Date(date),
      type, amount, units, liters, hoursRun, notes,
    })

    // Update user's totalLogs and streak
    const user = await User.findById(req.userId)
    if (user) {
      const today     = new Date(); today.setHours(0, 0, 0, 0)
      const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1)
      const lastLog   = user.lastLogDate ? new Date(user.lastLogDate) : null

      let newStreak = user.streakDays
      if (!lastLog || lastLog < yesterday) {
        newStreak = 1
      } else if (lastLog >= yesterday && lastLog < today) {
        newStreak = user.streakDays + 1
      }

      await User.findByIdAndUpdate(req.userId, {
        $inc: { totalLogs: 1 },
        lastLogDate: new Date(),
        streakDays: newStreak,
      })
    }

    res.status(201).json({ success: true, data: log })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// GET /api/logs?month=2024-06
export async function getLogs(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { month } = req.query
    let query: Record<string, unknown> = { userId: req.userId }

    if (month && typeof month === 'string') {
      const [year, monthNum] = month.split('-').map(Number)
      if (!year || !monthNum) {
        res.status(400).json({ success: false, error: 'Invalid month format. Use YYYY-MM' })
        return
      }
      const start = new Date(year, monthNum - 1, 1)
      const end   = new Date(year, monthNum, 0, 23, 59, 59)
      query = { ...query, date: { $gte: start, $lte: end } }
    }

    const logs  = await Log.find(query).sort({ date: -1 }).limit(500)
    const total = logs.reduce((sum, l) => sum + l.amount, 0)
    const byType = logs.reduce((acc, l) => {
      acc[l.type] = (acc[l.type] || 0) + l.amount
      return acc
    }, {} as Record<string, number>)

    res.json({ success: true, data: { logs, summary: { total, byType, count: logs.length } } })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// DELETE /api/logs/:id
export async function deleteLog(req: AuthRequest, res: Response): Promise<void> {
  try {
    const log = await Log.findOne({ _id: req.params.id, userId: req.userId })

    if (!log) {
      res.status(404).json({ success: false, error: 'Log not found' })
      return
    }

    await log.deleteOne()
    await User.findByIdAndUpdate(req.userId, { $inc: { totalLogs: -1 } })

    res.json({ success: true, message: 'Log deleted' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
