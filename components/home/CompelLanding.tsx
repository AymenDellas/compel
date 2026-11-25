import { ArrowRight, CalendarDays, Check, Mail } from 'lucide-react';
import { home } from '@/content/home';
import { WebsiteReviewForm } from '../WebsiteReviewForm';
import Image from 'next/image';
import { PaceExamples } from './PaceExamples';
import { ReviewDisclosure } from './ReviewDisclosure';

export default function CompelLanding() {
  const { problem, solution, framework } = home;
  const { example } = solution;

  return (
    <div className="studio-site" id="beginning">
      <div className="studio-hero-light" aria-hidden="true">
        <span className="studio-beam studio-beam-left" />
        <span className="studio-beam studio-beam-right" />
      </div>
      <main id="main-content">
        <section className="studio-hero studio-wrap" aria-labelledby="home-title">
          <h1 id="home-title">{home.hero.headline}{' '}<em>{home.hero.payment}</em></h1>
          <p className="studio-hero-description">{home.hero.description}</p>
          <ReviewDisclosure />
          <p className="studio-hero-terms">{home.hero.terms}</p>
        </section>

        <div className="studio-funnel studio-wrap">
          <section className="studio-problem" aria-labelledby="problem-title">
            <h2 id="problem-title">{problem.heading}</h2>
            <div className="studio-problem-copy">
              <p>{problem.intro}<strong>{problem.referral}</strong></p>
              <p>{problem.question}<strong>{problem.recognition}</strong></p>
              <p>{problem.calendar}<mark>{problem.thought}</mark></p>
            </div>
          </section>
          <section className="studio-solution" aria-labelledby="solution-title">
            <h2 id="solution-title">{solution.heading}</h2>
            <p>{solution.description}</p>
            <figure className="studio-journey">
              <figcaption>{solution.caption}</figcaption>
              <ol className="studio-journey-steps" role="list">
                <li>
                  <h3>{solution.steps[0]}</h3>
                  <div className="studio-journey-sample studio-journey-page">
                    <span>{example.practice}</span>
                    <p>{example.offer}</p>
                    <span className="studio-journey-page-action">{example.action} <ArrowRight size={15} aria-hidden="true" /></span>
                  </div>
                </li>
                <li>
                  <h3>{solution.steps[1]}</h3>
                  <div className="studio-journey-sample studio-journey-booking">
                    <span><CalendarDays size={16} aria-hidden="true" /> {example.duration}</span>
                    <p>{example.time} <Check size={17} aria-hidden="true" /></p>
                    <span>{example.zone}</span>
                  </div>
                </li>
                <li>
                  <h3>{solution.steps[2]}</h3>
                  <div className="studio-journey-sample studio-journey-email">
                    <span><Mail size={16} aria-hidden="true" /> {example.emailLabel}</span>
                    <p>{example.confirmation}</p>
                    <p>{example.prep}</p>
                  </div>
                </li>
              </ol>
            </figure>
            <div className="studio-funnel-evidence">
              {solution.evidence.map(item => (
                <p key={item.figure}><strong>{item.figure}</strong> {item.description}</p>
              ))}
            </div>
          </section>
        </div>

        <section className="studio-framework" aria-labelledby="framework-title">
          <div className="studio-wrap pace-edition">
            <header className="pace-cover">
              <div className="pace-cover-copy">
                <h2 id="framework-title"><span>{framework.lead}</span>{' '}<em>{framework.name}</em></h2>
                <p>{framework.description}</p>
              </div>
              <Image src="/images/pace-letterpress.webp" width={1280} height={853} sizes="(max-width: 700px) 92vw, 550px" alt="Four metal letterpress blocks spelling PACE" />
            </header>
            <PaceExamples />
            <div className="pace-guarantee">
              <div><h3>{framework.termsHeading}</h3><p>{framework.terms}</p></div>
              <ReviewDisclosure />
            </div>
          </div>
        </section>

        <section className="studio-invitation studio-wrap" id="request-review" aria-labelledby="invitation-title" tabIndex={-1}>
          <div className="studio-invitation-copy">
            <h2 id="invitation-title">{home.closing.headline}</h2>
            <p>{home.closing.description}</p>
          </div>
          <WebsiteReviewForm />
        </section>
      </main>
    </div>
  );
}
