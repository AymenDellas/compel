import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-[#0A0A0A] border border-neutral-800 rounded-2xl p-8 relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
          hoverEffect ? 'hover:border-neutral-700 transition-colors' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
