export interface NicheConfig {
  slug: string;
  displayName: string;
  title: string;
  description: string;
  h1Keyword: string;
  keywords: string[];
}

export const NICHE_CONFIG: Record<string, NicheConfig> = {
  'business-coaching': {
    slug: 'business-coaching',
    displayName: 'Business Coaches',
    title: 'Funnel Agency for Business Coaches | $0 Upfront — Compel',
    description:
      'We build high-converting funnels for business coaches. Pay nothing upfront. 30% more discovery calls in 30 days or the invoice is shredded.',
    h1Keyword: 'Business Coaches',
    keywords: [
      'business coaching funnel',
      'business coach marketing',
      'business coach lead generation',
    ],
  },
  'career-coaching': {
    slug: 'career-coaching',
    displayName: 'Career Coaches',
    title: 'Funnel Agency for Career Coaches | $0 Upfront — Compel',
    description:
      'Performance-based funnels for career coaches. We engineer conversion systems that fill your calendar — you only pay when it works.',
    h1Keyword: 'Career Coaches',
    keywords: [
      'career coaching funnel',
      'career coach client acquisition',
      'career coach marketing',
    ],
  },
  'performance-coaching': {
    slug: 'performance-coaching',
    displayName: 'Performance Coaches',
    title: 'Funnel Agency for Performance Coaches | $0 Upfront — Compel',
    description:
      'High-converting funnels built for performance coaches. Zero upfront cost. We only get paid when your discovery calls increase by 30%.',
    h1Keyword: 'Performance Coaches',
    keywords: [
      'performance coaching funnel',
      'performance coach lead generation',
      'performance coach marketing',
    ],
  },
  'life-coaching': {
    slug: 'life-coaching',
    displayName: 'Life Coaches',
    title: 'Funnel Agency for Life Coaches | $0 Upfront — Compel',
    description:
      'Done-for-you conversion funnels for life coaches. $0 upfront — we take 100% of the financial risk. More discovery calls or you don\'t pay.',
    h1Keyword: 'Life Coaches',
    keywords: [
      'life coaching funnel',
      'life coach marketing strategy',
      'life coach client acquisition',
    ],
  },
  'executive-coaching': {
    slug: 'executive-coaching',
    displayName: 'Executive Coaches',
    title: 'Funnel Agency for Executive Coaches | $0 Upfront — Compel',
    description:
      'We build high-ticket conversion funnels for executive coaches. Performance-based pricing — pay nothing until your calendar fills up.',
    h1Keyword: 'Executive Coaches',
    keywords: [
      'executive coaching funnel',
      'executive coach lead generation',
      'executive coach marketing agency',
    ],
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
