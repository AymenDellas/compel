"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { faqs } from '../data/content';
import { Input } from './ui/Input';
import { Accordion } from './ui/Accordion';
import { AccordionItem } from './ui/AccordionItem';

const FAQ = () => {
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const term = search.toLowerCase();
    return (
      faq.q.toLowerCase().includes(term) || 
      faq.a.toLowerCase().includes(term) ||
      faq.keywords.some(k => k.includes(term))
    );
  });

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8 uppercase">
          Frequently Asked Questions
        </h2>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-accent transition-colors" aria-hidden="true" />
          </div>
          <Input
            id="faqSearch"
            type="text"
            className="pl-11"
            placeholder="Search objections... (e.g., 'traffic', 'price')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <Accordion className="border-t border-neutral-900">
        {filteredFaqs.length === 0 ? (
          <div className="py-8 text-neutral-500 font-mono text-sm">No matching queries found.</div>
        ) : (
          filteredFaqs.map((faq, index) => (
            <AccordionItem key={index} index={index} title={faq.q}>
              {faq.a}
            </AccordionItem>
          ))
        )}
      </Accordion>
    </section>
  );
};

export default FAQ;
