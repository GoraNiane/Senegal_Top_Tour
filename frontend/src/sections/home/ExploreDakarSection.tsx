import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Star, MapPin } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Badge } from '../../components/ui/Badge';
import { dakarExcursions } from '../../data/homepageData';

export const ExploreDakarSection: React.FC = () => {
  return (
    <section id="excursions-dakar" className="py-20 md:py-28 bg-white text-[#151515] border-b border-[#C7A77A]/20">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionTitle
            badge="EXCURSIONS INCONTOURNABLES"
            title="Explorez depuis Dakar"
            subtitle="Des expériences accessibles au départ de Dakar pour quelques heures ou une journée entière."
            align="left"
            className="max-w-2xl"
          />

          <Link
            to="/excursions"
            className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full border border-neutral-300 hover:border-[#173C32] text-[#173C32] hover:bg-[#173C32] hover:text-white transition-all w-fit"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 Premium Excursion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dakarExcursions.map((exc, index) => (
            <div
              key={exc.id}
              className={`bg-[#F7F4EE] rounded-[28px] overflow-hidden border border-[#C7A77A]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Media Container */}
              <div className={`relative w-full overflow-hidden bg-neutral-900 ${index === 0 ? 'h-72 sm:h-80' : 'h-60 sm:h-64'}`}>
                <img
                  src={exc.imageUrl}
                  alt={exc.title}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/goree0.jpg';
                  }}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Categories & Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5">
                  <Badge variant="glass" className="text-[10px]">
                    {exc.category}
                  </Badge>
                </div>

                {/* Duration & Schedule pill over image */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between text-white text-xs gap-2">
                  <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
                    <span className="font-medium">{exc.duration}</span>
                  </div>
                  <div className="text-[11px] text-[#C7A77A] font-medium bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    {exc.schedule}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173C32] group-hover:text-[#A85D3A] transition-colors leading-snug">
                    {exc.title}
                  </h3>

                  {exc.subtitle && (
                    <p className="text-xs text-[#A85D3A] font-medium tracking-wide">
                      {exc.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {exc.description}
                  </p>

                  {/* Highlights pills */}
                  {exc.highlights && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exc.highlights.map((h, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-white text-[10.5px] text-neutral-600 border border-neutral-200">
                          • {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA & Link */}
                <div className="pt-4 border-t border-[#C7A77A]/20 flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#173C32]">
                    {exc.priceNote}
                  </span>

                  <Link
                    to={`/reservation?excursion=${encodeURIComponent(exc.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[#173C32] hover:bg-[#A85D3A] text-white transition-all shadow-xs"
                  >
                    <span>Réserver</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
