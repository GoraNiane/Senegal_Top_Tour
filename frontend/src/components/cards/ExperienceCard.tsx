import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ExperienceCardProps {
  id?: string | number;
  imageUrl: string;
  imageAlt?: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  price?: string;
  destination?: string;
  rating?: number;
  isPopular?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
  href?: string;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageUrl,
  imageAlt,
  category,
  title,
  description,
  duration,
  price,
  destination = 'Sénégal',
  rating,
  isPopular = false,
  ctaText = 'Découvrir',
  onCtaClick,
  href,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href } : { onClick: onCtaClick };

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } } : undefined}
      className={cn(
        'group bg-white rounded-[24px] overflow-hidden border border-[#C7A77A]/25 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left',
        className
      )}
    >
      {/* Media Aspect Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#151515]">
        <img
          src={imageUrl}
          alt={imageAlt || title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge top left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge variant="glass" className="text-[10px] tracking-widest">
            {category}
          </Badge>
        </div>

        {/* Popular / Must-See Pill */}
        {isPopular && (
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C99A4A] text-[#151515] text-[10px] font-bold uppercase tracking-wider shadow-md">
            <Star className="w-3 h-3 fill-current" />
            <span>Incontournable</span>
          </div>
        )}

        {/* Duration bottom left overlay */}
        <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1.5 text-xs text-white font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
          <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
          <span>{duration}</span>
        </div>

        {/* Rating if present */}
        {rating && (
          <div className="absolute bottom-3 right-3.5 z-10 flex items-center gap-1 text-xs text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
            <Star className="w-3 h-3 text-[#C99A4A] fill-current" />
            <span className="font-bold">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Destination */}
          <div className="flex items-center gap-1.5 text-xs text-[#A85D3A] font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#C7A77A] shrink-0" />
            <span>{destination}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover:text-[#173C32] transition-colors leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Pricing & CTA */}
        <div className="pt-3 border-t border-[#C7A77A]/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              Tarification
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#173C32]">
              {price || 'Sur demande'}
            </span>
          </div>

          <CardWrapper
            {...wrapperProps}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173C32] group-hover:text-[#A85D3A] px-3.5 py-1.5 rounded-full border border-[#C7A77A]/50 group-hover:border-[#A85D3A] transition-all cursor-pointer select-none"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </CardWrapper>
        </div>
      </div>
    </motion.div>
  );
};
