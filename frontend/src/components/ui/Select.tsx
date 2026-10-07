import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className = '', required, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs uppercase font-bold tracking-wider text-[#173C32]">
            {label} {required && <span className="text-[#A85D3A]">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            required={required}
            className={cn(
              'w-full bg-white border border-[#C7A77A]/40 rounded-xl py-3 pl-4 pr-10 text-sm text-[#151515] transition-all outline-none focus:border-[#173C32] focus:ring-2 focus:ring-[#173C32]/10 appearance-none cursor-pointer',
              error && 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/10',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#C7A77A] absolute right-3.5 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
