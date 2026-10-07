import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { DetailedExcursion } from '../data/excursionsData';
import { Excursion } from '../types';

interface ExcursionCardProps {
  excursion: DetailedExcursion | Excursion;
  className?: string;
  index?: number;
}

export const ExcursionCard: React.FC<ExcursionCardProps> = ({ excursion, className = '', index = 0 }) => {
  const coverImage =
    excursion.images?.find((img) => img.isCover)?.url ||
    excursion.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80';

  // Extract schedule if available
  const schedule =
    'schedule' in excursion && excursion.schedule
      ? excursion.schedule
      : 'departTime' in excursion && excursion.departTime
      ? `Départ : ${excursion.departTime}`
      : undefined;

  // Pricing display
  const priceDisplay =
    excursion.priceNote && excursion.priceNote.trim() !== ''
      ? excursion.priceNote
      : 'Prix sur demande';

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: Math.min((index % 3) * 0.1, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      data-cursor="image"
      className={`card-luxury group bg-white rounded-[24px] overflow-hidden border border-[#C7A77A]/25 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#C7A77A]/60 transition-all duration-500 ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#151515]">
        <img
          src={coverImage}
          alt={excursion.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/goree0.jpg';
          }}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-[#173C32]/90 backdrop-blur-md text-white text-[11px] font-medium tracking-wider uppercase border border-white/15 shadow-sm">
          {excursion.category}
        </div>

        {/* Popular / Must-See Pill */}
        {excursion.isPopular && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C99A4A] text-[#151515] text-[11px] font-bold shadow-md">
            <Star className="w-3 h-3 fill-current" />
            <span>Incontournable</span>
          </div>
        )}

        {/* Duration bottom-left badge */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs text-white font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
          <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
          <span>{excursion.duration}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Departure Location / Region */}
          <div className="flex items-center gap-1.5 text-[11.5px] text-[#A85D3A] font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#C7A77A]" />
            <span className="truncate">
              {'departureCity' in excursion && excursion.departureCity
                ? excursion.departureCity
                : 'Dakar & Environs'}
            </span>
          </div>

          {/* Title */}
          <Link to={`/excursions/${excursion.slug}`} className="block group-hover:text-[#173C32] transition-colors">
            <h3 className="text-xl sm:text-2xl font-serif text-[#151515] leading-snug group-hover:text-[#173C32] transition-colors line-clamp-1">
              {excursion.name}
            </h3>
          </Link>

          {/* Schedule / Horaires */}
          {schedule && (
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-mono bg-[#F7F4EE] px-2.5 py-1 rounded-md border border-[#C7A77A]/20 w-fit">
              <Calendar className="w-3 h-3 text-[#A85D3A]" />
              <span className="truncate">{schedule}</span>
            </div>
          )}

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-2">
            {excursion.description || excursion.subtitle}
          </p>
        </div>

        {/* Bottom Details & CTA Bar */}
        <div className="pt-4 border-t border-[#C7A77A]/20 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block font-medium">
              Tarif
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-[#173C32]">
              {priceDisplay}
            </span>
          </div>

          <Link
            to={`/excursions/${excursion.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#173C32] hover:bg-[#1f4e42] px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-300 group/btn"
          >
            <span>Découvrir</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default ExcursionCard;
