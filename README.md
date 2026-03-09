# 💡 LUMINEST AFRICA — Monorepo

> **Know your light. Own your bill.**
> Nigeria's first household electricity tracking web app.

---

## Project Structure

```
luminest-africa/                     ← Monorepo root
├── package.json                     ← Workspace root (concurrently)
├── .env.example                     ← Shared env reference
├── .gitignore
│
├── frontend/                        ← Next.js 14 + TypeScript
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js               ← Proxies /api/* → backend :5000
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   │
│   ├── app/
│   │   ├── globals.css              ← Design tokens + global styles
│   │   ├── layout.tsx               ← Root layout (fonts, metadata)
│   │   └── page.tsx                 ← GTM Plan interactive dashboard
│   │
│   ├── data/
│   │   └── gtm-data.ts              ← All GTM plan content (11 sections)
│   │
│   ├── lib/
│   │   └── api.ts                   ← Axios client for all backend calls
│   │
│   └── types/
│       └── index.ts                 ← Shared TypeScript types (frontend)
│
└── backend/                         ← Express 4 + TypeScript + MongoDB
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    │
    └── src/
        ├── server.ts                ← Entry point — connects DB, starts Express
        ├── app.ts                   ← Express app setup (middleware, routes)
        │
        ├── lib/
        │   └── mongodb.ts           ← Mongoose connection (cached)
        │
        ├── models/
        │   └── index.ts             ← All Mongoose schemas & models
        │                              (User, Log, Budget, Subscription,
        │                               Referral, MetricSnapshot)
        │
        ├── middleware/
        │   └── auth.ts              ← JWT protect + requireTier guards
        │
        ├── controllers/
        │   ├── authController.ts         ← register, verifyOtp, getMe
        │   ├── logsController.ts         ← createLog, getLogs, deleteLog
        │   ├── dashboardController.ts    ← getDashboard (spend summary + insights)
        │   ├── budgetController.ts       ← setBudget, getBudget
        │   ├── subscriptionsController.ts← Paystack initiate/verify/cancel
        │   ├── referralsController.ts    ← getMyCode, getReferralStats
        │   └── metricsController.ts      ← internal GTM metrics (WAL, funnel)
        │
        └── routes/
            ├── auth.ts              → /api/auth
            ├── logs.ts              → /api/logs
            ├── dashboard.ts         → /api/dashboard
            ├── budget.ts            → /api/budget
            ├── subscriptions.ts     → /api/subscriptions
            ├── referrals.ts         → /api/referrals
            └── metrics.ts           → /api/metrics
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (or Atlas URI)

### 1. Install all dependencies
```bash
# From the monorepo root
npm install
```

### 2. Configure environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env — add MONGODB_URI, JWT_SECRET, PAYSTACK_SECRET_KEY

# Frontend
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local — add NEXT_PUBLIC_API_URL, NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
```

### 3. Run both servers together
```bash
npm run dev
# Frontend → http://localhost:3000
# Backend  → http://localhost:5000
```

### Or run separately
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

---

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Auth
| Method | Endpoint              | Auth | Description               |
|--------|-----------------------|------|---------------------------|
| POST   | /auth/register        | No   | Register with phone + name |
| POST   | /auth/verify-otp      | No   | Verify OTP, receive JWT   |
| GET    | /auth/me              | ✅   | Get current user profile  |

### Logs
| Method | Endpoint     | Auth | Description                    |
|--------|--------------|------|--------------------------------|
| POST   | /logs        | ✅   | Create electricity log entry   |
| GET    | /logs        | ✅   | Get logs (filter by ?month=)   |
| DELETE | /logs/:id    | ✅   | Delete a log entry             |

### Dashboard
| Method | Endpoint     | Auth | Description                             |
|--------|--------------|------|-----------------------------------------|
| GET    | /dashboard   | ✅   | Full spend summary, insights, trend     |

### Budget
| Method | Endpoint              | Auth | Description            |
|--------|-----------------------|------|------------------------|
| POST   | /budget               | ✅   | Set monthly budget     |
| GET    | /budget/:monthYear    | ✅   | Get budget for month   |

### Subscriptions
| Method | Endpoint                   | Auth | Description                     |
|--------|----------------------------|------|---------------------------------|
| POST   | /subscriptions/initiate    | ✅   | Init Paystack payment           |
| POST   | /subscriptions/verify      | ✅   | Verify payment + activate sub   |
| GET    | /subscriptions/current     | ✅   | Get active subscription         |
| POST   | /subscriptions/cancel      | ✅   | Cancel active subscription      |

### Referrals
| Method | Endpoint           | Auth | Description                    |
|--------|--------------------|------|--------------------------------|
| GET    | /referrals/my-code | ✅   | Get referral code + link       |
| GET    | /referrals/stats   | ✅   | Referral count + rewards       |

### Metrics (Internal)
| Method | Endpoint  | Auth | Description                        |
|--------|-----------|------|------------------------------------|
| GET    | /metrics  | No   | GTM metrics: WAL, funnel, totals   |

---

## MongoDB Models

| Model           | Key Fields                                                |
|-----------------|-----------------------------------------------------------|
| User            | phone, name, city, powerType, tier, referralCode, streak |
| Log             | userId, date, type, amount, units, liters, hoursRun       |
| Budget          | userId, monthYear, targetAmount, alertAt                  |
| Subscription    | userId, tier, status, billingCycle, startDate, endDate    |
| Referral        | referrerUserId, referredUserId, status, rewardType        |
| MetricSnapshot  | date, totalUsers, paidUsers, wal, logsThisWeek, revenue   |

---

## Subscription Tiers (Placeholder Prices — Test Before Finalising)

| Tier             | Monthly  | Annual    | Key Features                        |
|------------------|----------|-----------|-------------------------------------|
| Free — Track     | ₦0       | ₦0        | 10 logs/month, basic dashboard      |
| Saver            | ₦800*    | ₦7,500*   | Unlimited logs, weekly summaries    |
| Household Pro    | ₦1,800*  | ₦16,000*  | Multi-member, benchmarking, export  |
| Property Manager | ₦4,500*  | ₦40,000*  | Multi-property, tenant billing      |

*All prices are assumptions — A/B test before launch*

---

## North-Star Metric
**Weekly Active Loggers (WAL)** — users who log at least 1 entry per week.

| Period     | WAL Target | Paid Subs | ARR (Assumption) |
|------------|-----------|-----------|------------------|
| Month 1–3  | 500–2,000 | 300       | ₦2.9M            |
| Month 4–6  | 2,000–8,000| 2,000    | ₦19.2M           |
| Month 7–12 | 8,000–25,000| 8,000   | ₦76.8M           |
