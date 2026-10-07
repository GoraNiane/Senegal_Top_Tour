import React from 'react';
import { cn } from '../../lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Display: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h1', ...props }) => (
  <Component
    className={cn(
      'font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#151515] leading-[1.08]',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const H1: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h1', ...props }) => (
  <Component
    className={cn(
      'font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#151515] leading-[1.15]',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const H2: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h2', ...props }) => (
  <Component
    className={cn(
      'font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-normal text-[#173C32] leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const H3: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h3', ...props }) => (
  <Component
    className={cn(
      'font-serif text-xl sm:text-2xl font-semibold tracking-normal text-[#151515] leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const H4: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'h4', ...props }) => (
  <Component
    className={cn(
      'font-serif text-lg sm:text-xl font-semibold text-[#173C32] leading-snug',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Body: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'p', ...props }) => (
  <Component
    className={cn(
      'font-sans text-sm sm:text-base text-[#151515]/80 font-light leading-relaxed',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Small: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'p', ...props }) => (
  <Component
    className={cn(
      'font-sans text-xs sm:text-sm text-[#151515]/70 font-light leading-normal',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export const Caption: React.FC<TypographyProps> = ({ children, className = '', as: Component = 'span', ...props }) => (
  <Component
    className={cn(
      'font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-[#A85D3A]',
      className
    )}
    {...props}
  >
    {children}
  </Component>
);
