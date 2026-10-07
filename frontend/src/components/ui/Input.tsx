import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', required, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs uppercase font-bold tracking-wider text-[#173C32]">
            {label} {required && <span className="text-[#A85D3A]">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-[#C7A77A] pointer-events-none shrink-0">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            className={cn(
              'w-full bg-white border border-[#C7A77A]/40 rounded-xl py-3 text-sm text-[#151515] placeholder-neutral-400 transition-all outline-none focus:border-[#173C32] focus:ring-2 focus:ring-[#173C32]/10',
              icon ? 'pl-10 pr-4' : 'px-4',
              error && 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
