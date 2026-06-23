# Revlane — Business Knowledge Base

## 1. What Revlane Is
Revlane is a performance-based funnel agency targeting coaches. It builds complete conversion funnels — landing pages, nurture email sequences, and booking flows — and charges nothing upfront. The flat fee is triggered only when discovery call bookings increase by 30%+ over a 30-day baseline. This is the core value proposition: zero financial risk for the client, skin in the game for you.
**Current status:** Pre-revenue. First client not yet closed. Outreach is live and ongoing.

## 2. Target Market
- **Vertical:** Business, life, career, and executive coaches.
- **Geography:** English-speaking markets — US, UK, Canada.
- **ICP Title Logic:**
  - **Include:** Any title containing the word "Coach" (business coach, life coach, executive coach, career coach, leadership coach, etc.)
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
- **Single Direct-to-Call page:** $600
- **Full funnel (all components):** $1,200–$1,500
- **Upfront cost to client:** $0
- **Trigger for payment:** 30%+ increase in discovery call bookings over 30-day baseline.
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
1. **Lead Finder (Next.js + SerpAPI):** Takes Boolean LinkedIn search queries with geoUrn, outputs raw lead list with LinkedIn profiles and website URLs.
2. **Python Qualifier (leads_qualifierV2):** Filters by 30-day LinkedIn activity. Scrapes public profiles (via Googlebot UA) and deduplicates against the 'All Leads' sheet.
3. **Email Verification:** Built directly inside the lead qualifier project.
4. **Hook Generator (scraper/extractor.py):** Uses Groq (Llama 3.3 70B) as primary, Cerebras as fallback, to generate personalized `{"hook": "..."}` JSON.
5. **Google Sheets CRM:** n8n writes the qualified leads + hooks here.
6. **Instantly Import:** For outreach.

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
- **Lead pipeline:** Fully functional; email verification step is built into the qualifier.
- **n8n tracking system:** In active development.
- **Proof / case studies:** None yet (free case study campaign is the solution).
- **Pricing validation:** Not validated — no paying client yet.

## 11. Personal Brand (Planned)
- **Phase 1 (Algerian account):** Instagram (Darija). Documenting the Revlane build, marketing education, mindset.
- **Phase 2 (English account):** Tied directly to Revlane brand (Launched after Phase 1 has traction and results).

## Summary Snapshot
Revlane is a zero-upfront funnel agency for coaches, built on a performance model that removes financial risk for clients. The offer is technically sound and differentiated. The infrastructure — outreach, lead pipeline, CRM, automation — is largely built. The only thing separating current state from revenue is one closed deal, which the free case study campaign is designed to unlock. Everything downstream (pricing validation, case studies, referrals, brand) depends on that first result.
