import { useState, ReactNode, createContext, useContext } from 'react';

interface AccordionContextType {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export const Accordion = ({ children, className = '' }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className={`flex flex-col ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion');
  }
  return context;
};
