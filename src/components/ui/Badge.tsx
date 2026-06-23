import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'danger';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', children, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-neutral-900/50 text-neutral-400 border-neutral-800",
      accent: "bg-accent/10 text-accent border-accent/20",
      danger: "bg-red-500/10 text-red-500 border-red-500/20"
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center font-mono text-xs px-3 py-1 rounded border tracking-widest uppercase ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
