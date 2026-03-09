// backend/src/controllers/dashboardController.ts
import { Response } from 'express'
import { Log, Budget, User } from '../models'
import { AuthRequest } from '../middleware/auth'

// GET /api/dashboard
export async function getDashboard(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.userId!
    const now    = new Date()
    const year   = now.getFullYear()
    const month  = now.getMonth()

    const thisMonthStart = new Date(year, month, 1)
    const thisMonthEnd   = new Date(year, month + 1, 0, 23, 59, 59)
    const lastMonthStart = new Date(year, month - 1, 1)
    const lastMonthEnd   = new Date(year, month, 0, 23, 59, 59)

    const monthYear = `${year}-${String(month + 1).padStart(2, '0')}`

    const [thisMonthLogs, lastMonthLogs, budget, user] = await Promise.all([
      Log.find({ userId, date: { $gte: thisMonthStart, $lte: thisMonthEnd } }),
      Log.find({ userId, date: { $gte: lastMonthStart, $lte: lastMonthEnd } }),
      Budget.findOne({ userId, monthYear }),
      User.findById(userId).select('streakDays totalLogs'),
    ])

    const thisTotal = thisMonthLogs.reduce((s, l) => s + l.amount, 0)
    const lastTotal = lastMonthLogs.reduce((s, l) => s + l.amount, 0)

    const percentChange = lastTotal > 0
      ? Math.round(((thisTotal - lastTotal) / lastTotal) * 100) : 0

    const daysElapsed   = now.getDate()
    const weeksElapsed  = Math.max(1, daysElapsed / 7)
    const weeklyAverage = Math.round(thisTotal / weeksElapsed)

    const budgetTarget = budget?.targetAmount ?? 0
    const budgetUsed   = budgetTarget > 0 ? Math.round((thisTotal / budgetTarget) * 100) : 0

    // Spend by type
    const spendByType = thisMonthLogs.reduce((acc, l) => {
      acc[l.type] = (acc[l.type] || 0) + l.amount; return acc
    }, {} as Record<string, number>)

    const topCategory = Object.entries(spendByType).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'none'

    // Weekly trend (last 8 weeks)
    const weeklyTrend: { week: string; amount: number }[] = []
    for (let w = 7; w >= 0; w--) {
      const weekStart = new Date(now); weekStart.setDate(now.getDate() - w * 7 - 6); weekStart.setHours(0,0,0,0)
      const weekEnd   = new Date(now); weekEnd.setDate(now.getDate() - w * 7);       weekEnd.setHours(23,59,59,999)

      const weekLogs  = await Log.find({ userId, date: { $gte: weekStart, $lte: weekEnd } })
      const weekTotal = weekLogs.reduce((s, l) => s + l.amount, 0)

      weeklyTrend.push({
        week:   weekStart.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }),
        amount: weekTotal,
      })
    }

    // Smart insight
    let insight: string
    if      (percentChange < -10) insight = `You're spending ${Math.abs(percentChange)}% less than last month. Keep it up!`
    else if (percentChange >  20) insight = `Your spend is up ${percentChange}% vs last month. Check your generator logs.`
    else if (budgetUsed    >  90) insight = `You're at ${budgetUsed}% of your monthly budget — slow down.`
    else if (thisMonthLogs.length === 0) insight = `Log your first entry to see your electricity spend pattern.`
    else    insight = `You've logged ${thisMonthLogs.length} entries this month. Great tracking!`

    res.json({
      success: true,
      data: {
        totalSpendThisMonth: thisTotal,
        totalSpendLastMonth: lastTotal,
        percentChange,
        weeklyAverage,
        budgetUsed,
        budgetTarget,
        logCount:     thisMonthLogs.length,
        streakDays:   user?.streakDays ?? 0,
        topCategory,
        insight,
        spendByType,
        weeklyTrend,
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
