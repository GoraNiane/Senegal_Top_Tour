import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type CardVariant = 'white' | 'sand' | 'dark' | 'glass';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  interactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'white',
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  const variantStyles: Record<CardVariant, string> = {
    white: 'bg-white text-[#151515] border border-[#C7A77A]/25 shadow-sm',
    sand: 'bg-[#EBE7DF] text-[#151515] border border-[#C7A77A]/30 shadow-sm',
    dark: 'bg-[#173C32] text-white border border-white/10 shadow-lg',
    glass: 'bg-white/70 backdrop-blur-xl text-[#151515] border border-[#C7A77A]/30 shadow-md',
  };

  return (
    <motion.div
      whileHover={interactive && !prefersReducedMotion ? { y: -5, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'rounded-[24px] sm:rounded-[28px] overflow-hidden transition-shadow duration-300',
        variantStyles[variant],
        interactive && 'cursor-pointer hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
