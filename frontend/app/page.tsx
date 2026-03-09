'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { div } from 'framer-motion/client';

interface HowStep { step: string; icon: string; title: string; desc: string; time: string }
interface Feature { emoji: string; title: string; desc: string; featured?: boolean }
interface Plan { name: string; price: string; period: string; features: string[]; dimFeatures: string[]; popular?: boolean; ctaLabel: string; ctaStyle: 'outline' | 'fill' }
interface Testimonial { stars: number; body: string; initials: string; name: string; location: string }

const HOW_STEPS: HowStep[] = [
  { step: '01', icon: '📱', title: 'Sign up with your phone', desc: "Enter your phone number, receive an OTP on WhatsApp or SMS, and you're in. No email. No app store. Works in any browser.", time: '⏱ 90 seconds' },
  { step: '02', icon: '✍️', title: 'Log every purchase', desc: "Every time you buy a NEPA token, fill the generator, or top up solar — log the amount in 15 seconds. That's all the input LUMINEST needs.", time: '⏱ 15 sec per entry' },
  { step: '03', icon: '💡', title: 'See your pattern', desc: 'LUMINEST instantly shows your total spend, cost breakdown by source, and how you compare to similar households in your city.', time: '⏱ Instant dashboard' },
  { step: '04', icon: '🎯', title: 'Set a budget & get alerts', desc: "Set a monthly electricity budget. LUMINEST alerts you on WhatsApp when you're approaching it — before you overspend, not after.", time: '⏱ 1 minute to set up' },
  { step: '05', icon: '📊', title: 'Get your weekly summary', desc: "Every Monday morning, a clear summary of last week's spend hits your WhatsApp. No need to open the app to stay on top of your numbers.", time: '⏱ Every Monday, 8am' },
  { step: '06', icon: '📉', title: 'Spend less, stress less', desc: 'Visibility creates accountability. Most users reduce their electricity spend by 15–25% within 3 months, simply by knowing the number.', time: '⏱ Results in ~3 months' },
]

const PROBLEMS = [
  { icon: '💸', title: 'No single bill', desc: 'NEPA tokens, diesel, solar top-ups — all paid separately, in cash, at different times. No record, no total.' },
  { icon: '🎲', title: 'No way to budget', desc: "How do you budget for something you can't measure? Most households guess — and guess wrong by 30–50%." },
  { icon: '🏠', title: 'Landlord disputes with no data', desc: '"You\'re overcharging me for NEPA" is impossible to resolve without records. LUMINEST creates that record.' },
  { icon: '🌍', title: 'Diaspora sending money blind', desc: "Relatives abroad send money for electricity with zero visibility on how it's spent. LUMINEST creates accountability." },
]

const FEATURES: Feature[] = [
  { emoji: '⚡', title: 'Multi-source tracking', desc: 'Log NEPA prepaid tokens, postpaid bills, generator diesel, and solar top-ups — all in one place with one running total.', featured: true },
  { emoji: '💬', title: 'WhatsApp weekly summary', desc: 'Get your weekly spend summary delivered directly to WhatsApp every Monday — no app-opening required.' },
  { emoji: '🎯', title: 'Budget alerts', desc: 'Set a monthly budget target. Get an alert when you hit 80% of it — before you blow the budget, not after.' },
  { emoji: '📊', title: 'City benchmarks', desc: 'See how your monthly spend compares to similar households in Lagos, Abuja, or Port Harcourt.' },
  { emoji: '🏘️', title: 'Landlord & property view', desc: 'Manage electricity records for multiple units. End the "overcharging" argument with logged, timestamped data.', featured: true },
  { emoji: '🔗', title: 'Referral rewards', desc: 'Share with a neighbour and you both get 1 month free. One WhatsApp tap — your referral link is pre-filled and ready to send.' },
  { emoji: '🛡️', title: 'Paystack-secured payments', desc: 'Pay via Verve/Mastercard/Visa, bank transfer, or USSD. Instant WhatsApp receipt. Cancel anytime in one tap.' },
  { emoji: '🔥', title: 'Streak tracking', desc: 'Build a logging streak. The longer you track, the more accurate your insights — and the app celebrates your consistency.' },
  { emoji: '⚙️', title: 'Generator ROI calculator', desc: 'Is your generator actually worth it? Compare your diesel cost-per-hour to what solar would cost — the data does the maths for you.' },
]

const PLANS: Plan[] = [
  { name: 'Free — Track', price: '₦0', period: 'Forever free', features: ['10 log entries per month', 'Basic spend dashboard', '3 months history'], dimFeatures: ['Weekly WhatsApp summary', 'Budget alerts', 'City benchmarks'], ctaLabel: 'Get Started Free', ctaStyle: 'outline' },
  { name: 'Saver — Understand', price: '₦800*', period: 'per month · or ₦7,500/yr', features: ['Unlimited log entries', 'Full spend dashboard', '12 months history', 'Weekly WhatsApp summary', 'Budget alerts', 'City benchmarks'], dimFeatures: [], popular: true, ctaLabel: 'Start Saver Plan', ctaStyle: 'fill' },
  { name: 'Household Pro — Control', price: '₦1,800*', period: 'per month · or ₦16,000/yr', features: ['Everything in Saver', '3 household members', 'Landlord-tenant split view', 'Generator ROI calculator', 'Peer benchmarking', 'Data export (CSV)'], dimFeatures: [], ctaLabel: 'Start Pro Plan', ctaStyle: 'outline' },
  { name: 'Property Manager', price: '₦4,500*', period: 'per month · or ₦40,000/yr', features: ['Everything in Pro', 'Up to 10 properties', 'Consolidated property view', 'Tenant billing records', 'WhatsApp support priority', 'Monthly report PDF'], dimFeatures: [], ctaLabel: 'Start Property Plan', ctaStyle: 'outline' },
]

const TESTIMONIALS: Testimonial[] = [
  { stars: 5, body: '"I genuinely had no idea I was spending ₦52,000 a month on electricity. After 6 weeks of tracking, I cut it to ₦38,000 just by being more careful about generator hours."', initials: 'AO', name: 'Adaora O.', location: 'Lekki Phase 1, Lagos' },
  { stars: 5, body: '"I manage 8 flats. The property manager plan ended every argument about NEPA billing with my tenants. I just show them the log. End of discussion."', initials: 'BK', name: 'Biodun K.', location: 'Wuse 2, Abuja' },
  { stars: 4, body: '"My brother in the UK sends money for light every month. Now I send him the monthly report from LUMINEST and he can see exactly where it went. Trust sorted."', initials: 'CM', name: 'Chidi M.', location: 'GRA Port Harcourt' },
]

const TICKER_ITEMS = ['Manual logging — no hardware needed', 'Track NEPA tokens, generator & solar', 'Weekly WhatsApp summaries', 'Budget alerts before you overspend', 'Pay via card, bank transfer or USSD', 'Built for Nigerian households']

// ── FadeIn wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease', ...style }}>{children}</div>
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '0 20px', background: 'rgba(8,7,6,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, maxWidth: 1100, margin: '0 auto' }}>
          <Link href="/landing" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#F59E0B,#B45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>💡</div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.06em' }}>LUMINEST<span style={{ color: '#F59E0B' }}>.</span>AFRICA</span>
          </Link>
          <ul className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
            {(['How it works', 'Features', 'Pricing'] as const).map((label, i) => (
              <li key={label}><a href={['#how', '#features', '#pricing'][i]} style={{ color: '#B0A090', textDecoration: 'none', fontSize: 13.5, fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color = '#B0A090')}>{label}</a></li>
            ))}
            <li><a href="#pricing" style={{ background: '#F59E0B', color: '#000', padding: '8px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>Start Free →</a></li>
          </ul>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Menu">
            {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#B0A090', borderRadius: 2 }} />)}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 60, left: 0, right: 0, zIndex: 199, background: '#0F0D0A', borderBottom: '1px solid rgba(245,158,11,0.15)', padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[['#how', 'How it works'], ['#features', 'Features'], ['#pricing', 'Pricing']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: '#B0A090', textDecoration: 'none', fontSize: 15, fontWeight: 500, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{label}</a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, background: '#F59E0B', color: '#000', padding: 13, borderRadius: 10, textAlign: 'center', fontWeight: 700, textDecoration: 'none', display: 'block' }}>Start Free — ₦0 →</a>
        </div>
      )}
      <style>{`@media(max-width:720px){.nav-desktop{display:none!important}.nav-hamburger{display:flex!important}}`}</style>
    </>
  )
}

// ── Hero mockup card ────────────────────────────────────────────────────────
function HeroCard() {
  return (
    <div className="animate-float" style={{ background: '#161310', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 20, padding: 24, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.12em', color: '#6B5B4E', textTransform: 'uppercase' }}>July 2024 · Lagos</span>
        <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 999, fontSize: 10, fontFamily: "'Space Mono',monospace", fontWeight: 700, padding: '2px 9px' }}>↓ 18% vs June</span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: '#6B5B4E', marginBottom: 4 }}>Total Electricity Spend</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 32, fontWeight: 700, color: '#F59E0B' }}>₦41,200</div>
        <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 3 }}>Budget: ₦45,000 · <span style={{ color: '#EF4444' }}>Used 91%</span></div>
      </div>
      {[['NEPA Tokens', '52%', '₦21,400'], ['Generator Diesel', '42%', '₦17,300'], ['Solar Top-up', '6%', '₦2,500']].map(([label, pct, val]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#B0A090', width: 110, flexShrink: 0 }}>{label}</span>
          <div style={{ flex: 1, height: 8, background: '#1E1A15', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: pct, height: '100%', background: 'linear-gradient(90deg,#B45309,#F59E0B)', borderRadius: 4 }} />
          </div>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#B0A090', width: 54, textAlign: 'right', flexShrink: 0 }}>{val}</span>
        </div>
      ))}
      <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: '#B0A090', lineHeight: 1.5, marginTop: 8 }}>
        💡 <strong style={{ color: '#F59E0B' }}>Insight:</strong> Your generator spend dropped ₦6,800 this month. At this rate you&apos;ll hit your budget target.
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Shared styles
  const S = {
    sectionLabel: { fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#F59E0B', display: 'inline-block', marginBottom: 14 },
    sectionTitle: { fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(28px,4vw,44px)' as string, fontWeight: 700, lineHeight: 1.15, color: '#F5F0E8', marginBottom: 16 },
    sectionSub:   { fontSize: 'clamp(14px,1.6vw,16px)' as string, color: '#B0A090', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' },
    border:       '1px solid rgba(245,158,11,0.15)',
    card:         { background: '#0F0D0A', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 16, padding: '26px 22px' },
  }

  return (
    <div style={{ background: '#080706', color: '#F5F0E8', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6, overflowX: 'hidden' }}>
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Ticker */}
      <div style={{ marginTop: 60, background: 'rgba(245,158,11,0.06)', borderBottom: S.border, overflow: 'hidden', padding: '9px 0' }} aria-hidden="true">
        <div className="animate-ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 32px', fontFamily: "'Space Mono',monospace", fontSize: 10.5, letterSpacing: '0.1em', color: '#F59E0B', textTransform: 'uppercase' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#B45309', display: 'inline-block' }} />{item}
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(70px,8vw,100px) 20px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 'min(700px,100vw)', height: 'min(700px,100vw)', top: '50%', left: '50%', transform: 'translate(-50%,-60%)', background: 'radial-gradient(circle,rgba(245,158,11,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div className="hero-inner" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="anim-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 999, padding: '5px 14px', fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', color: '#F59E0B', textTransform: 'uppercase', marginBottom: 20 }}>
              <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              Now live in Lagos &amp; Abuja
            </div>
            <h1 className="anim-2" style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(38px,5.5vw,72px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 22, color: '#F5F0E8' }}>
              Finally know<br />
              <span style={{ background: 'linear-gradient(135deg,#F59E0B 0%,#FCD34D 60%,#F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>what you spend</span><br />
              on electricity.
            </h1>
            <p className="anim-3" style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: '#B0A090', lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              Nigerian households spend ₦15,000–₦80,000 every month on NEPA tokens, diesel, and generators — with zero visibility. LUMINEST shows you exactly where every naira goes, so you can take back control.
            </p>
            <div className="anim-4 hero-actions">
              <a href="#pricing" className="animate-pulse-btn" style={{ background: '#F59E0B', color: '#000', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                Start Tracking Free →
              </a>
              <a href="#how" style={{ background: 'transparent', color: '#B0A090', fontWeight: 500, fontSize: 14, padding: '14px 22px', borderRadius: 10, border: S.border, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#F59E0B' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)'; e.currentTarget.style.color = '#B0A090' }}>
                ▶ See how it works
              </a>
            </div>
            <div className="anim-5" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, fontSize: 12.5, color: '#6B5B4E' }}>
              <span style={{ color: '#10B981', fontWeight: 600 }}>✓ Free</span> · No smart meter needed · Sign up in 90 seconds
            </div>
          </div>
          <div className="hero-card-wrap"><HeroCard /></div>
        </div>
        <style>{`
          .hero-inner{display:grid;grid-template-columns:1fr 420px;gap:60px;align-items:center}
          .hero-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
          @media(max-width:900px){.hero-inner{grid-template-columns:1fr!important;gap:40px!important}.hero-card-wrap{max-width:440px;margin:0 auto;width:100%}}
          @media(max-width:500px){.hero-actions{flex-direction:column!important;align-items:stretch!important}}
        `}</style>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: '#0F0D0A', borderTop: S.border, borderBottom: S.border, padding: '32px 20px' }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[{ num: '₦35K', label: 'Average monthly electricity spend per Lagos household' }, { num: '0', label: 'Nigerian households with a single, clear electricity bill' }, { num: '~20%', label: 'Average spend reduction after 3 months of tracking', note: '* assumption based on habit research' }, { num: '15s', label: 'Time to log one electricity purchase' }].map(s => (
            <div key={s.num} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, color: '#F59E0B', display: 'block', marginBottom: 4 }}>{s.num}</span>
              <div style={{ fontSize: 12, color: '#6B5B4E', lineHeight: 1.4 }}>{s.label}</div>
              {s.note && <div style={{ fontSize: 9, color: '#6B5B4E', marginTop: 2, fontFamily: "'Space Mono',monospace", opacity: 0.6 }}>{s.note}</div>}
            </div>
          ))}
        </div>
        <style>{`@media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span style={S.sectionLabel}>How it works</span>
          <h2 style={S.sectionTitle}>From signup to savings<br />in under 5 minutes.</h2>
          <p style={S.sectionSub}>No smart meter. No utility integration. No hardware. Just your phone and 15 seconds per purchase.</p>
        </div>
        <div className="how-grid" style={{ maxWidth: 1100, margin: '52px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {HOW_STEPS.map(s => (
            <FadeIn key={s.step}>
              <div style={{ ...S.card, height: '100%', transition: 'border-color 0.2s', cursor: 'default' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)')}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 36, fontWeight: 700, color: 'rgba(245,158,11,0.15)', lineHeight: 1, marginBottom: 16 }}>{s.step}</div>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: '#B0A090', lineHeight: 1.65 }}>{s.desc}</div>
                <span style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#F59E0B', background: 'rgba(245,158,11,0.12)', padding: '3px 10px', borderRadius: 999 }}>{s.time}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <style>{`@media(max-width:720px){.how-grid{grid-template-columns:1fr!important;max-width:480px!important}}`}</style>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ background: '#0F0D0A', borderTop: S.border, borderBottom: S.border, padding: '80px 20px' }}>
        <div className="problem-inner" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={S.sectionLabel}>The problem</span>
            <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3vw,34px)', fontStyle: 'italic', lineHeight: 1.4, color: '#F5F0E8', position: 'relative', paddingLeft: 24 }}>
              <span style={{ position: 'absolute', left: 0, top: 6, width: 4, height: 'calc(100% - 12px)', background: '#F59E0B', borderRadius: 2, display: 'block' }} />
              &ldquo;I spent ₦47,000 on electricity last month and had no idea until I added it up myself.&rdquo;
            </blockquote>
            <p style={{ marginTop: 20, fontSize: 13, color: '#6B5B4E' }}>— Typical response from new LUMINEST users after their first month summary</p>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, margin: 0, padding: 0 }}>
            {PROBLEMS.map(p => (
              <FadeIn key={p.title}>
                <li style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14, color: '#F5F0E8', marginBottom: 2 }}>{p.title}</strong>
                    <p style={{ fontSize: 13, color: '#B0A090', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
        <style>{`@media(max-width:768px){.problem-inner{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span style={S.sectionLabel}>Features</span>
          <h2 style={S.sectionTitle}>Everything you need.<br />Nothing you don&apos;t.</h2>
          <p style={S.sectionSub}>Built specifically for how Nigerian households actually consume and pay for electricity.</p>
        </div>
        <div className="features-grid" style={{ maxWidth: 1100, margin: '52px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {FEATURES.map(f => (
            <FadeIn key={f.title}>
              <div style={{ background: f.featured ? 'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02))' : '#0F0D0A', border: `1px solid ${f.featured ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.15)'}`, borderRadius: 16, padding: '26px 22px', height: '100%', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = f.featured ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <span style={{ fontSize: 28, marginBottom: 14, display: 'block' }}>{f.emoji}</span>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: '#F5F0E8', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#B0A090', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <style>{`@media(max-width:800px){.features-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:480px){.features-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: '#0F0D0A', borderTop: S.border, borderBottom: S.border, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span style={S.sectionLabel}>Pricing</span>
          <h2 style={S.sectionTitle}>Start free. Upgrade when<br />you see the value.</h2>
          <p style={S.sectionSub}>No card required to start. All prices are in Naira and billed monthly or annually.</p>
        </div>
        <div className="pricing-grid" style={{ maxWidth: 1100, margin: '52px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {PLANS.map(plan => (
            <FadeIn key={plan.name}>
              <div style={{ background: plan.popular ? 'linear-gradient(160deg,rgba(245,158,11,0.1),#161310)' : '#161310', border: `1px solid ${plan.popular ? 'rgba(245,158,11,0.45)' : 'rgba(245,158,11,0.15)'}`, borderRadius: 16, padding: '24px 20px', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)')} onMouseLeave={e => (e.currentTarget.style.borderColor = plan.popular ? 'rgba(245,158,11,0.45)' : 'rgba(245,158,11,0.15)')}>
                {plan.popular && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#F59E0B', color: '#000', fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '3px 12px', borderRadius: 999, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B5B4E', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 26, fontWeight: 700, color: '#F59E0B', marginBottom: 2 }}>{plan.price}</div>
                <div style={{ fontSize: 11, color: '#6B5B4E', marginBottom: 20 }}>{plan.period}</div>
                <ul style={{ listStyle: 'none', flex: 1, marginBottom: 20, padding: 0 }}>
                  {plan.features.map(f => <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: '#B0A090', marginBottom: 8, lineHeight: 1.45 }}><span style={{ color: '#F59E0B', flexShrink: 0 }}>✓</span>{f}</li>)}
                  {plan.dimFeatures.map(f => <li key={f} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: '#6B5B4E', marginBottom: 8, lineHeight: 1.45 }}><span style={{ color: '#6B5B4E', flexShrink: 0 }}>✓</span>{f}</li>)}
                </ul>
                <a href="#" style={{ width: '100%', padding: 11, borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center', display: 'block', transition: 'all 0.2s', ...(plan.ctaStyle === 'fill' ? { background: '#F59E0B', color: '#000', border: 'none' } : { background: 'transparent', border: '1px solid rgba(245,158,11,0.15)', color: '#B0A090' }) }}
                  onMouseEnter={e => { if (plan.ctaStyle === 'fill') e.currentTarget.style.opacity = '0.88'; else { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#F59E0B' } }}
                  onMouseLeave={e => { if (plan.ctaStyle === 'fill') e.currentTarget.style.opacity = '1'; else { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)'; e.currentTarget.style.color = '#B0A090' } }}>
                  {plan.ctaLabel}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#6B5B4E', letterSpacing: '0.08em' }}>* All prices are placeholders — subject to change after market testing · 7-day money-back guarantee</p>
        <style>{`@media(max-width:900px){.pricing-grid{grid-template-columns:repeat(2,1fr)!important;gap:20px!important}}@media(max-width:480px){.pricing-grid{grid-template-columns:1fr!important;max-width:380px!important;margin-left:auto!important;margin-right:auto!important}}`}</style>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span style={S.sectionLabel}>Early users</span>
          <h2 style={S.sectionTitle}>What Nigerian households<br />are saying.</h2>
        </div>
        <div className="testi-grid" style={{ maxWidth: 1100, margin: '52px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <FadeIn key={t.name}>
              <div style={S.card}>
                <div style={{ color: '#F59E0B', fontSize: 14, marginBottom: 14 }}>{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                <p style={{ fontSize: 14, color: '#B0A090', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>{t.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#B45309,#78350f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#F59E0B', flexShrink: 0, fontFamily: "'Space Mono',monospace" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F0E8' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#6B5B4E' }}>{t.location}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <style>{`@media(max-width:720px){.testi-grid{grid-template-columns:1fr!important;max-width:480px!important}}`}</style>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '0 20px 80px' }}>
        <div className="cta-banner" style={{ maxWidth: 1100, margin: '0 auto', background: 'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 20, padding: 'clamp(36px,5vw,60px) clamp(24px,5vw,60px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 700, lineHeight: 1.2, color: '#F5F0E8', marginBottom: 8 }}>How much did you spend<br />on electricity last month?</h2>
            <p style={{ fontSize: 14, color: '#B0A090', maxWidth: 420 }}>If you don&apos;t know the exact number — LUMINEST will show you. Free to start, no hardware needed, sign up in 90 seconds.</p>
          </div>
          <div className="cta-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0, alignItems: 'center' }}>
            <a href="#pricing" style={{ background: '#F59E0B', color: '#000', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s', whiteSpace: 'nowrap' }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>Start Tracking Free →</a>
            <a href="#how" style={{ background: 'transparent', color: '#B0A090', fontSize: 14, padding: '14px 22px', borderRadius: 10, border: S.border, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', whiteSpace: 'nowrap' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#F59E0B' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)'; e.currentTarget.style.color = '#B0A090' }}>Learn more</a>
          </div>
        </div>
        <style>{`@media(max-width:640px){.cta-banner{flex-direction:column!important;align-items:flex-start!important}.cta-actions{width:100%!important;flex-direction:column!important}}`}</style>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0F0D0A', borderTop: S.border, padding: '48px 20px 32px' }}>
        <div className="footer-inner" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 36, borderBottom: S.border, marginBottom: 28 }}>
          <div className="footer-brand">
            <Link href="/landing" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#F59E0B,#B45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>💡</div>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, fontWeight: 700, color: '#F5F0E8', letterSpacing: '0.06em' }}>LUMINEST<span style={{ color: '#F59E0B' }}>.</span>AFRICA</span>
            </Link>
            <p style={{ fontSize: 13, color: '#6B5B4E', lineHeight: 1.65, marginTop: 14, maxWidth: 260 }}>Know your light. Own your bill. Nigeria&apos;s first household electricity spend tracker — no hardware, no fuss.</p>
          </div>
          {[
            { heading: 'Product', links: [['#how', 'How it works'], ['#features', 'Features'], ['#pricing', 'Pricing'], ['#', 'Changelog']] },
            { heading: 'Company', links: [['#', 'About'], ['#', 'Blog'], ['#', 'Press'], ['#', 'Contact']] },
            { heading: 'Support', links: [['#', 'WhatsApp Support'], ['#', 'FAQ'], ['#', 'Privacy Policy'], ['#', 'Terms of Use']] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F59E0B', marginBottom: 16 }}>{col.heading}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map(([href, label]) => (
                  <li key={label} style={{ marginBottom: 8 }}>
                    <a href={href} style={{ fontSize: 13, color: '#6B5B4E', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')} onMouseLeave={e => (e.currentTarget.style.color = '#6B5B4E')}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontFamily: "'Space Mono',monospace", fontSize: 10, color: '#6B5B4E', letterSpacing: '0.08em' }}>
          <span>© 2024 LUMINEST AFRICA · All rights reserved</span>
          <span>Built for Nigeria 🇳🇬 · <a href="#" style={{ color: '#6B5B4E', textDecoration: 'none' }}>Privacy</a> · <a href="#" style={{ color: '#6B5B4E', textDecoration: 'none' }}>Terms</a></span>
        </div>
        <style>{`@media(max-width:800px){.footer-inner{grid-template-columns:1fr 1fr!important}.footer-brand{grid-column:span 2}}@media(max-width:480px){.footer-inner{grid-template-columns:1fr!important}.footer-brand{grid-column:span 1!important}}`}</style>
      </footer>
    </div>
  )
}