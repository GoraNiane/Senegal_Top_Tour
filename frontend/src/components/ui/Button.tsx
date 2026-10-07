import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  iconLeft,
  iconRight,
  isLoading = false,
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#173C32] hover:bg-[#1f4f42] text-white shadow-md hover:shadow-lg focus-visible:ring-[#173C32]',
    secondary:
      'bg-transparent hover:bg-[#C7A77A]/15 text-[#173C32] border border-[#C7A77A] hover:border-[#A85D3A] hover:text-[#A85D3A] focus-visible:ring-[#C7A77A]',
    outline:
      'bg-transparent hover:bg-white text-[#151515] border border-neutral-300 hover:border-[#151515] focus-visible:ring-[#151515]',
    ghost:
      'bg-transparent hover:bg-[#173C32]/10 text-[#173C32] focus-visible:ring-[#173C32]',
    gold:
      'bg-gradient-to-r from-[#C99A4A] to-[#C7A77A] hover:brightness-105 text-[#151515] font-bold shadow-md hover:shadow-xl focus-visible:ring-[#C99A4A]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-5 py-2.5 text-xs sm:text-sm gap-2 min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5 min-h-[52px]',
  };

  return (
    <motion.button
      whileTap={!disabled && !isLoading && !prefersReducedMotion ? { scale: 0.97 } : undefined}
      whileHover={!disabled && !isLoading && !prefersReducedMotion ? { y: -2 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      disabled={disabled || isLoading}
      className={cn(
        'relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer transition-colors duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        fullWidth ? 'w-full' : 'w-auto',
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-1">{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
};
