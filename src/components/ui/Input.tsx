import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, id, name, 'aria-invalid': ariaInvalid, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-neutral-400 mb-2">
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          aria-invalid={ariaInvalid}
          ref={ref}
          className={`w-full bg-[#0A0A0A] border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-neutral-500 ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
