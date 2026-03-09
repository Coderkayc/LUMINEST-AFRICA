// backend/src/models/index.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

// ─── User ─────────────────────────────────────────────────────────────────────
export interface IUser extends Document {
  phone: string
  name: string
  city: string
  powerType: 'prepaid' | 'postpaid' | 'generator' | 'mixed'
  tier: 'free' | 'saver' | 'pro' | 'property'
  referralCode: string
  referredBy?: string
  otpCode?: string
  otpExpiry?: Date
  isVerified: boolean
  streakDays: number
  lastLogDate?: Date
  totalLogs: number
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  phone:        { type: String, required: true, unique: true, trim: true },
  name:         { type: String, required: true, trim: true },
  city:         { type: String, required: true, default: 'Lagos', trim: true },
  powerType:    { type: String, enum: ['prepaid', 'postpaid', 'generator', 'mixed'], default: 'prepaid' },
  tier:         { type: String, enum: ['free', 'saver', 'pro', 'property'], default: 'free' },
  referralCode: { type: String, required: true, unique: true, uppercase: true },
  referredBy:   { type: String, uppercase: true },
  otpCode:      { type: String, select: false },
  otpExpiry:    { type: Date,   select: false },
  isVerified:   { type: Boolean, default: false },
  streakDays:   { type: Number, default: 0 },
  lastLogDate:  { type: Date },
  totalLogs:    { type: Number, default: 0 },
}, { timestamps: true })

UserSchema.index({ phone: 1 })
UserSchema.index({ referralCode: 1 })

// ─── Log ──────────────────────────────────────────────────────────────────────
export interface ILog extends Document {
  userId: mongoose.Types.ObjectId
  date: Date
  type: 'nepa_token' | 'nepa_postpaid' | 'generator_fuel' | 'solar' | 'other'
  amount: number
  units?: number
  liters?: number
  hoursRun?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const LogSchema = new Schema<ILog>({
  userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date:     { type: Date, required: true },
  type:     {
    type: String,
    enum: ['nepa_token', 'nepa_postpaid', 'generator_fuel', 'solar', 'other'],
    required: true,
  },
  amount:   { type: Number, required: true, min: 0 },
  units:    { type: Number, min: 0 },
  liters:   { type: Number, min: 0 },
  hoursRun: { type: Number, min: 0 },
  notes:    { type: String, trim: true, maxlength: 500 },
}, { timestamps: true })

LogSchema.index({ userId: 1, date: -1 })
LogSchema.index({ userId: 1, type: 1 })

// ─── Budget ───────────────────────────────────────────────────────────────────
export interface IBudget extends Document {
  userId: mongoose.Types.ObjectId
  monthYear: string  // "2024-06"
  targetAmount: number
  alertAt: number    // % threshold e.g. 80
  createdAt: Date
  updatedAt: Date
}

const BudgetSchema = new Schema<IBudget>({
  userId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  monthYear:    { type: String, required: true, match: /^\d{4}-\d{2}$/ },
  targetAmount: { type: Number, required: true, min: 0 },
  alertAt:      { type: Number, default: 80, min: 1, max: 100 },
}, { timestamps: true })

BudgetSchema.index({ userId: 1, monthYear: 1 }, { unique: true })

// ─── Subscription ─────────────────────────────────────────────────────────────
export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId
  tier: 'saver' | 'pro' | 'property'
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  billingCycle: 'monthly' | 'annual'
  startDate: Date
  endDate: Date
  paymentMethod: 'card' | 'bank_transfer' | 'ussd'
  paystackRef?: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId:        { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tier:          { type: String, enum: ['saver', 'pro', 'property'], required: true },
  status:        { type: String, enum: ['active', 'cancelled', 'expired', 'trial'], default: 'active' },
  billingCycle:  { type: String, enum: ['monthly', 'annual'], default: 'monthly' },
  startDate:     { type: Date, required: true },
  endDate:       { type: Date, required: true },
  paymentMethod: { type: String, enum: ['card', 'bank_transfer', 'ussd'], required: true },
  paystackRef:   { type: String },
  amount:        { type: Number, required: true },
}, { timestamps: true })

SubscriptionSchema.index({ userId: 1, status: 1 })

// ─── Referral ─────────────────────────────────────────────────────────────────
export interface IReferral extends Document {
  referrerUserId: mongoose.Types.ObjectId
  referredUserId: mongoose.Types.ObjectId
  status: 'pending' | 'rewarded'
  rewardType: 'free_month' | 'cash_credit'
  rewardValue: number
  createdAt: Date
  updatedAt: Date
}

const ReferralSchema = new Schema<IReferral>({
  referrerUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referredUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  status:         { type: String, enum: ['pending', 'rewarded'], default: 'pending' },
  rewardType:     { type: String, enum: ['free_month', 'cash_credit'], default: 'free_month' },
  rewardValue:    { type: Number, default: 1 },
}, { timestamps: true })

ReferralSchema.index({ referrerUserId: 1 })

// ─── MetricSnapshot ───────────────────────────────────────────────────────────
export interface IMetricSnapshot extends Document {
  date: Date
  totalUsers: number
  activeUsers7d: number
  activeUsers30d: number
  paidUsers: number
  totalLogs: number
  logsThisWeek: number
  newSignups: number
  churnedPaid: number
  revenue: number
}

const MetricSnapshotSchema = new Schema<IMetricSnapshot>({
  date:           { type: Date, required: true, unique: true },
  totalUsers:     { type: Number, default: 0 },
  activeUsers7d:  { type: Number, default: 0 },
  activeUsers30d: { type: Number, default: 0 },
  paidUsers:      { type: Number, default: 0 },
  totalLogs:      { type: Number, default: 0 },
  logsThisWeek:   { type: Number, default: 0 },
  newSignups:     { type: Number, default: 0 },
  churnedPaid:    { type: Number, default: 0 },
  revenue:        { type: Number, default: 0 },
})

// ─── Exports ──────────────────────────────────────────────────────────────────
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export const Log: Model<ILog> =
  mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema)

export const Budget: Model<IBudget> =
  mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema)

export const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema)

export const Referral: Model<IReferral> =
  mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema)

export const MetricSnapshot: Model<IMetricSnapshot> =
  mongoose.models.MetricSnapshot || mongoose.model<IMetricSnapshot>('MetricSnapshot', MetricSnapshotSchema)
