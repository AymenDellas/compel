import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ArticleCTA from '@/components/ArticleCTA';

export const metadata: Metadata = {
  title: 'About the Studio | Compel',
  description: 'An independent conversion studio founded by Aymen Dellas. Thoughtful landing pages, booking journeys and follow-up for established coaching businesses.',
  alternates: { canonical: 'https://getcompel.co/about' },
  openGraph: { title: 'About the Studio | Compel', description: 'Thoughtful work between interest and conversation.', url: 'https://getcompel.co/about', images: [{ url: 'https://getcompel.co/opengraph-image' }] },
};

export default function AboutPage() {
  return <><main id="main-content" className="public-page"><div className="studio-wrap public-content"><header className="public-intro"><p className="small-label">Independent by design</p><h1>A small studio.<br /><em>A considered approach.</em></h1><p>Compel helps established coaches make it easier for the right people to understand their work and start a useful conversation.</p></header><div className="public-prose"><h2>The space we work in</h2><p>You&apos;ve built your expertise, your offer and your professional relationships. People hear about you through referrals, LinkedIn, speaking and the work you already do.</p><p>We focus on what happens when that interest reaches your website: how the offer is explained, how someone finds the right service, how they enquire, and how they prepare for the conversation.</p><h2>Connected work, from page to follow-up</h2><p>A good page can make the offer clear. A considered booking process can make the next step feel manageable. Relevant follow-up can help people stay engaged. We design these parts together, around the way your coaching business works.</p><h2>Work directly with the person building it</h2><p>Compel was founded by Aymen Dellas. You work directly with the person thinking through and implementing your experience, with room for questions, practical feedback and clear decisions.</p><p>We start by reviewing the existing experience. The scope, responsibilities and commercial terms are discussed before any engagement begins.</p><h2>Evidence before promises</h2><p>We use the context and evidence available to understand what could be clearer. After launch, we review the experience against agreed measures. We don&apos;t promise a particular number of clients or conversations.</p></div><ArticleCTA /></div></main><Footer /></>;
}
