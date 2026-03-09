// backend/src/controllers/subscriptionsController.ts
import { Response } from 'express'
import axios from 'axios'
import { Subscription, User } from '../models'
import { AuthRequest } from '../middleware/auth'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || ''

// Prices in Naira — labelled as placeholders, adjust after market testing
const TIER_PRICES: Record<string, { monthly: number; annual: number }> = {
  saver:    { monthly: 800,  annual: 7500  },
  pro:      { monthly: 1800, annual: 16000 },
  property: { monthly: 4500, annual: 40000 },
}

// POST /api/subscriptions/initiate
export async function initiateSubscription(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { tier, billingCycle = 'monthly' } = req.body

    if (!tier || !TIER_PRICES[tier]) {
      res.status(400).json({ success: false, error: 'Invalid tier. Choose: saver, pro, or property' })
      return
    }

    const user = await User.findById(req.userId).select('phone name')
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }

    const amountNaira = TIER_PRICES[tier][billingCycle as 'monthly' | 'annual']
    const amountKobo  = amountNaira * 100 // Paystack uses kobo

    // Initiate Paystack transaction
    const paystackRes = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email:    `${user.phone}@luminest.africa`, // virtual email for Paystack
        amount:   amountKobo,
        channels: ['card', 'bank_transfer', 'ussd'],
        metadata: {
          userId:       String(req.userId),
          tier,
          billingCycle,
          phone:        user.phone,
          custom_fields: [
            { display_name: 'Plan',  variable_name: 'plan',         value: tier },
            { display_name: 'Cycle', variable_name: 'billing_cycle', value: billingCycle },
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscription/callback`,
      },
      {
        headers: {
          Authorization:  `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.json({
      success: true,
      data: {
        authorizationUrl: paystackRes.data.data.authorization_url,
        reference:        paystackRes.data.data.reference,
        amount:           amountNaira,
        tier,
        billingCycle,
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// POST /api/subscriptions/verify
export async function verifySubscription(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { reference } = req.body
    if (!reference) {
      res.status(400).json({ success: false, error: 'Paystack reference is required' })
      return
    }

    // Verify with Paystack
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    )

    const txn = paystackRes.data.data
    if (txn.status !== 'success') {
      res.status(400).json({ success: false, error: 'Payment not successful' })
      return
    }

    const { userId, tier, billingCycle } = txn.metadata
    const amountNaira = txn.amount / 100

    // Cancel any existing active subscription
    await Subscription.updateMany({ userId, status: 'active' }, { $set: { status: 'cancelled' } })

    const now     = new Date()
    const endDate = billingCycle === 'annual'
      ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
      : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())

    const sub = await Subscription.create({
      userId,
      tier,
      status:        'active',
      billingCycle,
      startDate:     now,
      endDate,
      paymentMethod: txn.channel,
      paystackRef:   reference,
      amount:        amountNaira,
    })

    await User.findByIdAndUpdate(userId, { tier })

    res.json({ success: true, message: 'Subscription activated!', data: sub })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// GET /api/subscriptions/current
export async function getCurrentSubscription(req: AuthRequest, res: Response): Promise<void> {
  try {
    const sub = await Subscription.findOne({ userId: req.userId, status: 'active' }).sort({ createdAt: -1 })
    res.json({ success: true, data: sub })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}

// POST /api/subscriptions/cancel
export async function cancelSubscription(req: AuthRequest, res: Response): Promise<void> {
  try {
    const sub = await Subscription.findOne({ userId: req.userId, status: 'active' })
    if (!sub) {
      res.status(404).json({ success: false, error: 'No active subscription found' })
      return
    }

    sub.status = 'cancelled'
    await sub.save()

    await User.findByIdAndUpdate(req.userId, { tier: 'free' })

    res.json({ success: true, message: 'Subscription cancelled. You will retain access until end of billing period.' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ success: false, error: message })
  }
}
