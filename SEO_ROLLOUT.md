# Compel free search growth rollout

## What is ready in the site

- `/learn` is a crawlable hub for the 100 existing guides. Resource links are shown on non-home pages; the homepage stays focused on discovery-call conversion.
- `/tools/coaching-funnel-calculator` gives coaches a free way to calculate their own funnel rates and links back to the relevant guides.
- The homepage, niche pages, and articles have distinct canonical URLs. The thank-you page is excluded from indexing.
- XML sitemaps include the hub and canonical content URLs. Article `lastmod` is emitted only when an `updated` frontmatter date is supplied.
- The site allows crawlers, including OAI-SearchBot, through `robots.txt`. This creates eligibility for discovery, not a guarantee of an AI citation.
- GA4 events now distinguish a submitted lead (`generate_lead`) from a booked Calendly call (`book_discovery_call`).

## First 30 days after deployment

1. In Google Search Console, submit `/sitemap.xml` again and inspect `/`, `/learn`, `/coaches/business-coaching`, `/coaches/executive-coaching`, and five priority guides. Watch indexing status, impressions, and the actual queries that surface each page.
2. Set up Bing Webmaster Tools and submit the same sitemap. Review its AI Performance report for cited pages and grounding queries once data is available.
3. Review the 100 article drafts for first-hand evidence, source attribution, and the accuracy of Compel's offer. Many currently contain unverified conversion benchmarks or claims that Compel has audited hundreds or thousands of funnels. Publish a real case study once there is a consented client result; include the baseline, intervention, period, and outcome.
4. Improve the strongest ten guides based on Search Console impressions: add a concise answer to the target question, a worked example, useful diagrams or screenshots, and links to a related service page. Consolidate overlapping posts when they answer the same query.
5. Seek relevant mentions through founder interviews, coaching podcasts, partner articles, and genuinely useful resources. Track referred visits and qualified calls, not link counts.

## Free distribution plan

- Prioritize executive and business coach questions that match Compel's service: funnel setup, landing page conversion, qualification, booking flow, and follow-up. Link each useful guide to its relevant service page and to related guides.
- Publish a practical teardown using a page or funnel you have permission to discuss. Show the specific problem, proposed change, and how a coach could measure the effect. Label hypothetical examples clearly.
- Turn each useful guide into a founder-led LinkedIn post, a short walkthrough video, and a relevant answer in communities where coaching business owners ask the same question. Link to the full guide only when it genuinely helps the conversation.
- Pitch a concrete lesson or teardown to coaching podcasts, newsletters, and complementary tools. Earned mentions and qualified referrals matter more than volume of backlinks.
- Once you have a real client result, publish a consented case study with the before metric, the exact work, the time window, and the result. Until then, lead with process and examples rather than invented proof.

## Conversion measurement

Treat `book_discovery_call` as the primary success event and `generate_lead` as an earlier funnel event. In GA4, confirm both in DebugView or Realtime with a real test submission and booking. Mark the chosen event as a key event. Track organic search visits → submitted leads → booked calls → qualified calls → customers by landing page.

## AI answer visibility

Google says its AI search features rely on core search ranking systems and require no special AI schema. OpenAI says public pages can appear in ChatGPT search when OAI-SearchBot can crawl them. Bing's AI Performance report can show citations in its supported AI experiences. Clear, original, sourced answers and a consistent account of Compel's service are the useful work here; no file or markup can force another model to recommend the brand.

## Primary references

- [Google: optimizing for generative AI in Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [OpenAI: web crawlers](https://developers.openai.com/api/docs/bots)
- [Bing: AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)
- [GA4: recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
