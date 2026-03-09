// backend/src/controllers/metricsController.ts
import { Request, Response } from 'express'
import { User, Log, Subscription } from '../models'

// GET /api/metrics  (internal — protect with an admin key in production)
export async function getMetrics(_req: Request, res: Response): Promise<void> {
  try {
    const now           = new Date()
    const sevenDaysAgo  = new Date(now.getTime() -  7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalUsers,
      newUsersThisWeek,
      activeLoggerIds7d,
      activeLoggerIds30d,
      paidSubs,
      totalLogs,
      logsThisWeek,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Log.distinct('userId', { createdAt: { $gte: sevenDaysAgo } }),
      Log.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }),
      Subscription.countDocuments({ status: 'active' }),
      Log.countDocuments(),
      Log.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    ])

    const wal = activeLoggerIds7d.length // Weekly Active Loggers — North Star

    const signupToFirstLog30d  = totalUsers > 0 ? ((activeLoggerIds30d.length / totalUsers) * 100).toFixed(1) : '0'
    const freeToPaidConversion = totalUsers > 0 ? ((paidSubs / totalUsers) * 100).toFixed(1) : '0'

    res.json({
      success: true,
      data: {
        northStar: {
          metric: 'Weekly Active Loggers (WAL)',
          value:  wal,
          target: '2000 by Month 6 (assumption)',
        },
        totals: {
          users:     totalUsers,
          paidUsers: paidSubs,
          logs:      totalLogs,
        },
        thisWeek: {
          newSignups:   newUsersThisWeek,
          logsCreated:  logsThisWeek,
          wal,
        },
        funnel: {
          signupToFirstLog30d:  `${signupToFirstLog30d}%`,
          freeToPaidConversion: `${freeToPaidConversion}%`,
        },
        generatedAt: now.toISOString(),
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
