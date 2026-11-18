import { home } from '@/content/home';
import { ReviewButton } from '../ReviewButton';
import Footer from '../Footer';

type CopyPart = string | { readonly strong: string } | { readonly highlight: string };

function Copy({ parts, className = '' }: { parts: readonly CopyPart[]; className?: string }) {
  return <p className={className}>{parts.map((part, index) => typeof part === 'string'
    ? part
    : 'strong' in part ? <strong key={index}>{part.strong}</strong> : <mark key={index}>{part.highlight}</mark>)}</p>;
}

export default function CompelLanding() {
  return (
    <div className="studio-site" id="beginning">
      <div className="studio-hero-light" aria-hidden="true">
        <span className="studio-beam studio-beam-left" />
        <span className="studio-beam studio-beam-right" />
      </div>
      <main id="main-content">
        <section className="studio-hero studio-wrap" aria-labelledby="home-title">
          <h1 id="home-title">{home.hero.headline[0]}{' '}<em>{home.hero.headline[1]}</em></h1>
          <Copy className="studio-hero-description" parts={home.hero.description} />
          <p className="studio-hero-audience">{home.hero.audience}</p>
        </section>

        <section className="studio-opportunity studio-wrap studio-content" id="opportunity" aria-label="From interest to getting in touch">
          <Copy parts={home.opportunity.paragraph} />
        </section>

        <section className="studio-evidence studio-wrap studio-content" id="why-it-matters" aria-labelledby="evidence-title">
          <h2 id="evidence-title">{home.evidence.heading}</h2>
          <Copy parts={home.evidence.introduction} />
          <Copy parts={home.evidence.finding} />
        </section>

        <section className="studio-benefits studio-wrap studio-content" id="clearer-journey" aria-labelledby="benefits-title">
          <h2 id="benefits-title">{home.benefits.heading}</h2>
          <Copy parts={home.benefits.paragraph} />
        </section>

        <section className="studio-service studio-wrap studio-content" id="what-we-build" aria-labelledby="service-title">
          <h2 id="service-title">{home.service.heading}</h2>
          <Copy parts={home.service.description} />
          <ul className="studio-service-list">
            {home.service.elements.map(element => <li key={element.title}><h3>{element.title}</h3><Copy parts={element.description} /></li>)}
          </ul>
        </section>

        <section className="studio-approach studio-wrap studio-content" id="how-we-work" aria-labelledby="approach-title">
          <h2 id="approach-title">{home.approach.heading}</h2>
          <Copy parts={home.approach.description} />
        </section>

        <section className="studio-invitation studio-wrap" id="request-review" aria-labelledby="invitation-title">
          <h2 id="invitation-title">{home.closing.headline[0]}{' '}<em>{home.closing.headline[1]}</em></h2>
          <Copy parts={home.closing.description} />
          <ReviewButton />
        </section>
      </main>
      <Footer />
    </div>
  );
}
