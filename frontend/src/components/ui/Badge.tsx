import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'gold' | 'green' | 'terracotta' | 'sand' | 'dark' | 'glass' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  icon,
  className = '',
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    gold: 'bg-[#C99A4A]/15 text-[#9F742C] border border-[#C99A4A]/30',
    green: 'bg-[#173C32]/10 text-[#173C32] border border-[#173C32]/20',
    terracotta: 'bg-[#A85D3A]/10 text-[#A85D3A] border border-[#A85D3A]/25',
    sand: 'bg-[#C7A77A]/20 text-[#6B502C] border border-[#C7A77A]/30',
    dark: 'bg-[#151515] text-white border border-white/10',
    glass: 'bg-black/40 backdrop-blur-md text-white border border-white/15',
    outline: 'bg-transparent text-[#151515] border border-neutral-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
