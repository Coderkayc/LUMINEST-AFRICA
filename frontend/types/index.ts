// frontend/types/index.ts

// ─── GTM Plan Display Types ───────────────────────────────────────────────────

export interface Segment {
  id: number
  name: string
  description: string
  income: string
  electricitySpend: string
  pains: string[]
  triggers: string[]
  willingnessToPay: string
  channels: string[]
  objections: string[]
  priority: number
}

export interface Channel {
  channel: string
  why: string
  audience: string
  creatives: string[]
  cadence: string
}

export interface Partnership {
  name: string
  valueExchange: string
  approachScript: string
  pilotStructure: string
  priority: string
}

export interface Tier {
  name: string
  price: string
  features: string[]
  targetUser: string
}

export interface Risk {
  risk: string
  severity: string
  description: string
  mitigations: string[]
  experiment: string
}

export interface LaunchWeek {
  week: number
  phase: string
  activities: string[]
  deliverables: string[]
  owner: string
  budget: string
}

export interface FunnelMetric {
  stage: string
  metric: string
  month1_3: string
  month4_6: string
  month7_12: string
}

// ─── API Response Shape ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── User & Auth ─────────────────────────────────────────────────────────────

export interface User {
  _id: string
  phone: string
  name: string
  city: string
  powerType: 'prepaid' | 'postpaid' | 'generator' | 'mixed'
  tier: 'free' | 'saver' | 'pro' | 'property'
  referralCode: string
  streakDays: number
  totalLogs: number
  createdAt: string
}

// ─── Electricity Log ──────────────────────────────────────────────────────────

export type LogType = 'nepa_token' | 'nepa_postpaid' | 'generator_fuel' | 'solar' | 'other'

export interface ElectricityLog {
  _id: string
  userId: string
  date: string
  type: LogType
  amount: number
  units?: number
  liters?: number
  hoursRun?: number
  notes?: string
  createdAt: string
}

export interface LogCreateInput {
  date: string
  type: LogType
  amount: number
  units?: number
  liters?: number
  hoursRun?: number
  notes?: string
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardData {
  totalSpendThisMonth: number
  totalSpendLastMonth: number
  percentChange: number
  weeklyAverage: number
  budgetUsed: number
  budgetTarget: number
  logCount: number
  streakDays: number
  topCategory: string
  insight: string
  spendByType: Record<string, number>
  weeklyTrend: { week: string; amount: number }[]
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export interface Subscription {
  _id: string
  tier: 'saver' | 'pro' | 'property'
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  startDate: string
  endDate: string
  paymentMethod: 'card' | 'bank_transfer' | 'ussd'
  amount: number
}

// ─── Referral ─────────────────────────────────────────────────────────────────

export interface ReferralStats {
  referralCode: string
  referralLink: string
  totalReferrals: number
  rewardedReferrals: number
  pendingRewards: number
  totalMonthsFree: number
}
