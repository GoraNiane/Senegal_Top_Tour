import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: 'ivory' | 'white' | 'sand' | 'darkGreen' | 'dark';
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'ivory',
  spacing = 'md',
  containerSize = 'lg',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const bgStyles = {
    ivory: 'bg-[#F7F4EE] text-[#151515]',
    white: 'bg-white text-[#151515]',
    sand: 'bg-[#EBE7DF] text-[#151515]',
    darkGreen: 'bg-[#173C32] text-white',
    dark: 'bg-[#151515] text-white',
  };

  const spacingStyles = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
  };

  return (
    <section className={cn('relative w-full', bgStyles[background], spacingStyles[spacing], className)} {...props}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};
