// frontend/lib/api.ts
// Centralised API client — all requests go to the Express backend

import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('luminest_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { phone: string; name: string; city: string; powerType: string; referredBy?: string }) =>
    api.post('/auth/register', data),
  verifyOtp: (data: { phone: string; otp: string }) =>
    api.post('/auth/verify-otp', data),
  getMe: () => api.get('/auth/me'),
}

// ── Logs ─────────────────────────────────────────────────────────────────────
export const logsApi = {
  create: (data: {
    date: string
    type: 'nepa_token' | 'nepa_postpaid' | 'generator_fuel' | 'solar' | 'other'
    amount: number
    units?: number
    liters?: number
    hoursRun?: number
    notes?: string
  }) => api.post('/logs', data),

  getAll: (params?: { month?: string }) =>
    api.get('/logs', { params }),

  delete: (id: string) => api.delete(`/logs/${id}`),
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const dashboardApi = {
  get: () => api.get('/dashboard'),
}

// ── Budget ───────────────────────────────────────────────────────────────────
export const budgetApi = {
  set: (data: { monthYear: string; targetAmount: number; alertAt?: number }) =>
    api.post('/budget', data),
  get: (monthYear: string) => api.get(`/budget/${monthYear}`),
}

// ── Subscriptions ─────────────────────────────────────────────────────────────
export const subscriptionApi = {
  initiate: (data: { tier: string; billingCycle?: 'monthly' | 'annual' }) =>
    api.post('/subscriptions/initiate', data),
  verify: (reference: string) =>
    api.post('/subscriptions/verify', { reference }),
  getCurrent: () => api.get('/subscriptions/current'),
  cancel: () => api.post('/subscriptions/cancel'),
}

// ── Referrals ─────────────────────────────────────────────────────────────────
export const referralApi = {
  getMyCode: () => api.get('/referrals/my-code'),
  getStats:  () => api.get('/referrals/stats'),
}

// ── Metrics (internal) ───────────────────────────────────────────────────────
export const metricsApi = {
  getGTMDashboard: () => api.get('/metrics'),
}
