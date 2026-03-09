// backend/src/controllers/referralsController.ts
import { Response } from 'express'
import { User, Referral } from '../models'
import { AuthRequest } from '../middleware/auth'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// GET /api/referrals/my-code
export async function getMyCode(req: AuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select('referralCode')
    if (!user) { res.status(404).json({ success: false, error: 'User not found' }); return }

    res.json({
      success: true,
      data: {
        referralCode: user.referralCode,
        referralLink: `${APP_URL}/join?ref=${user.referralCode}`,
        whatsappMessage: encodeURIComponent(
          `I've been tracking my electricity spend with LUMINEST AFRICA and it's already saving me money! Join with my link and we both get 1 month free: ${APP_URL}/join?ref=${user.referralCode}`
        ),
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// GET /api/referrals/stats
export async function getReferralStats(req: AuthRequest, res: Response): Promise<void> {
  try {
    const referrals = await Referral.find({ referrerUserId: req.userId })

    const total    = referrals.length
    const rewarded = referrals.filter(r => r.status === 'rewarded').length
    const pending  = referrals.filter(r => r.status === 'pending').length
    const monthsFree = rewarded // 1 month free per successful referral

    res.json({
      success: true,
      data: {
        totalReferrals:   total,
        rewardedReferrals: rewarded,
        pendingReferrals:  pending,
        totalMonthsFree:   monthsFree,
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
