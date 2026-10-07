import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface DestinationCardProps {
  name: string;
  subtitle?: string;
  tagline?: string;
  imageUrl: string;
  imageAlt?: string;
  excursionCount?: number;
  highlightPill?: string;
  href?: string;
  onClick?: () => void;
  heightClass?: string;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  subtitle,
  tagline,
  imageUrl,
  imageAlt,
  excursionCount,
  highlightPill,
  href,
  onClick,
  heightClass = 'h-[320px] sm:h-[380px]',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const CardElement = href ? 'a' : 'div';
  const cardProps = href ? { href } : { onClick };

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -5, transition: { duration: 0.3 } } : undefined}
      className={cn('group relative rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#151515]', heightClass, className)}
    >
      <CardElement {...cardProps} className="block w-full h-full cursor-pointer relative select-none">
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={imageAlt || name}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-300" />

        {/* Top Highlight Pill */}
        {highlightPill && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-[#173C32]/85 backdrop-blur-md text-[#C99A4A] text-[10px] font-bold uppercase tracking-wider border border-white/10">
              {highlightPill}
            </span>
          </div>
        )}

        {/* Count badge top right */}
        {excursionCount !== undefined && (
          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
            {excursionCount} circuit{excursionCount > 1 ? 's' : ''}
          </div>
        )}

        {/* Bottom Details */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end space-y-1.5 text-white text-left">
          <div className="flex items-center gap-1.5 text-[#C7A77A] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sénégal</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C99A4A] transition-colors leading-tight">
            {name}
          </h3>

          {(subtitle || tagline) && (
            <p className="text-xs sm:text-sm text-white/80 font-light line-clamp-2 leading-relaxed">
              {subtitle || tagline}
            </p>
          )}

          <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#C99A4A] opacity-90 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
            <span>Explorer la destination</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </CardElement>
    </motion.div>
  );
};
