import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight, ShieldCheck, Check, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface LargeExperienceCardProps {
  imageUrl: string;
  imageAlt?: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  departureCity: string;
  highlights: string[];
  priceNote?: string;
  rating?: number;
  reviewCount?: number;
  href?: string;
  onBookClick?: () => void;
  className?: string;
}

export const LargeExperienceCard: React.FC<LargeExperienceCardProps> = ({
  imageUrl,
  imageAlt,
  category,
  title,
  subtitle,
  description,
  duration,
  departureCity,
  highlights,
  priceNote,
  rating = 4.9,
  reviewCount = 28,
  href,
  onBookClick,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#C7A77A]/30 shadow-md hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 text-left',
        className
      )}
    >
      {/* Left Media (5 Cols) */}
      <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[440px] overflow-hidden bg-[#151515] group">
        <img
          src={imageUrl}
          alt={imageAlt || title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
          <Badge variant="glass" className="text-[10px]">
            {category}
          </Badge>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/10">
            <Star className="w-3 h-3 text-[#C99A4A] fill-current" />
            <span>{rating}</span>
            <span className="text-white/60 text-[10px]">({reviewCount})</span>
          </div>
        </div>

        {/* Bottom Details on Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#C7A77A]" />
            <span>Départ : {departureCity}</span>
          </div>
        </div>
      </div>

      {/* Right Content (7 Cols) */}
      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A85D3A] block">
              Circuit Recommandé
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#173C32] leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-[#C99A4A] font-serif italic">
                {subtitle}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            {description}
          </p>

          {/* Highlights checklist */}
          {highlights && highlights.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173C32] block mb-2.5">
                Points Forts Inclus :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                    <div className="w-4 h-4 rounded-full bg-[#173C32]/10 text-[#173C32] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Booking bar */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              Tarif Officiel
            </span>
            <span className="text-base sm:text-lg font-serif font-bold text-[#173C32]">
              {priceNote || 'Sur mesure / Devis gratuit'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {href && (
              <a
                href={href}
                className="px-4 py-2.5 text-xs font-semibold text-[#173C32] hover:text-[#A85D3A] rounded-full border border-neutral-300 hover:border-[#A85D3A] transition-colors"
              >
                Itinéraire complet
              </a>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={onBookClick}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Réserver ce circuit
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
