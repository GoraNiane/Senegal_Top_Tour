import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Destination } from '../types';
import dakarImg from '../assets/Dakar.png';
import { useLanguage } from '../context/LanguageContext';

interface DestinationsGridProps {
  destinations: Destination[];
}

export const DestinationsGrid: React.FC<DestinationsGridProps> = () => {
  const { t, language } = useLanguage();

  const dakarDest = {
    name: 'Dakar',
    slug: 'dakar',
    subtitle: language === 'de' ? 'Kultur · Stadtleben · Märkte' : language === 'en' ? 'Culture · Urban Life · Markets' : 'Culture · Vie urbaine · Marchés',
    imageUrl: dakarImg || '/images/dakar.png',
  };

  const topCards = [
    {
      name: 'Gorée',
      slug: 'goree',
      subtitle: language === 'de' ? 'Geschichte · Welterbe · Erinnerung' : language === 'en' ? 'History · Heritage · Culture' : 'Histoire · Mémoire · Culture',
      imageUrl: '/images/goree0.jpg',
    },
    {
      name: 'Lac Rose',
      slug: 'lac-rose',
      subtitle: language === 'de' ? 'Natur · Abenteuer · Salzsee' : language === 'en' ? 'Nature · Adventure · Colors' : 'Nature · Aventure · Couleurs',
      imageUrl: '/images/lac-rose-00.webp',
    },
  ];

  const bottomCards = [
    {
      name: 'Saint-Louis',
      slug: 'saint-louis',
      subtitle: language === 'de' ? 'Koloniales Erbe · Kultur' : language === 'en' ? 'Colonial Heritage · Nature' : 'Patrimoine · Culture · Nature',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=85',
    },
    {
      name: 'Kayar',
      slug: 'kayar',
      subtitle: language === 'de' ? 'Traditioneller Fischfang · Ozean' : language === 'en' ? 'Traditional Fishing · Ocean' : 'Pêche traditionnelle · Authenticité',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    },
    {
      name: 'Djoudj',
      slug: 'djoudj',
      subtitle: language === 'de' ? 'Tierwelt · Natur · Vogelparadies' : language === 'en' ? 'Wildlife · Nature · Birds' : 'Faune · Nature · Oiseaux',
      imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <section id="destinations" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Editorial Header Block (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 pt-2 lg:sticky lg:top-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A85D3A] block">
            {t.destinations.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#151515] leading-[1.12]">
            {t.destinations.title} <span className="text-[#C99A4A] italic font-normal">{t.destinations.titleHighlight}</span>
          </h2>
          <p className="text-sm text-[#151515]/70 font-light leading-relaxed max-w-sm pt-1">
            {t.destinations.subtitle}
          </p>
          <div className="pt-4">
            <Link
              to="/excursions"
              className="inline-flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-full border border-neutral-300 hover:border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white transition-all duration-300"
            >
              <span>{t.destinations.ctaButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Cards Layout (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Row: Dakar (tall on left, span 5) + Gorée & Lac Rose (span 7) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
            {/* Dakar Tall Card with official Dakar.png */}
            <div className="sm:col-span-5 h-[260px] sm:h-[390px]">
              <Link
                to={`/excursions?destination=${dakarDest.slug}`}
                className="group relative block w-full h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#151515]"
              >
                <img
                  src={dakarDest.imageUrl}
                  alt={dakarDest.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                      {dakarDest.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-light mt-0.5">
                      {dakarDest.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#C99A4A] group-hover:text-black transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Gorée & Lac Rose Grid (span 7) */}
            <div className="sm:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 h-auto sm:h-[390px]">
              {topCards.map((card) => (
                <Link
                  key={card.name}
                  to={`/excursions?destination=${card.slug}`}
                  className="group relative block w-full h-[200px] sm:h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#151515]"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                        {card.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-white/80 font-light mt-0.5 line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#C99A4A] group-hover:text-black transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row: Saint-Louis, Kayar, Djoudj (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 h-auto sm:h-[185px]">
            {bottomCards.map((card) => (
              <Link
                key={card.name}
                to={`/excursions?destination=${card.slug}`}
                className="group relative block w-full h-[160px] sm:h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#151515]"
              >
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white leading-tight">
                      {card.name}
                    </h3>
                    <p className="text-[9.5px] sm:text-[10px] text-white/80 font-light mt-0.5 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#C99A4A] group-hover:text-black transition-colors">
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
