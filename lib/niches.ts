export interface NicheConfig {
  slug: string;
  displayName: string;
  title: string;
  description: string;
  h1Keyword: string;
  keywords: string[];
  challenge: string;
  approach: string;
  guideSlug: string;
  guideLabel: string;
}

export const NICHE_CONFIG: Record<string, NicheConfig> = {
  'business-coaching': {
    slug: 'business-coaching',
    displayName: 'Business Coaches',
    title: 'Conversion Design for Business Coaches | Compel',
    description:
      'Make your coaching offer easier to understand and give interested founders and business owners a clearer path to a qualified conversation.',
    h1Keyword: 'Business Coaches',
    keywords: [
      'business coaching funnel',
      'business coach marketing',
      'business coach lead generation',
    ],
    challenge: 'A business coach may have a strong referral pipeline but no consistent path from a new website visitor to a qualified call.',
    approach: 'We connect a focused offer page, proof and qualification, email follow-up, and a short booking flow so each step can be measured.',
    guideSlug: 'business-coaching-client-acquisition',
    guideLabel: 'Business coach client acquisition guide',
  },
  'career-coaching': {
    slug: 'career-coaching',
    displayName: 'Career Coaches',
    title: 'Landing Pages and Booking Journeys for Career Coaches | Compel',
    description:
      'Help interested professionals understand your career coaching offer, find the right service and take a considered next step.',
    h1Keyword: 'Career Coaches',
    keywords: [
      'career coaching funnel',
      'career coach client acquisition',
      'career coach marketing',
    ],
    challenge: 'Career coaching prospects often need to understand the specific career outcome and whether the offer fits their stage before booking.',
    approach: 'A clear problem-specific page and follow-up sequence can help visitors identify the right next step before they reach your calendar.',
    guideSlug: 'career-coaching-lead-generation',
    guideLabel: 'Career coach lead generation guide',
  },
  'performance-coaching': {
    slug: 'performance-coaching',
    displayName: 'Performance Coaches',
    title: 'Conversion Design for Performance Coaches | Compel',
    description:
      'A clearer page, appropriate qualification and relevant follow-up for established performance coaching businesses.',
    h1Keyword: 'Performance Coaches',
    keywords: [
      'performance coaching funnel',
      'performance coach lead generation',
      'performance coach marketing',
    ],
    challenge: 'Performance coaching covers different audiences, from individuals to teams, so a broad promise can make the offer hard to evaluate.',
    approach: 'We structure the page around your defined audience, the measurable problem you solve, and a booking path that qualifies fit.',
    guideSlug: 'performance-coaching-marketing',
    guideLabel: 'Performance coaching marketing guide',
  },
  'life-coaching': {
    slug: 'life-coaching',
    displayName: 'Life Coaches',
    title: 'Landing Pages and Booking Journeys for Life Coaches | Compel',
    description:
      'Help the people considering your coaching understand the offer, what to expect and how to begin a useful conversation.',
    h1Keyword: 'Life Coaches',
    keywords: [
      'life coaching funnel',
      'life coach marketing strategy',
      'life coach client acquisition',
    ],
    challenge: 'Life coaching buyers need a clear reason to trust the process before committing to a conversation about a personal goal.',
    approach: 'We make the offer specific, explain the steps and fit, and use useful follow-up for visitors who are not ready to book immediately.',
    guideSlug: 'life-coach-marketing-plan',
    guideLabel: 'Life coach marketing plan',
  },
  'executive-coaching': {
    slug: 'executive-coaching',
    displayName: 'Executive Coaches',
    title: 'Conversion Design for Executive Coaches | Compel',
    description:
      'Your expertise deserves a considered introduction. We connect your landing page, consultation journey and follow-up for leaders and organisations.',
    h1Keyword: 'Executive Coaches',
    keywords: [
      'executive coaching funnel',
      'executive coach lead generation',
      'executive coach marketing agency',
    ],
    challenge: 'Executive coaching often involves a longer evaluation cycle and sometimes a second buyer, such as HR or a leadership team.',
    approach: 'We clarify the audience and business problem, support the offer with concrete evidence you can provide, and keep the consultation path simple.',
    guideSlug: 'executive-coaching-lead-generation',
    guideLabel: 'Executive coach lead generation guide',
  },
};

/** Legacy slug → new slug mapping for redirects */
export const LEGACY_SLUG_MAP: Record<string, string> = {
  biz: 'business-coaching',
  career: 'career-coaching',
  performance: 'performance-coaching',
  life: 'life-coaching',
  executive: 'executive-coaching',
};

export const getAllNiches = (): string[] => {
  return Object.keys(NICHE_CONFIG);
};

export const getNicheConfig = (slug: string): NicheConfig | undefined => {
  return NICHE_CONFIG[slug];
};
