'use client'
import { useState } from 'react'
import {
  executiveSummary, positioning, segments, valueProposition,
  acquisitionChannels, partnerships, metrics, launchPlan, risks, gtmDashboard
} from '@/data/gtm-data'

const NAV_ITEMS = [
  { id: 'exec', label: 'Executive Summary' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'segments', label: 'Segments & ICP' },
  { id: 'value', label: 'Value Prop' },
  { id: 'acquisition', label: 'Acquisition' },
  { id: 'partnerships', label: 'Partnerships' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'launch', label: '90-Day Plan' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'risks', label: 'Risks' },
  { id: 'dashboard', label: 'GTM Dashboard' },
]

export default function GTMPlan() {
  const [activeSection, setActiveSection] = useState('exec')
  const [expandedSegment, setExpandedSegment] = useState<number | null>(1)
  const [expandedChannel, setExpandedChannel] = useState<number | null>(0)
  const [expandedRisk, setExpandedRisk] = useState<number | null>(0)

  const scrollTo = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ background: 'var(--night)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(180deg, #0F0800 0%, #0A0A0A 100%)',
        borderBottom: '1px solid var(--night-border)',
        padding: '60px 24px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* background glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'linear-gradient(135deg, #F59E0B, #B45309)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }}>💡</div>
            <div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.2em', color: 'var(--amber-glow)', textTransform: 'uppercase' }}>Go-To-Market Strategy</div>
              <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Nigeria · 12-Month Execution Plan · 2024–2025</div>
            </div>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #F5F0E8 0%, #F59E0B 60%, #FCD34D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            LUMINEST AFRICA
          </h1>

          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.6, marginBottom: 32 }}>
            Know your light. Own your bill. — The bold GTM plan to make LUMINEST AFRICA
            Nigeria&apos;s most-used household electricity tracking platform.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Target Year 1', value: '50,000 users' },
              { label: 'Paid Target', value: '8,000 subs' },
              { label: 'ARR Target', value: '₦76.8M' },
              { label: 'Phase 1 City', value: 'Lagos' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 8,
                padding: '8px 16px',
              }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: 14, color: 'var(--amber-glow)', fontWeight: 700, marginTop: 2 }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, fontFamily: 'Space Mono', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            * All targets marked as ASSUMPTIONS — see Metrics section
          </div>
        </div>
      </div>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--night-border)',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 0, padding: '0 24px', maxWidth: 1100, margin: '0 auto' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 14px',
                fontFamily: 'DM Sans, system-ui',
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                color: activeSection === item.id ? 'var(--amber-glow)' : 'var(--text-muted)',
                borderBottom: activeSection === item.id ? '2px solid var(--amber-glow)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── 1. EXECUTIVE SUMMARY ─────────────────────────────────────── */}
        <section id="exec" style={{ marginBottom: 64 }}>
          <SectionHeader number="01" title="Executive Summary" />
          <div style={{
            background: 'var(--night-soft)',
            border: '1px solid var(--night-border)',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {executiveSummary.lines.map((line, i) => (
              <div key={i} style={{
                display: 'flex', gap: 20,
                padding: '16px 24px',
                borderBottom: i < executiveSummary.lines.length - 1 ? '1px solid var(--night-border)' : 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700,
                  color: 'var(--amber-glow)', minWidth: 24, paddingTop: 2,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. POSITIONING ──────────────────────────────────────────────── */}
        <section id="positioning" style={{ marginBottom: 64 }}>
          <SectionHeader number="02" title="Positioning & Narrative" />

          <div style={{ marginBottom: 24, padding: 24, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12 }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Positioning Statement</div>
            <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-primary)' }}>&ldquo;{positioning.statement}&rdquo;</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <SubHeader>10 Tagline Options</SubHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
              {positioning.taglines.map((t, i) => (
                <div key={i} style={{
                  padding: '12px 16px',
                  background: 'var(--night-soft)',
                  border: '1px solid var(--night-border)',
                  borderRadius: 8,
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-secondary)' }}>&ldquo;{t}&rdquo;</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeader>Core Story</SubHeader>
            <div style={{ background: 'var(--night-soft)', border: '1px solid var(--night-border)', borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
                {positioning.coreStory.headline}
              </h3>
              {positioning.coreStory.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: i < 3 ? 16 : 0 }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. SEGMENTS ─────────────────────────────────────────────────── */}
        <section id="segments" style={{ marginBottom: 64 }}>
          <SectionHeader number="03" title="Target Segments & ICP" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {segments.map((seg) => (
              <div key={seg.id} style={{
                background: 'var(--night-soft)',
                border: expandedSegment === seg.id ? '1px solid rgba(245,158,11,0.35)' : '1px solid var(--night-border)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}>
                <button
                  onClick={() => setExpandedSegment(expandedSegment === seg.id ? null : seg.id)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '18px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: `rgba(245,158,11,${0.25 - seg.id * 0.03})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700, color: 'var(--amber-glow)',
                    }}>P{seg.priority}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{seg.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{seg.description}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontFamily: 'Space Mono', color: 'var(--amber-glow)' }}>{seg.electricitySpend}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{expandedSegment === seg.id ? '▲' : '▼'}</span>
                  </div>
                </button>

                {expandedSegment === seg.id && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--night-border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginTop: 20 }}>
                      <div>
                        <SegLabel>Income Range</SegLabel>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{seg.income}</p>
                      </div>
                      <div>
                        <SegLabel>WTP (Willingness to Pay)</SegLabel>
                        <p style={{ fontSize: 13, color: 'var(--green-save)' }}>{seg.willingnessToPay}</p>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginTop: 20 }}>
                      <SegBlock label="🔥 Pain Points" items={seg.pains} />
                      <SegBlock label="⚡ Purchase Triggers" items={seg.triggers} />
                      <SegBlock label="📢 Channels" items={seg.channels} />
                      <SegBlock label="🚫 Key Objections" items={seg.objections} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. VALUE PROPOSITION ────────────────────────────────────────── */}
        <section id="value" style={{ marginBottom: 64 }}>
          <SectionHeader number="04" title="Value Proposition & Feature Packaging" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div style={{ background: 'var(--night-soft)', border: '1px solid var(--night-border)', borderRadius: 12, padding: 24 }}>
              <SubHeader>✅ MVP Essential Features</SubHeader>
              {valueProposition.mvpFeatures.essential.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--green-save)', fontSize: 14, marginTop: 1 }}>●</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--night-soft)', border: '1px solid var(--night-border)', borderRadius: 12, padding: 24 }}>
              <SubHeader>🔮 Nice-to-Have (Later)</SubHeader>
              {valueProposition.mvpFeatures.niceToHave.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 1 }}>○</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <SubHeader>⚡ "Aha Moment" — Definition & Path</SubHeader>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16, fontStyle: 'italic' }}>&ldquo;{valueProposition.ahaMoment.definition}&rdquo;</p>
            {valueProposition.ahaMoment.stepsToAhaMoment.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 28, height: 28, borderRadius: '50%',
                  background: i === 4 ? 'var(--amber-glow)' : 'rgba(245,158,11,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, fontFamily: 'Space Mono',
                  color: i === 4 ? '#000' : 'var(--amber-glow)',
                }}>{i + 1}</div>
                <p style={{ fontSize: 13, color: i === 4 ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 4 }}>{step}</p>
              </div>
            ))}
          </div>

          <SubHeader>Subscription Tiers</SubHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {valueProposition.subscriptionTiers.map((tier, i) => (
              <div key={i} style={{
                background: i === 2 ? 'rgba(245,158,11,0.08)' : 'var(--night-soft)',
                border: i === 2 ? '1px solid rgba(245,158,11,0.4)' : '1px solid var(--night-border)',
                borderRadius: 12, padding: 20,
                position: 'relative',
              }}>
                {i === 2 && (
                  <div style={{
                    position: 'absolute', top: -10, left: 20,
                    background: 'var(--amber-glow)', color: '#000',
                    fontSize: 9, fontFamily: 'Space Mono', fontWeight: 700,
                    padding: '2px 8px', borderRadius: 999, letterSpacing: '0.1em',
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: 'var(--text-primary)' }}>{tier.name}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: 16, color: 'var(--amber-glow)', fontWeight: 700, marginBottom: 4 }}>{tier.price}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, fontStyle: 'italic' }}>{tier.targetUser}</div>
                {tier.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber-glow)', fontSize: 12, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, fontFamily: 'Space Mono' }}>* All prices are placeholders — market testing required before finalizing</p>
        </section>

        {/* ── 5. ACQUISITION ─────────────────────────────────────────────── */}
        <section id="acquisition" style={{ marginBottom: 64 }}>
          <SectionHeader number="05" title="Acquisition Strategy (Multi-Channel)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {acquisitionChannels.map((ch, i) => (
              <div key={i} style={{
                background: 'var(--night-soft)',
                border: expandedChannel === i ? '1px solid rgba(245,158,11,0.35)' : '1px solid var(--night-border)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                <button
                  onClick={() => setExpandedChannel(expandedChannel === i ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '16px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{ch.channel}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{ch.audience}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{expandedChannel === i ? '▲' : '▼'}</span>
                </button>
                {expandedChannel === i && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--night-border)' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 16, lineHeight: 1.6 }}><strong style={{ color: 'var(--amber-glow)' }}>Why it fits:</strong> {ch.why}</p>
                    <SegLabel>Example Creatives / Messages</SegLabel>
                    {ch.creatives.map((c, j) => (
                      <div key={j} style={{
                        margin: '8px 0',
                        padding: '10px 14px',
                        background: 'rgba(245,158,11,0.04)',
                        border: '1px solid rgba(245,158,11,0.1)',
                        borderRadius: 8,
                        fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
                      }}>{c}</div>
                    ))}
                    <div style={{ marginTop: 14 }}>
                      <SegLabel>Weekly Cadence</SegLabel>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6 }}>{ch.cadence}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. PARTNERSHIPS ────────────────────────────────────────────── */}
        <section id="partnerships" style={{ marginBottom: 64 }}>
          <SectionHeader number="06" title="Partnerships" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {partnerships.map((p, i) => (
              <div key={i} style={{
                background: 'var(--night-soft)',
                border: '1px solid var(--night-border)',
                borderRadius: 12, padding: 24,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{p.name}</div>
                  <span className={`badge badge-${p.priority === 'Critical' ? 'red' : p.priority === 'High' ? 'amber' : 'gray'}`}>{p.priority}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <SegLabel>Value Exchange</SegLabel>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6 }}>{p.valueExchange}</p>
                  </div>
                  <div>
                    <SegLabel>Approach Script</SegLabel>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6, fontStyle: 'italic' }}>&ldquo;{p.approachScript}&rdquo;</p>
                  </div>
                  <div>
                    <SegLabel>Pilot Structure</SegLabel>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6 }}>{p.pilotStructure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. PRICING ─────────────────────────────────────────────────── */}
        <section id="pricing" style={{ marginBottom: 64 }}>
          <SectionHeader number="07" title="Pricing & Payments (Nigeria Reality Check)" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'var(--night-soft)', border: '1px solid var(--night-border)', borderRadius: 12, padding: 24 }}>
              <SubHeader>Payment Flow Options</SubHeader>
              {[
                { method: 'Card (Debit/Credit)', detail: 'Via Paystack — Verve, Mastercard, Visa. Most familiar for target segment. Save card for auto-renewal.' },
                { method: 'Bank Transfer', detail: 'Paystack\'s instant bank transfer flow. User gets a unique virtual account number. Popular with users wary of saving card details.' },
                { method: 'USSD', detail: 'Paystack USSD (*737#, *822# etc.) for users with limited data or feature phones. Critical for Segment 5 (secondary cities).' },
                { method: 'Annual Prepaid', detail: 'Offer ~2 months free on annual plan. Reduces churn dramatically. Show monthly equivalent price prominently.' },
              ].map((pm, i) => (
                <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < 3 ? '1px solid var(--night-border)' : 'none' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--amber-glow)', marginBottom: 4 }}>{pm.method}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{pm.detail}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--night-soft)', border: '1px solid var(--night-border)', borderRadius: 12, padding: 24 }}>
              <SubHeader>Trust-Building Elements</SubHeader>
              {[
                { icon: '🧾', label: 'Instant Receipts', detail: 'WhatsApp + email receipt immediately after payment. Reference number included.' },
                { icon: '🔓', label: '1-Tap Cancellation', detail: 'Cancel anytime, no questions asked, from Settings. No hidden charges. Show this prominently on pricing page.' },
                { icon: '🛡️', label: 'Secured by Paystack', detail: 'Display Paystack security badge. Link to Paystack\'s security page. Nigerian users trust Paystack brand.' },
                { icon: '💬', label: 'WhatsApp Support', detail: 'Real WhatsApp number visible on payment page. Response time SLA: <2 hours on weekdays. Builds critical trust.' },
                { icon: '↩️', label: 'Money-Back Guarantee', detail: '7-day money-back guarantee for first-time subscribers. Removes all payment risk objection.' },
                { icon: '📊', label: 'Transparent Billing', detail: 'Show next billing date prominently in account settings. Email reminder 3 days before renewal.' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{t.label}</div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. 90-DAY LAUNCH PLAN ─────────────────────────────────────── */}
        <section id="launch" style={{ marginBottom: 64 }}>
          <SectionHeader number="08" title="90-Day Launch Plan (12 Weeks)" />
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', background: 'var(--night-soft)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--night-border)' }}>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Week</th>
                  <th style={{ width: 120 }}>Phase</th>
                  <th>Key Activities</th>
                  <th>Deliverables</th>
                  <th style={{ width: 120 }}>Owner</th>
                  <th style={{ width: 140 }}>Budget (Est.)</th>
                </tr>
              </thead>
              <tbody>
                {launchPlan.map((week) => (
                  <tr key={week.week}>
                    <td style={{ fontFamily: 'Space Mono', fontWeight: 700, color: 'var(--amber-glow)', fontSize: 13, textAlign: 'center' }}>W{week.week}</td>
                    <td>
                      <span className={`badge badge-${week.phase === 'Pre-Launch' ? 'gray' : week.phase === 'Soft Launch' ? 'amber' : week.phase === 'Expansion Prep' ? 'red' : 'green'}`}>
                        {week.phase}
                      </span>
                    </td>
                    <td>
                      {week.activities.map((a, i) => (
                        <div key={i} style={{ marginBottom: 4, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--amber-glow)', opacity: 0.5, fontSize: 10, marginTop: 2 }}>●</span>
                          <span style={{ fontSize: 12, lineHeight: 1.4 }}>{a}</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      {week.deliverables.map((d, i) => (
                        <div key={i} style={{ fontSize: 12, color: 'var(--green-save)', marginBottom: 4, lineHeight: 1.4 }}>✓ {d}</div>
                      ))}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{week.owner}</td>
                    <td style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--amber-glow)' }}>{week.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 9. METRICS ──────────────────────────────────────────────────── */}
        <section id="metrics" style={{ marginBottom: 64 }}>
          <SectionHeader number="09" title="Metrics & Analytics" />

          <div style={{
            background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: 12, padding: 24, marginBottom: 24,
          }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>North-Star Metric</div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{metrics.northStar}</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{metrics.rationale}</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <SubHeader>Funnel Metrics — All targets are ASSUMPTIONS</SubHeader>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table style={{ width: '100%', background: 'var(--night-soft)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--night-border)' }}>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Metric</th>
                    <th>Month 1–3 (Assumption)</th>
                    <th>Month 4–6 (Assumption)</th>
                    <th>Month 7–12 (Assumption)</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.funnelMetrics.map((m, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.stage}</td>
                      <td>{m.metric}</td>
                      <td style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--amber-glow)' }}>{m.month1_3}</td>
                      <td style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--amber-glow)' }}>{m.month4_6}</td>
                      <td style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--amber-glow)' }}>{m.month7_12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <SubHeader>Cumulative Targets by Period (All: ASSUMPTIONS)</SubHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 12 }}>
              {metrics.targets.map((t, i) => (
                <div key={i} style={{
                  background: 'var(--night-soft)', border: '1px solid var(--night-border)',
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{t.period}</div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Registered Users</div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{t.registered}</div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Paid Subscribers</div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: 'var(--green-save)' }}>{t.paid}</div>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ARR Estimate</div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color: 'var(--amber-glow)' }}>{t.arr_estimate}</div>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>{t.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. RISKS ───────────────────────────────────────────────────── */}
        <section id="risks" style={{ marginBottom: 64 }}>
          <SectionHeader number="10" title="Risks & Mitigations" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {risks.map((risk, i) => (
              <div key={i} style={{
                background: 'var(--night-soft)',
                border: expandedRisk === i ? '1px solid rgba(239,68,68,0.3)' : '1px solid var(--night-border)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                <button
                  onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '16px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <span className={`badge badge-${risk.severity === 'High' ? 'red' : risk.severity === 'Medium' ? 'amber' : 'gray'}`}>{risk.severity}</span>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{risk.risk}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{expandedRisk === i ? '▲' : '▼'}</span>
                </button>
                {expandedRisk === i && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--night-border)' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '16px 0', lineHeight: 1.6 }}>{risk.description}</p>
                    <SegLabel>Mitigations</SegLabel>
                    {risk.mitigations.map((m, j) => (
                      <div key={j} style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--green-save)', fontSize: 14, marginTop: 1 }}>→</span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{m}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8 }}>
                      <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Experiment: </span>
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{risk.experiment}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. GTM DASHBOARD ───────────────────────────────────────────── */}
        <section id="dashboard" style={{ marginBottom: 64 }}>
          <SectionHeader number="11" title="GTM Dashboard — One-Page Summary" />

          <div style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(10,8,0,0) 100%)',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: 16, padding: 32,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
              <div>
                <SubHeader>🎯 North-Star Metric</SubHeader>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 18, color: 'var(--amber-glow)', marginBottom: 16 }}>{gtmDashboard.northStar}</div>
                <SubHeader>WAL Targets</SubHeader>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                  {Object.entries(gtmDashboard.weeklyTargets).map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'Space Mono', letterSpacing: '0.1em' }}>{k.replace('month', 'Month ')}</div>
                      <div style={{ fontFamily: 'Space Mono', fontWeight: 700, color: 'var(--amber-glow)', fontSize: 14, marginTop: 4 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SubHeader>🧪 Key Experiments (Priority Order)</SubHeader>
                {gtmDashboard.keyExperiments.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', minWidth: 16, marginTop: 2 }}>{i + 1}.</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
              <div>
                <SubHeader>📅 Weekly Rhythm</SubHeader>
                {gtmDashboard.weeklyRhythm.map((r, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, lineHeight: 1.4 }}>{r}</div>
                ))}
              </div>
              <div>
                <SubHeader>📆 Monthly Rhythm</SubHeader>
                {gtmDashboard.monthlyRhythm.map((r, i) => (
                  <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--amber-glow)', fontFamily: 'Space Mono', fontSize: 10 }}>W{i + 1}: </span>{r}
                  </div>
                ))}
              </div>
              <div>
                <SubHeader>💰 Budget Ranges (Monthly, Assumption)</SubHeader>
                {Object.entries(gtmDashboard.budgetRanges).map(([k, v]) => (
                  <div key={k} style={{
                    marginBottom: 12, padding: '10px 14px',
                    background: 'rgba(0,0,0,0.3)', borderRadius: 8,
                    border: `1px solid ${k === 'medium' ? 'rgba(245,158,11,0.25)' : 'var(--night-border)'}`,
                  }}>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--amber-glow)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                      {k.toUpperCase()} SPEND
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activation & Engagement Section */}
            <div>
              <SubHeader>🔄 Activation, Retention & Engagement Loop</SubHeader>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 20 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 12 }}>Onboarding Flow (Web App)</div>
                  {[
                    'Landing: Pain-point headline + "How much did you spend on electricity last month?" CTA',
                    'Signup: Phone number only (+ OTP). No email barrier for Nigeria.',
                    'Power type selector: Prepaid / Postpaid / Generator / Mixed',
                    'City selector (pre-populates benchmarks)',
                    'First log prompt: Instant, frictionless — ₦ amount, type, date',
                    'Aha moment: Instant monthly pace projection vs city average',
                    'Budget setup: "Set a monthly target to get alerts"',
                    'WhatsApp opt-in: "Get your weekly summary on WhatsApp"',
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--amber-glow)', minWidth: 16, marginTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{step}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 20 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 12 }}>Referral Loop Mechanics</div>
                  {[
                    'Trigger: After first monthly insight is shown ("You saved ₦X!")',
                    'Mechanic: "Share with 1 friend → both get 1 month SAVER free"',
                    'WhatsApp native: 1-tap pre-written message with referral link',
                    'Tracking: Unique referral codes, Paystack discount on conversion',
                    'Leaderboard: "Top referrer in Lagos this month" — social recognition',
                    'Reward: Free month credited instantly on successful referral',
                    'Estate mechanic: "Refer 10 neighbours → get 6 months free Pro"',
                    'Diaspora mechanic: "Send LUMINEST to your family abroad — they track, you see"',
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--green-save)', minWidth: 16, marginTop: 2 }}>{i + 1}.</span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{
          textAlign: 'center', padding: '32px 0',
          borderTop: '1px solid var(--night-border)',
        }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>💡</div>
          <div style={{ fontFamily: 'Playfair Display', fontSize: 18, color: 'var(--amber-glow)', marginBottom: 8 }}>LUMINEST AFRICA</div>
          <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
            KNOW YOUR LIGHT. OWN YOUR BILL. — NIGERIA GTM PLAN 2024–2025
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helper Components ────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
        <span style={{
          fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700,
          color: 'var(--amber-glow)', opacity: 0.7,
          background: 'rgba(245,158,11,0.1)',
          padding: '4px 10px', borderRadius: 6,
        }}>{number}</span>
        <h2 style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: 26, fontWeight: 700,
          color: 'var(--text-primary)',
        }}>{title}</h2>
      </div>
      <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, var(--amber-glow), transparent)', borderRadius: 2 }} />
    </div>
  )
}

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'Space Mono', fontSize: 10, fontWeight: 700,
      color: 'var(--amber-glow)', letterSpacing: '0.12em',
      textTransform: 'uppercase', marginBottom: 10,
    }}>{children}</div>
  )
}

function SegLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'Space Mono', fontSize: 9, color: 'var(--text-muted)',
      textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6,
    }}>{children}</div>
  )
}

function SegBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <SegLabel>{label}</SegLabel>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--amber-glow)', opacity: 0.5, fontSize: 10, marginTop: 3 }}>■</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item}</span>
        </div>
      ))}
    </div>
  )
}
