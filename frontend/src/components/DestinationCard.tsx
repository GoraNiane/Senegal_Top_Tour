import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
  isLarge?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  className = '',
  isLarge = false,
}) => {
  return (
    <Link
      to={`/excursions?destination=${destination.slug}`}
      data-cursor="image"
      className={`group relative overflow-hidden rounded-[24px] block shadow-md hover:shadow-2xl transition-all duration-500 bg-[#151515] ${
        isLarge ? 'min-h-[420px] md:min-h-[480px]' : 'min-h-[300px] md:min-h-[360px]'
      } ${className}`}
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-[0.88] group-hover:brightness-[0.95]"
        />
      </div>

      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#173C32]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Floating Region / Category Badge */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-wider text-[#F7F4EE]">
        <Sparkles className="w-3 h-3 text-[#C99A4A]" />
        <span>{(destination.subtitle?.split('·')[0] || destination.region || 'Sénégal').trim()}</span>
      </div>

      {/* Bottom Content Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            {destination.subtitle && (
              <span className="text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-medium block mb-1">
                {destination.subtitle}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white group-hover:text-[#F7F4EE] transition-colors leading-tight">
              {destination.name}
            </h3>
          </div>

          {/* Floating Action Arrow */}
          <div className="w-11 h-11 rounded-full bg-[#C99A4A] text-[#151515] flex items-center justify-center flex-shrink-0 transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Highlights Pill on Hover/Expanded */}
        {(() => {
          const highlightsList: string[] = Array.isArray(destination.highlights)
            ? destination.highlights
            : typeof destination.highlights === 'string'
            ? (() => {
                try {
                  return JSON.parse(destination.highlights);
                } catch {
                  return [destination.highlights];
                }
              })()
            : [];
          if (highlightsList.length === 0) return null;
          return (
            <div className="mt-3.5 pt-3 border-t border-white/15 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              {highlightsList.slice(0, 3).map((hl: string, i: number) => (
                <span
                  key={i}
                  className="text-[10.5px] px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-white/90"
                >
                  {hl}
                </span>
              ))}
            </div>
          );
        })()}
      </div>
    </Link>
  );
};
