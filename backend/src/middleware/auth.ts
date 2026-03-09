// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

export interface AuthRequest extends Request {
  userId?: string
  userTier?: string
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: 'Not authorised — no token' })
      return
    }

    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET

    if (!secret) {
      res.status(500).json({ success: false, error: 'Server misconfiguration' })
      return
    }

    const decoded = jwt.verify(token, secret) as { userId: string }
    const user = await User.findById(decoded.userId).select('_id tier isVerified')

    if (!user) {
      res.status(401).json({ success: false, error: 'User not found' })
      return
    }

    if (!user.isVerified) {
      res.status(401).json({ success: false, error: 'Phone number not verified' })
      return
    }

    req.userId   = String(user._id)
    req.userTier = user.tier
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}

// Tier gate — restrict routes to paid users or specific tiers
export function requireTier(...tiers: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.userTier || !tiers.includes(req.userTier)) {
      res.status(403).json({
        success: false,
        error: `This feature requires one of these plans: ${tiers.join(', ')}`,
      })
      return
    }
    next()
  }
}
