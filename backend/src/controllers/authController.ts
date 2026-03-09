// backend/src/controllers/authController.ts
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { User } from '../models'
import { AuthRequest } from '../middleware/auth'

const JWT_SECRET  = process.env.JWT_SECRET  || 'dev_secret_change_me'
const JWT_EXPIRES = process.env.JWT_EXPIRES || '30d'

function generateReferralCode(): string {
  return `LUM-${crypto.randomBytes(3).toString('hex').toUpperCase()}`
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES } as jwt.SignOptions)
}

// POST /api/auth/register
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { phone, name, city, powerType, referredBy } = req.body

    if (!phone || !name) {
      res.status(400).json({ success: false, error: 'Phone and name are required' })
      return
    }

    // Check if phone already registered
    const existing = await User.findOne({ phone })
    if (existing) {
      // Re-send OTP to existing unverified user
      if (!existing.isVerified) {
        const otp       = generateOtp()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 min
        await User.findByIdAndUpdate(existing._id, { otpCode: otp, otpExpiry })

        // TODO: send OTP via WhatsApp/SMS (Twilio / WhatsApp Business API)
        console.log(`📱 OTP for ${phone}: ${otp}`) // Replace with real send

        res.json({ success: true, message: 'OTP resent. Verify your phone to continue.', data: { phone } })
        return
      }

      res.status(409).json({ success: false, error: 'Phone number already registered' })
      return
    }

    // Validate referral code if provided
    let referrerUser = null
    if (referredBy) {
      referrerUser = await User.findOne({ referralCode: referredBy.toUpperCase() })
    }

    const otp       = generateOtp()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

    const user = await User.create({
      phone,
      name,
      city:         city        || 'Lagos',
      powerType:    powerType   || 'prepaid',
      referralCode: generateReferralCode(),
      referredBy:   referrerUser ? referredBy.toUpperCase() : undefined,
      otpCode:      otp,
      otpExpiry,
    })

    // TODO: send OTP via WhatsApp/SMS
    console.log(`📱 OTP for ${phone}: ${otp}`)

    res.status(201).json({
      success: true,
      message: 'Account created. Enter the OTP sent to your phone.',
      data:    { phone, userId: user._id },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// POST /api/auth/verify-otp
export async function verifyOtp(req: Request, res: Response): Promise<void> {
  try {
    const { phone, otp } = req.body

    if (!phone || !otp) {
      res.status(400).json({ success: false, error: 'Phone and OTP are required' })
      return
    }

    const user = await User.findOne({ phone }).select('+otpCode +otpExpiry')

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }

    if (!user.otpCode || !user.otpExpiry) {
      res.status(400).json({ success: false, error: 'No OTP pending. Please register again.' })
      return
    }

    if (new Date() > user.otpExpiry) {
      res.status(400).json({ success: false, error: 'OTP expired. Please request a new one.' })
      return
    }

    if (user.otpCode !== otp) {
      res.status(400).json({ success: false, error: 'Invalid OTP' })
      return
    }

    // Mark verified and clear OTP
    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      otpCode:    undefined,
      otpExpiry:  undefined,
    })

    const token = signToken(String(user._id))

    res.json({
      success: true,
      message: 'Phone verified successfully!',
      data:    { token, user: { _id: user._id, phone: user.phone, name: user.name, tier: user.tier } },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// GET /api/auth/me
export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select('-otpCode -otpExpiry')

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }

    res.json({ success: true, data: user })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
