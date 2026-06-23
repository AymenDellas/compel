import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../data/content';
import { Input } from './ui/Input';

const FAQ = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8 uppercase">
          Frequently Asked Questions
        </h2>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500 group-focus-within:text-accent transition-colors" />
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

      <div className="flex flex-col border-t border-neutral-900">
        {filteredFaqs.length === 0 ? (
          <div className="py-8 text-neutral-500 font-mono text-sm">No matching queries found.</div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div key={index} className="border-b border-neutral-900">
                <button
                  className="w-full text-left py-6 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group relative"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  {isOpen && (
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                  )}

                  <div className={`text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                    {faq.q}
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-neutral-400 leading-relaxed text-base">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default FAQ;
