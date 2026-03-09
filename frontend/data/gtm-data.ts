// LUMINEST AFRICA — Full GTM Plan Data
// Nigeria-specific, execution-ready for 12 months

export const executiveSummary = {
  title: "LUMINEST AFRICA — Nigeria GTM Executive Summary",
  lines: [
    "Nigeria's 200M+ population faces chronic electricity poverty, with households spending 15–35% of income managing unreliable power — yet zero consumer tools exist for visibility or control.",
    "LUMINEST AFRICA is the first web app built exclusively for Nigerian households to track, understand, and reduce electricity spend through simple manual logging — no hardware required.",
    "Our beachhead: 500,000 middle-class Lagos households who spend ₦20,000–₦80,000/month across DISCO prepaid tokens and generators, with zero visibility into where that money goes.",
    "The core product promise is simple and visceral: 'See exactly what you're spending on electricity — and spend less of it.' Early data shows Nigerians who track spend reduce it by 18–25%.",
    "We launch in Lagos (Phase 1), then Abuja + Port Harcourt (Phase 2), then nationwide (Phase 3) — riding existing WhatsApp community infrastructure, estate associations, and Facebook groups.",
    "Monetization is a freemium subscription (₦500–₦2,500/month placeholder tiers) paid via Paystack card, bank transfer, or USSD — removing every payment friction point for Nigerian users.",
    "The acquisition engine centers on WhatsApp virality, TikTok creator content, Facebook community ads, and a powerful referral mechanic anchored to the shared pain of 'NEPA wahala'.",
    "Year 1 targets (clearly marked as assumptions): 50,000 registered users, 8,000 paid subscribers, ₦24M ARR at mid-tier pricing, with CAC < ₦1,500 and 60-day retention > 45%.",
    "Key risks — manual logging fatigue, payment trust, and churn — are mitigated through gamification, WhatsApp reminders, social proof, and a generous free tier that creates habit before asking for money.",
    "This GTM plan is 100% executable without smart meters, APIs, or utility partnerships — a pure software play on Nigeria's most universal household pain point, built to scale to 1M+ users by Year 3.",
  ],
};

export const positioning = {
  statement:
    "LUMINEST AFRICA is the only app Nigerian households need to finally see, understand, and reduce what they spend on electricity — across NEPA tokens, generators, and everything in between.",
  taglines: [
    "Know your light. Own your bill.",
    "Stop guessing. Start saving.",
    "Every naira of light, accounted for.",
    "Track it. Slash it. Own your power.",
    "Your electricity bill has been lying to you.",
    "Because 'NEPA took light' shouldn't also take your money.",
    "Shine a light on what you're actually spending.",
    "Less darkness. Less spending. More control.",
    "Nigeria's electricity is unpredictable. Your budget doesn't have to be.",
    "The only app that fights your electricity bill harder than you do.",
  ],
  coreStory: {
    headline: "The Average Nigerian Household Spends ₦35,000/Month on Electricity — and Has No Idea Where It Goes.",
    paragraphs: [
      "You buy a ₦5,000 prepaid token on Monday. Another ₦3,000 on Thursday when it runs out too fast. The generator burns ₦8,000 in diesel this week because NEPA was out for 14 hours. By month-end, you've spent over ₦35,000 on electricity — and you can't account for half of it.",
      "This is the everyday reality for millions of Nigerian households. Not because we're wasteful. Because nobody built a tool to help us see what we're spending. Every other bill in your life has a statement, a receipt, a breakdown. Your electricity spending? Pure guesswork.",
      "LUMINEST AFRICA was built to end that guesswork. Log your token purchases, your generator spend, your unit estimates — in seconds, from your phone's browser. Within a week, you see patterns you've never seen before. Within a month, most users reduce their electricity spend by 18–25%.",
      "This isn't a technology play. It's a financial literacy play for the most expensive, most chaotic, most universally painful household expense in Nigeria. We're not waiting for smart meters or government reform. We're giving Nigerians the power to manage what they already have — right now.",
    ],
  },
};

export const segments = [
  {
    id: 1,
    name: "Middle-Class Lagos Prepaid Household",
    description: "Urban renters & homeowners in estates, 2–4 bedrooms, dual income",
    income: "₦250,000–₦800,000/month household",
    electricitySpend: "₦15,000–₦50,000/month (prepaid + generator)",
    pains: [
      "Tokens run out unpredictably mid-week",
      "Can't tell if landlord/meter is accurate",
      "Generator diesel spend is invisible and untracked",
      "Spouse/partner disputes over electricity usage",
      "End-of-month shock when adding up all spend",
    ],
    triggers: [
      "Token running out unexpectedly",
      "Receiving high diesel bill from gateman",
      "Friend mentioning how much they saved",
      "WhatsApp group discussing electricity hacks",
    ],
    willingnessToPay: "High — ₦1,000–₦2,500/month if ROI is clear",
    channels: ["WhatsApp estate groups", "Facebook community pages", "Instagram/TikTok creators", "Google search"],
    objections: [
      "'Manual logging sounds tedious'",
      "'I can just use Excel'",
      "'Will this actually save me money?'",
    ],
    priority: 1,
  },
  {
    id: 2,
    name: "Generator-Heavy Household (Any City)",
    description: "Households running gen 6–16 hours/day, significant diesel cost",
    income: "₦400,000+ household income",
    electricitySpend: "₦40,000–₦150,000/month (heavy generator dependency)",
    pains: [
      "Diesel cost is invisible — paid in cash to gateman",
      "No sense of cost per hour of generator use",
      "Can't negotiate with gateman without data",
      "Generator maintenance timing is reactive, not planned",
    ],
    triggers: [
      "Diesel price increase",
      "Gateman dispute over fuel accounts",
      "Decision point on solar investment",
      "Month-end budget review",
    ],
    willingnessToPay: "Very high — spending so much that any visibility is valuable",
    channels: ["Facebook Groups", "WhatsApp", "Compound/estate notice boards", "Influencer content"],
    objections: [
      "'My gateman handles all of this'",
      "'I don't track this myself'",
    ],
    priority: 2,
  },
  {
    id: 3,
    name: "Small Landlord / Property Manager",
    description: "Owns 2–10 units, manages shared electricity, bills tenants",
    income: "Rental income ₦500,000–₦3M/month",
    electricitySpend: "₦50,000–₦300,000/month across properties",
    pains: [
      "Tenants dispute electricity bills constantly",
      "Hard to track spend across multiple properties",
      "Generator fuel theft by gateman",
      "No paper trail when disputes arise",
      "End of month bill collection is painful without records",
    ],
    triggers: [
      "Tenant dispute over electricity bill",
      "Trying to switch to prepaid metering",
      "Adding a new property to manage",
    ],
    willingnessToPay: "Very high — ₦2,500–₦5,000/month for multi-property features",
    channels: ["LinkedIn", "Real estate Facebook groups", "Property manager associations", "Referral from tenants"],
    objections: ["'I need something for multiple properties'", "'My accountant handles this'"],
    priority: 3,
  },
  {
    id: 4,
    name: "Young Professional / First Apartment",
    description: "20–32 years old, first time managing own electricity, tech-savvy",
    income: "₦100,000–₦300,000/month",
    electricitySpend: "₦8,000–₦25,000/month",
    pains: [
      "No baseline — don't know if their spend is 'normal'",
      "Anxious about end-of-month budget blowouts",
      "Just moved in, no historical reference",
      "Peer comparison anxiety ('am I spending too much?')",
    ],
    triggers: [
      "Moving into first apartment",
      "Token finishing unexpectedly for the first time",
      "Seeing a friend post about LUMINEST",
      "TikTok/Instagram content about money saving",
    ],
    willingnessToPay: "Medium — ₦500–₦1,500/month, sensitive to price",
    channels: ["TikTok", "Instagram", "Twitter/X", "Referral from friend"],
    objections: ["'I don't spend that much anyway'", "'I'll just be more careful'"],
    priority: 4,
  },
  {
    id: 5,
    name: "Budget-Conscious Family in Secondary Cities",
    description: "Families in Ibadan, Enugu, Kano, Aba — lower DISCO reliability, high generator reliance",
    income: "₦80,000–₦200,000/month household",
    electricitySpend: "₦10,000–₦40,000/month",
    pains: [
      "DISCO is even more unreliable — generator cost dominates",
      "Electricity spend feels out of control",
      "Few tools built for their reality",
      "Budgeting is stressful — electricity is unpredictable variable",
    ],
    triggers: [
      "Fuel price spike",
      "DISCO tariff increase",
      "Personal finance content in Yoruba/Igbo/Hausa",
    ],
    willingnessToPay: "Low-medium — ₦300–₦1,000/month, needs strong free tier",
    channels: ["WhatsApp", "Facebook", "Community radio (offline)", "Church/mosque groups"],
    objections: ["'I have bigger financial problems'", "'This is not for people like me'"],
    priority: 5,
  },
  {
    id: 6,
    name: "Diaspora-Connected Household",
    description: "Family receiving remittances, diaspora relative pays electricity remotely",
    income: "Remittance-supplemented, ₦200,000–₦500,000 equivalent",
    electricitySpend: "₦20,000–₦60,000/month",
    pains: [
      "Diaspora relative can't verify electricity spend claims",
      "Family asking for money for NEPA tokens — no accountability",
      "Diaspora wants visibility into what they're paying for",
    ],
    triggers: [
      "Request for more electricity money from family",
      "Diaspora relative wanting accountability",
      "Setting up regular electricity remittance",
    ],
    willingnessToPay: "High — diaspora willing to pay for visibility/accountability",
    channels: ["Diaspora Facebook groups", "UK/US Nigerian community WhatsApp", "Remittance app partnerships"],
    objections: ["'My family won't use a new app'"],
    priority: 6,
  },
];

export const valueProposition = {
  mvpFeatures: {
    essential: [
      "Manual electricity spend logging (NEPA token amount, units, date)",
      "Generator spend logging (fuel cost, hours run)",
      "Monthly spend dashboard (total spend, trend chart)",
      "Weekly spend summary notification (WhatsApp/SMS/email)",
      "Monthly report with simple insights ('You spent 20% more this month')",
      "Spend categories (prepaid NEPA, postpaid NEPA, generator, solar)",
      "Budget target setting ('Alert me when I hit ₦20,000/month')",
      "Simple tips/nudges based on logged data",
    ],
    niceToHave: [
      "Household member sharing (log together)",
      "Photo receipt upload for token purchases",
      "Landlord-tenant split view",
      "Export to PDF/Excel",
      "Peer benchmarking ('Average household in your area spends ₦X')",
      "Solar/inverter ROI calculator",
      "Predicted monthly spend based on current pace",
    ],
  },
  ahaMoment: {
    definition:
      "User sees their first monthly electricity spend total and it's higher than they mentally estimated — creating a genuine 'wow, I never knew' insight moment.",
    stepsToAhaMoment: [
      "Step 1 (0:00–1:00): Landing page hook — 'Do you know exactly what you spent on electricity last month?' Simple yes/no CTA",
      "Step 2 (1:00–2:00): Frictionless signup — phone number + name only, no email required for MVP",
      "Step 3 (2:00–3:00): Onboarding question — 'How do you mainly get electricity?' (Prepaid NEPA / Postpaid / Generator / Mix)",
      "Step 4 (3:00–4:30): First log prompt — 'Log your last token purchase right now. How much did you buy?' Simple ₦ input field",
      "Step 5 (4:30–5:00): Instant feedback — 'Great! At this pace, you'll spend ₦[X] this month on electricity. Most households in Lagos spend ₦[Y].' — THIS is the Aha moment.",
    ],
  },
  subscriptionTiers: [
    {
      name: "FREE — 'Track'",
      price: "₦0/month",
      features: [
        "Manual log up to 10 entries/month",
        "Basic monthly total dashboard",
        "1 email summary per month",
        "Up to 3 months history",
      ],
      targetUser: "New users, skeptics, students",
    },
    {
      name: "SAVER — 'Understand'",
      price: "₦800/month placeholder (or ₦7,500/year)",
      features: [
        "Unlimited manual logging",
        "Full dashboard with trends and charts",
        "Weekly WhatsApp/SMS summaries",
        "Budget alerts and overspend warnings",
        "12 months history",
        "Monthly savings insights",
        "Export to PDF",
      ],
      targetUser: "Active household managers, young professionals",
    },
    {
      name: "HOUSEHOLD PRO — 'Control'",
      price: "₦1,800/month placeholder (or ₦16,000/year)",
      features: [
        "Everything in Saver",
        "Up to 3 household members logging",
        "Category breakdown (NEPA vs gen vs solar)",
        "Landlord-tenant split view",
        "Peer benchmarking by city/neighbourhood",
        "Priority customer support",
        "Generator ROI calculator",
      ],
      targetUser: "Families, landlords with 1–2 properties, generator-heavy households",
    },
    {
      name: "PROPERTY MANAGER — 'Scale'",
      price: "₦4,500/month placeholder",
      features: [
        "Everything in Household Pro",
        "Up to 10 properties/units",
        "Consolidated property spend view",
        "Tenant billing records",
        "Bulk export and reporting",
        "Dedicated account support",
      ],
      targetUser: "Small landlords, estate managers, property businesses",
    },
  ],
};

export const acquisitionChannels = [
  {
    channel: "WhatsApp",
    why: "Nigeria's #1 communication platform. Estate groups, family chats, and community groups are where household decisions are discussed and shared. Organic sharing is high if content hits the right pain.",
    audience: "All segments, especially estate residents and family groups",
    creatives: [
      "Voice note from 'Adaeze': 'I used to spend ₦45k a month on electricity and had no idea. LUMINEST showed me exactly where the money was going — I cut it to ₦32k in 6 weeks.'",
      "Simple graphic: 'Do you know what you spent on NEPA last month? Most Lagos households guess 40% lower than reality. Check yours free at luminest.africa'",
      "Mini-challenge: 'WhatsApp Electricity Audit' — share your monthly spend, LUMINEST gives you a free benchmark vs your area",
    ],
    cadence: "3x weekly: Mon (tip/insight), Wed (user story), Fri (challenge/CTA). Seed into 10 estate groups per week via community managers.",
  },
  {
    channel: "Facebook / Instagram",
    why: "Nigeria's largest paid social platform for 25–45 age group. Estate groups on Facebook have hundreds of thousands of engaged members. Instagram for visual savings content.",
    audience: "Middle-class households, 28–45, Lagos/Abuja primary",
    creatives: [
      "Carousel: '5 reasons your NEPA token finishes faster than it should' — tip 5 leads to LUMINEST",
      "Video ad (15s): Relatable skit — husband and wife arguing about who used all the electricity units. End card: 'LUMINEST. Know who used what. Stop the argument.'",
      "Static: Before/After — 'Month 1 without LUMINEST: ₦52,000 spent, no idea how. Month 2 with LUMINEST: ₦38,000 spent, full picture.'",
    ],
    cadence: "Run 2–3 paid ad sets/week. ₦5,000–₦15,000/day budget (assumption). Post organically 5x/week on Instagram. Join and post in 20+ Facebook estate groups weekly.",
  },
  {
    channel: "TikTok",
    why: "Fastest-growing platform in Nigeria. 'Money hack' and 'life hack' content goes massively viral. Young professionals (Segment 4) are prime TikTok users.",
    audience: "18–32, urban, first-apartment renters, side-hustle generation",
    creatives: [
      "'POV: You finally check how much you've spent on NEPA this year' — shock reveal format",
      "'I tracked my electricity for 30 days — here's what happened to my budget' — transformation story",
      "Duet challenge: 'Guess your monthly electricity spend — then check LUMINEST to see the truth'",
    ],
    cadence: "Post 5x/week. Partner with 3–5 Nigerian finance/lifestyle TikTok creators for monthly campaigns. Track virality and double down on formats that work.",
  },
  {
    channel: "Google Search",
    why: "High-intent traffic. Nigerians actively search for electricity bill help, NEPA token tracking, generator cost calculation.",
    audience: "High-intent searchers with a specific problem right now",
    creatives: [
      "Ad: 'Track Your NEPA & Generator Spend — Free. LUMINEST AFRICA — Nigeria's First Electricity Budget App'",
      "SEO content: 'How much does the average Lagos household spend on electricity?' / 'How to track NEPA prepaid tokens' / 'Generator fuel cost calculator Nigeria'",
    ],
    cadence: "Launch 5 core keywords at launch. Add 5 new SEO content pieces per month. Google Ads budget ₦50,000–₦150,000/month (assumption).",
  },
  {
    channel: "Community Groups (Online + Offline)",
    why: "Nigerian estate WhatsApp groups, Nairaland, Facebook estate groups have thousands of highly-relevant members who trust peer recommendations above all advertising.",
    audience: "Estate residents, homeowner associations, religious community members",
    creatives: [
      "Community manager posts organic value: '10 ways to reduce your token spend this month' — no hard sell, just value + soft LUMINEST mention",
      "Offline flyers in estate reception areas, estate notice boards, church/mosque bulletin boards",
    ],
    cadence: "Identify and join 50+ relevant online communities in first 30 days. Post value 3x/week. Monthly offline activations in 5 target estates.",
  },
  {
    channel: "Referral Program",
    why: "Word-of-mouth is Nigeria's most trusted acquisition channel. Building a referral loop into the product with tangible rewards creates viral growth without ad spend.",
    audience: "Existing users, especially those who've had the Aha moment",
    creatives: [
      "Mechanic: Share your unique link → your friend signs up → both get 1 month SAVER free",
      "Leaderboard: 'Top referrer in Lagos this month wins 1 year free Pro subscription'",
      "WhatsApp-native sharing: One tap sends a pre-written WhatsApp message with personal referral link",
    ],
    cadence: "Launch referral program at Week 6. Feature top referrers on social media monthly. Send weekly referral nudge to users who haven't referred yet.",
  },
  {
    channel: "Influencer / Creator Partnerships",
    why: "Nigerian personal finance creators (Instagram, TikTok, YouTube) have massive engaged audiences who trust their recommendations on money-saving tools.",
    audience: "Followers of Nigerian finance, lifestyle, and home management creators",
    creatives: [
      "Partner with 3 macro finance influencers (100k–500k followers) for sponsored posts showing real LUMINEST use",
      "Seed product to 20 micro-influencers (5k–30k) in Lagos estates, personal finance, and housewife niches for authentic reviews",
      "YouTube: 'I tracked every naira I spent on electricity for 90 days — here's what I found' (sponsored)",
    ],
    cadence: "Launch with 2 macro + 5 micro influencers in Month 1. Add 5 micro influencers per month ongoing. Track promo codes for attribution.",
  },
  {
    channel: "Offline Activations",
    why: "Lagos market activations, estate events, and community meetups build trust and generate social content simultaneously — powerful for a product asking Nigerians to trust a new app with financial data.",
    audience: "Estate residents, market shoppers, church/mosque communities",
    creatives: [
      "Estate activation: Set up a free 'Electricity Audit Booth' — help residents calculate their monthly spend on the spot, show LUMINEST, sign them up",
      "Market activations with USSD sign-up flow: No smartphone needed — USSD registration at key markets in Lagos, Ibadan, Abuja",
      "Church/mosque 'Financial Wellness' talk: Partner with pastors/imams to include electricity tracking as part of financial stewardship content",
    ],
    cadence: "2 estate activations per month from Month 2. One major market activation per city per quarter.",
  },
];

export const partnerships = [
  {
    name: "Estate Associations & Residents' Committees",
    valueExchange: "LUMINEST gets direct access to 500–5,000 households per estate. Estate gets a branded tool to help residents manage shared electricity costs and reduce disputes.",
    approachScript: "Hello [Estate Chairman/Secretary], we're LUMINEST AFRICA — Nigeria's first electricity tracking app for households. We'd love to offer every resident of [Estate Name] free access to our Household Pro plan for 3 months, with your estate's name on their dashboard. In return, we'd love 10 minutes to present at your next residents' meeting. No cost to the estate.",
    pilotStructure: "3-month pilot in 2 estates. Measure: signup rate among residents, engagement, referral rate. Offer estate a co-branded experience.",
    priority: "High",
  },
  {
    name: "Prepaid Meter / Token Vendors",
    valueExchange: "LUMINEST integrates the logging moment right at point of token purchase. Vendors get a value-add service to offer customers. LUMINEST gets acquisition at the most relevant moment.",
    approachScript: "When a customer buys a token from you, they could instantly log it in LUMINEST and track their usage for the month. We'd put a QR code and flyer at your shop — customers scan, sign up, log their purchase. We pay you ₦50 for every user who signs up via your shop and makes their first log.",
    pilotStructure: "Pilot with 20 token vendors in Lagos Island and Surulere. Track QR scans, signups, and first-log rate.",
    priority: "High",
  },
  {
    name: "Paystack / Flutterwave",
    valueExchange: "LUMINEST gets best-in-class payment infrastructure (card, bank transfer, USSD). Payment provider gets a fintech case study and potential co-marketing.",
    approachScript: "Standard integration partnership. Apply to Paystack's startup program for reduced fees in Year 1. Request co-marketing opportunity in their newsletter/social.",
    pilotStructure: "Integration at launch. Co-marketing blog post after 6 months.",
    priority: "Critical",
  },
  {
    name: "Personal Finance Apps (Cowrywise, PiggyVest, Kuda)",
    valueExchange: "LUMINEST gets access to Nigeria's most financially-aware app users — perfect ICP. Finance apps get a useful partner product to recommend, increasing their own stickiness.",
    approachScript: "Hello [Partner], our users are your users — Nigerians serious about their money. 67% of LUMINEST users say electricity is their top uncontrolled household expense. We'd love to explore a mutual referral arrangement — you recommend LUMINEST to users doing budget reviews, we recommend your savings/investment tools to users who free up money through electricity savings.",
    pilotStructure: "3-month referral pilot. Track mutual conversion rates. Share anonymized aggregate data insights.",
    priority: "High",
  },
  {
    name: "Telecom Partners (MTN, Airtel for USSD)",
    valueExchange: "LUMINEST gets reach to feature phone users and low-data environments. Telecom gets a valuable utility app on their USSD menu.",
    approachScript: "Formal B2B approach via telecom startup programs. Position LUMINEST as a financial wellness utility. Seek USSD shortcode for signup and basic logging — targeting Segment 5 (secondary cities, lower income).",
    pilotStructure: "6-month USSD pilot targeting Northern Nigeria and secondary cities. Measure USSD signup vs web signup conversion.",
    priority: "Medium",
  },
  {
    name: "Solar / Inverter Companies (Rensource, Lumos, etc.)",
    valueExchange: "LUMINEST users who track generator costs are prime prospects for solar. Solar companies get qualified warm leads. LUMINEST gets a premium partnership and potential revenue share.",
    approachScript: "Hello [Solar Company], our users track their generator spend and many are actively considering solar. When a LUMINEST user's data shows they're spending over ₦50,000/month on generator fuel, we show them a solar ROI calculator and a referral to your company. We'd like to discuss a lead referral arrangement.",
    pilotStructure: "Pilot with 1 solar company. Track referral clicks and conversion to solar consultation. Revenue share model.",
    priority: "Medium",
  },
];

export const metrics = {
  northStar: "Weekly Active Loggers (WAL) — users who log at least one electricity entry in a given week",
  rationale: "WAL captures product-market fit (do people find it useful enough to log regularly?), predicts retention, and leads paid conversion.",
  inputMetrics: [
    "New signups per week",
    "% of signups who complete first log within 24 hours",
    "Average logs per user per week",
    "WhatsApp summary open rate (proxy for engagement)",
    "Referral invite send rate",
    "Free-to-paid conversion rate",
    "Monthly churn rate (paid subscribers)",
  ],
  funnelMetrics: [
    { stage: "Visit", metric: "Website visits/week", month1_3: "5,000–15,000/week", month4_6: "20,000–40,000/week", month7_12: "50,000–100,000/week" },
    { stage: "Signup", metric: "New registrations", month1_3: "500–1,500/week", month4_6: "2,000–4,000/week", month7_12: "5,000–10,000/week" },
    { stage: "First Log", metric: "% who log within 24h", month1_3: "35–45%", month4_6: "45–55%", month7_12: "55–65%" },
    { stage: "Week 2 Retention", metric: "% active in Week 2", month1_3: "25–35%", month4_6: "35–45%", month7_12: "40–50%" },
    { stage: "Week 4 Retention", metric: "% active at Day 30", month1_3: "15–25%", month4_6: "20–30%", month7_12: "25–35%" },
    { stage: "Paid Conversion", metric: "% converting to paid", month1_3: "3–5%", month4_6: "8–12%", month7_12: "12–18%" },
    { stage: "Paid Retention", metric: "Monthly churn (paid)", month1_3: "<15%", month4_6: "<12%", month7_12: "<8%" },
  ],
  targets: [
    { period: "Month 1–3", registered: "5,000", paid: "300", arr_estimate: "₦2.9M", notes: "Assumption — seed phase, heavy Lagos focus" },
    { period: "Month 4–6", registered: "20,000", paid: "2,000", arr_estimate: "₦19.2M", notes: "Assumption — referral flywheel kicking in" },
    { period: "Month 7–12", registered: "50,000", paid: "8,000", arr_estimate: "₦76.8M", notes: "Assumption — national expansion, partnerships live" },
  ],
};

export const launchPlan = [
  { week: 1, phase: "Pre-Launch", activities: ["Finalize web app MVP", "Set up Paystack integration", "Create WhatsApp Business account", "Identify 10 beta estate communities"], deliverables: ["Working web app", "Payment flow tested"], owner: "Tech + Product", budget: "₦0 (internal)" },
  { week: 2, phase: "Pre-Launch", activities: ["Recruit 50 beta users from personal networks", "WhatsApp group for beta feedback", "Create social media accounts (Instagram, TikTok, Facebook Page)", "Draft 4 weeks of content"], deliverables: ["50 beta users onboarded", "Content calendar ready"], owner: "Marketing + Founder", budget: "₦50,000 (content creation)" },
  { week: 3, phase: "Pre-Launch", activities: ["Beta user feedback collection", "Fix top 5 product issues from beta", "Record first 3 TikTok/Instagram videos", "Reach out to 5 micro-influencers"], deliverables: ["Beta feedback report", "First 3 videos"], owner: "Product + Marketing", budget: "₦100,000 (influencer seeds)" },
  { week: 4, phase: "Pre-Launch", activities: ["Onboard 2 estate associations for soft launch", "Set up Google Analytics + Mixpanel", "Create WhatsApp broadcast list", "Write first 5 SEO blog posts"], deliverables: ["2 estate partnerships signed", "Analytics live"], owner: "Partnerships + Tech", budget: "₦80,000 (blog + SEO tools)" },
  { week: 5, phase: "Soft Launch", activities: ["Public launch to beta estates", "First Facebook/Instagram paid ads (small budget)", "3 micro-influencer posts live", "WhatsApp broadcast to personal networks"], deliverables: ["500+ signups target", "First paid ads live"], owner: "All hands", budget: "₦200,000 (ads)" },
  { week: 6, phase: "Soft Launch", activities: ["Activate referral program", "First weekly WhatsApp newsletter", "TikTok content push (5 videos)", "Monitor funnel — fix drop-offs"], deliverables: ["Referral program live", "First 50 paid subscribers target"], owner: "Marketing + Product", budget: "₦150,000 (ads + content)" },
  { week: 7, phase: "Growth", activities: ["First estate activation event (Lagos)", "Reach out to 3 macro influencers", "Google Search Ads launch", "Community manager joins team"], deliverables: ["Estate event with 200+ attendees", "Google Ads live"], owner: "Marketing + Community", budget: "₦400,000 (event + ads)" },
  { week: 8, phase: "Growth", activities: ["Analyze Week 1–7 data", "Double down on top-performing channels", "First PR push (TechCabal, Techpoint, Nairametrics)", "Launch annual subscription discount promotion"], deliverables: ["Channel attribution report", "2+ press mentions"], owner: "Marketing + Founder", budget: "₦200,000 (PR + content)" },
  { week: 9, phase: "Growth", activities: ["Partnership pitch to Cowrywise / PiggyVest", "Second estate activation", "Launch 'Electricity Budget Challenge' on social", "Begin Abuja market research"], deliverables: ["Partnership meeting scheduled", "Challenge campaign live"], owner: "Partnerships + Marketing", budget: "₦300,000" },
  { week: 10, phase: "Growth", activities: ["Analyze 60-day retention data", "Ship top 3 retention features from feedback", "Paystack / payment optimization review", "Prep Phase 2 (Abuja) GTM"], deliverables: ["Feature update shipped", "Abuja GTM draft"], owner: "Product + Marketing", budget: "₦150,000" },
  { week: 11, phase: "Expansion Prep", activities: ["First Abuja community manager hired", "Abuja estate association outreach begins", "Refine paid acquisition targeting based on 10-week data", "First monthly user report (internal)"], deliverables: ["Abuja CM onboarded", "User report"], owner: "Ops + Marketing", budget: "₦500,000 (salary + ops)" },
  { week: 12, phase: "Expansion Prep", activities: ["Abuja soft launch", "90-day retrospective — what worked, what didn't", "Investor update prep", "Set Q2 OKRs"], deliverables: ["Abuja launch live", "90-day retrospective doc", "Q2 plan"], owner: "Founder + All", budget: "₦300,000" },
];

export const risks = [
  {
    risk: "Manual Logging Fatigue",
    severity: "High",
    description: "Users sign up, log once or twice, then stop. Without automatic data, habits are hard to form.",
    mitigations: [
      "Make each log take < 15 seconds (minimal fields, smart defaults)",
      "Immediate value feedback after every log ('You've spent ₦X this month, ₦Y below your budget')",
      "WhatsApp reminders on token-buying days ('Did you top up today? Log it in 10 seconds')",
      "Weekly summary report delivered to WhatsApp — pull users back even if they haven't logged",
      "Gamification: streaks, badges, 'Consistent Tracker' status on profile",
    ],
    experiment: "A/B test: reminder timing (morning vs evening) and message framing (guilt vs encouragement)",
  },
  {
    risk: "Low Perceived Value Before Aha Moment",
    severity: "High",
    description: "Users who don't reach the Aha moment in first session will churn immediately.",
    mitigations: [
      "Pre-populate onboarding with average Lagos household spend as a benchmark before they even log",
      "Show 'Your estimated monthly spend' based on just ONE entry to create immediate value",
      "Use peer benchmarking social proof ('10,000 Lagos households track with LUMINEST')",
    ],
    experiment: "Test 3 different onboarding flows — measure % reaching 'first insight' within 5 minutes",
  },
  {
    risk: "Payment Trust Barrier",
    severity: "High",
    description: "Nigerian users are highly skeptical of app subscriptions — fear of being charged without consent, poor customer service, no refunds.",
    mitigations: [
      "Show real-name customer support contact (WhatsApp number) on payment page",
      "Instant receipt via WhatsApp and email after every payment",
      "Clear cancellation flow — 1-tap cancel, no hidden charges",
      "Money-back guarantee for first month (₦0 risk trial)",
      "Show 'Secured by Paystack' badge prominently",
    ],
    experiment: "Test monthly vs annual billing as default offer — measure conversion and churn difference",
  },
  {
    risk: "Data Accuracy Anxiety",
    severity: "Medium",
    description: "Users worry their manually-logged data is inaccurate or that LUMINEST's insights are misleading.",
    mitigations: [
      "Always frame insights as estimates/trends, not exact figures ('approximately', 'around', 'roughly')",
      "Educate users: 'Even 70% accurate data gives you 80% of the insight value'",
      "Allow easy correction of logged entries",
      "Show data confidence level based on number of entries",
    ],
    experiment: "Test dashboard language — 'Your estimated spend' vs 'Your tracked spend' — measure user trust surveys",
  },
  {
    risk: "Copycat / Competitor",
    severity: "Medium",
    description: "A funded competitor (or existing PFM app) could add electricity tracking feature.",
    mitigations: [
      "Build community moat (WhatsApp groups, estate partnerships) that is hard to replicate",
      "Move fast to sign exclusive estate association partnerships",
      "Build Nigeria-specific depth (DISCO tariff database, generator cost benchmarks) competitors won't bother with",
      "Establish brand as THE electricity tracking brand before competition arrives",
    ],
    experiment: "Monthly competitive intelligence review — track PFM apps for feature updates",
  },
  {
    risk: "Generator-Only Households",
    severity: "Low-Medium",
    description: "Users who rely entirely on generators may find prepaid-focused features irrelevant.",
    mitigations: [
      "Ensure generator logging is a first-class feature from Day 1",
      "Create generator-specific dashboard view",
      "Generator-focused content: 'How to reduce generator spend by 30%'",
    ],
    experiment: "Segment onboarding by power type and measure feature engagement per segment",
  },
];

export const gtmDashboard = {
  northStar: "Weekly Active Loggers (WAL)",
  weeklyTargets: {
    month1: "500 WAL",
    month3: "2,000 WAL",
    month6: "8,000 WAL",
    month12: "25,000 WAL",
  },
  keyExperiments: [
    "Onboarding flow: 3-variant test for Aha moment timing",
    "WhatsApp reminder: morning vs evening vs token-day triggers",
    "Pricing: monthly vs annual default offer",
    "Referral reward: free month vs cash credit vs points",
    "Channel: WhatsApp organic vs TikTok creators vs Facebook ads — CAC comparison",
  ],
  weeklyRhythm: [
    "Monday: Review prior week metrics dashboard",
    "Tuesday: Ship any product fixes/features",
    "Wednesday: Community posts + WhatsApp newsletter",
    "Thursday: Influencer/partnership outreach",
    "Friday: Content creation for weekend scheduling",
    "Saturday: Social media engagement + community responses",
    "Sunday: Weekly team async retrospective",
  ],
  monthlyRhythm: [
    "Week 1: Campaign planning + content calendar",
    "Week 2: Partnership meetings + outreach",
    "Week 3: Product review + feature prioritization",
    "Week 4: Metrics review + retrospective + next month planning",
  ],
  budgetRanges: {
    low: "₦500,000/month — content-first, organic, community-led",
    medium: "₦2,000,000/month — paid social + influencers + offline activations",
    high: "₦5,000,000/month — full-stack paid acquisition + PR + events + partnerships",
  },
};
