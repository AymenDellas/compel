import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-lg";

    const variants = {
      primary: "bg-accent text-black hover:bg-[#b5da30] shadow-[0_0_15px_rgba(200,241,53,0.3)] hover:shadow-[0_0_25px_rgba(200,241,53,0.5)]",
      secondary: "bg-white text-black hover:bg-neutral-200",
      outline: "border border-neutral-800 hover:bg-neutral-900 text-white"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
