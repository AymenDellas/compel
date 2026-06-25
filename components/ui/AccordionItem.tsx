import { type ReactNode } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useAccordion } from './Accordion';

interface AccordionItemProps {
  index: number;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export const AccordionItem = ({ index, title, children, className = '' }: AccordionItemProps) => {
  const { openIndex, setOpenIndex } = useAccordion();
  const isOpen = openIndex === index;
  const answerId = `accordion-answer-${index}`;

  return (
    <div className={`border-b border-neutral-900 ${className}`}>
      <h3>
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
            {title}
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <m.div 
                id={answerId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 text-neutral-400 leading-relaxed text-base">
                  {children}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </button>
      </h3>
    </div>
  );
};
