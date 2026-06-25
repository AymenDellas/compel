import React, { Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Hero from './components/Hero'
const WhoItsFor = React.lazy(() => import('./components/WhoItsFor'))
const HowItWorks = React.lazy(() => import('./components/HowItWorks'))
const TheGuarantee = React.lazy(() => import('./components/TheGuarantee'))
const WhyCompel = React.lazy(() => import('./components/WhyCompel'))
const FAQ = React.lazy(() => import('./components/FAQ'))
const CTA = React.lazy(() => import('./components/CTA'))

const App = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen selection:bg-accent selection:text-black font-sans bg-background text-text overflow-x-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
        </div>
        
        <main>
          <header>
            <Hero />
          </header>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <WhoItsFor />
          </Suspense>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <HowItWorks />
          </Suspense>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <TheGuarantee />
          </Suspense>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <WhyCompel />
          </Suspense>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <FAQ />
          </Suspense>
        </main>

        <footer>
          <Suspense fallback={<div className="animate-pulse h-32 bg-neutral-900/50 rounded-xl my-8 w-full max-w-4xl mx-auto"></div>}>
            <CTA />
          </Suspense>
        </footer>
      </div>
    </LazyMotion>
  )
}

export default App