import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface GalleryCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  category: string;
  location?: string;
  onClick?: () => void;
  heightClass?: string;
  className?: string;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  category,
  location,
  onClick,
  heightClass = 'h-72 sm:h-80',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!prefersReducedMotion ? { y: -4, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={cn(
        'group relative rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#151515] select-none text-left',
        heightClass,
        className
      )}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={imageAlt || title}
        loading="lazy"
        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white" />

      {/* Category Badge top-left */}
      <div className="absolute top-3.5 left-3.5 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C99A4A] text-[10px] uppercase font-bold tracking-wider border border-white/10">
          {category}
        </span>
      </div>

      {/* Zoom Icon top-right */}
      <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 sm:bg-white/20 backdrop-blur-md flex items-center justify-center text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>

      {/* Bottom Title & Location */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 text-white">
        <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
          {title}
        </h4>
        {location && (
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#C7A77A] mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
