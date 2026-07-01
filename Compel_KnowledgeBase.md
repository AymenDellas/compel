# Compel — Business Knowledge Base

## 1. What Compel Is
Compel is a performance-based funnel agency targeting executive and business coaches. It builds complete conversion funnels — landing pages, nurture email sequences, and booking flows — and charges nothing upfront. Clients only pay if discovery call bookings increase. The performance guarantee is the actual offer; the funnel is the delivery mechanism. This is the core value proposition: zero financial risk for the client, skin in the game for you.
**Current status:** Pre-revenue. First client not yet closed. Outreach is live and ongoing.

## 2. Target Market
- **Vertical:** Executive and business coaches (primary). Life and career coaches (secondary).
- **Geography:** English-speaking markets — US, UK, Canada.
- **ICP Title Logic:**
  - **Include (primary):** Executive coach, business coach, leadership coach
  - **Include (secondary):** Life coach, career coach — if strong qualifying signals present
  - **Exclude:** Founder, CEO, Consultant — unless paired explicitly with "Coach"
- **Qualifying Signals (LinkedIn-based):**
  - Active on LinkedIn within the last 30 days
  - Has a website (for funnel audit and page analysis)
  - Shows signs of running or trying to run an inbound funnel

## 3. Service Offering — Three Templates
Each template is a full conversion funnel (page copy + design, nurture email sequence, and booking flow integrated with Calendly/etc.):
1. **VSL (Video Sales Letter):** Long-form video-led page with written support copy. (For higher-ticket offers, coaches with strong on-camera presence)
2. **Direct-to-Call:** Page built specifically to drive booking form completions. (For coaches selling discovery calls as primary CTA)
3. **Lead Magnet:** Opt-in funnel: freebie → email nurture → call booking. (For coaches with cold or awareness-stage audiences)

## 4. Pricing
- **Full funnel (all components):** $1,500–$3,000
- **Upfront cost to client:** $0
- **Trigger for payment:** Discovery call bookings increase.
*(The performance model eliminates the "I don't know if this will work" objection).*

## 5. Cold Outreach System
- **Platform:** Instantly (API key tier). Email campaigns running to coach prospects.
- **Infrastructure:** Multiple sending domains, SPF/DKIM/DMARC setup, warmed at mailbox level, deliverability managed.
- **Sequence Structure (Post-Reply Flow):**
  1. Initial email → CTA is "Interested?" (for free case study campaign to break no-proof loop).
  2. Reply received → Send qualifying question.
  3. Second reply → Send same-day Loom with calendar link + specific available slots.
  4. No booking after Loom → 48-hour follow-up.
  5. Still no response → Breakup email.
  *Key Principle: Loom videos are sent only after a qualifying exchange — never cold and unsolicited.*

## 6. Lead Generation Pipeline
A chained, semi-automated pipeline that goes from raw LinkedIn search to qualified leads in Google Sheets.
**Pipeline Chain:**
1. **Lead Finder (Python Flask + Serper API):** Fully automated discovery engine that dynamically generates 900+ boolean queries combining niches (e.g., Executive Coach) with 150+ global cities. 
   - **Key Features:** Seamless multi-key Serper rotation, early-termination logic, cross-query deduplication (skips remaining pages if >70% overlap is detected), continuous emergency streaming to disk (no data lost on crash), and a premium glassmorphism dark-mode frontend. Leads are saved to a central local JSON store.
2. **Google Sheets Sync:** From the Lead Finder UI, leads can be routed to country-specific sheets (e.g., US, UK, Canada, Australia) with a single click.
3. **Python Qualifier (leads_qualifierV2):** Filters by 30-day LinkedIn activity. Scrapes public profiles (via Googlebot UA) and deduplicates against the 'All Leads' sheet.
4. **Email Verification:** Built directly inside the lead qualifier project.
5. **Hook Generator (scraper/extractor.py):** Uses Groq (Llama 3.3 70B) as primary, Cerebras as fallback, to generate personalized `{"hook": "..."}` JSON.
6. **Automation (n8n Workflow):** Writes the qualified leads + hooks into Google Sheets for CRM.
7. **Instantly Import:** For outreach.

**Tools:**
- **React Lead Cleaner Tool:** JSX artifact that accepts CSV upload, removes invalid rows, and downloads a clean output.

## 7. Automation Pipeline (n8n Workflow)
**File Reference:** `latest.json` (Lead Gen Pipeline)
- **Schedule Trigger:** Runs automatically.
- **Google Sheets:** Reads leads from "Leads Inbox" (Sheet2).
- **Processing Loop:**
  - Sends lead to `http://qualifier:3000/api/process-lead`
  - Polls for completion.
  - If `activityStatus == Active` and `website` is not empty:
    - Sends website to `http://scraper:5000/api/personalize` for hook generation.
    - Appends result row (linkedin_url, name, website, email, hook) to "n8n_Results" (Sheet1).
  - Loop continues with a 20s wait.

## 8. AI Tools Built
Built as HTML artifacts using Anthropic API (Claude Sonnet 4):
1. **Hormozi Advisor:** Chat interface using $100M frameworks.
2. **Naval Ravikant Advisor:** Five-dimension analysis.
3. **Rick Rubin Creative Advisor:** Creative direction ideation.
4. **Book-to-Framework Extractor:** PDF.js for client-side text extraction (avoids long-context billing).
5. **AI Funnel Audit Tool:** Public-facing lead gen asset (copy-paste only).

## 9. Influence & Strategic Frameworks Applied
- **Cialdini's Reciprocity:** Free case study campaign; give value before asking for commitment.
- **Commitment-Consistency:** "Interested?" CTA gets a small yes first.
- **Hormozi's Offer Construction:** Risk reversal (zero upfront) makes the offer hard to refuse.
- **Free Case Study Strategy:** First-client acquisition mechanic to document results and use as social proof.

## 10. Current Bottlenecks & Status
- **First client:** Not yet closed — active outreach ongoing.
- **Email deliverability:** Resolved and operational.
- **Reply-to-call conversion:** Rebuilt — new sequence live.
- **Lead pipeline:** Fully functional; Lead Finder overhauled with dynamic multi-query engine, robust key rotation, and premium UI. Email verification is built into the qualifier.
- **n8n tracking system:** In active development.
- **Proof / case studies:** Zero social proof — this is the core bottleneck. Free case study campaign is the designed solution.
- **Pricing validation:** Not validated — no paying client yet.

## 11. Brand Identity
- **Agency name:** Compel (rebranded from Revlane)
- **Website:** getcompel.co
- **Logo concept:** Weight Pull wordmark
- **Brand palette:** Near-black, warm off-white, electric lime

## 12. Personal Brand (Planned)
- **Phase 1 (Algerian account):** Instagram (Darija). Documenting the Compel build, marketing education, mindset.
- **Phase 2 (English account):** Tied directly to Compel brand (Launched after Phase 1 has traction and results).

## Summary Snapshot
Compel is a zero-upfront funnel agency for coaches, built on a performance model that removes financial risk for clients. The offer is technically sound and differentiated. The infrastructure — outreach, lead pipeline, CRM, automation — is largely built. The only thing separating current state from revenue is one closed deal, which the free case study campaign is designed to unlock. Everything downstream (pricing validation, case studies, referrals, brand) depends on that first result.
