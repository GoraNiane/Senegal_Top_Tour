import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export interface SectionTitleProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const isDark = theme === 'dark';

  return (
    <div className={cn('flex flex-col space-y-3.5 max-w-3xl', alignStyles[align], className)}>
      {badge && (
        <Badge
          variant={isDark ? 'gold' : 'green'}
          icon={badgeIcon}
          className="mb-1"
        >
          {badge}
        </Badge>
      )}

      <h2
        className={cn(
          'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]',
          isDark ? 'text-white' : 'text-[#151515]'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-sm sm:text-base font-light leading-relaxed max-w-2xl',
            isDark ? 'text-white/75' : 'text-[#151515]/70'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
