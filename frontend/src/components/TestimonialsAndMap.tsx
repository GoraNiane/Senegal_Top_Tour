import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, MapPin, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsAndMap: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: 'Sophie M.',
      country: 'France',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment: language === 'de'
        ? '« Eine außergewöhnliche Reise. Wir haben ein herzliches und authentisches Senegal entdeckt, das wir so nie erwartet hätten. »'
        : language === 'en'
        ? '« An exceptional journey. We discovered a warm, authentic Senegal we had never experienced before. »'
        : '« Une expérience exceptionnelle. Nous avons découvert un Sénégal que nous ne connaissions pas. »',
    },
    {
      name: 'Thomas B.',
      country: language === 'de' ? 'Belgien' : language === 'en' ? 'Belgium' : 'Belgique',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: language === 'de'
        ? '« Die Organisation war perfekt und unser Reiseleiter schlichtweg herausragend. Unvergessliche Begegnungen! »'
        : language === 'en'
        ? '« The tour planning was seamless and our guide was extraordinary. Unforgettable human encounters! »'
        : '« L\'organisation était parfaite, et les rencontres avec les habitants inoubliables. »',
    },
    {
      name: 'Claire D.',
      country: language === 'de' ? 'Schweiz' : language === 'en' ? 'Switzerland' : 'Suisse',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      comment: language === 'de'
        ? '« Eine bereichernde Reise, die wilde Natur, faszinierende Kultur und gelebte Solidarität vereint. »'
        : language === 'en'
        ? '« A deeply enriching trip combining wild nature, rich culture, and meaningful solidarity. »'
        : '« Un voyage enrichissant, entre nature, culture et solidarité. »',
    },
  ];

  const mapPoints = [
    {
      id: 'dakar',
      name: 'Dakar',
      slug: 'dakar',
      cx: 80,
      cy: 190,
      r: 6,
      desc: language === 'de' ? 'Lebendige Hauptstadt, farbenfrohe Märkte & Küsten-Corniche' : language === 'en' ? 'Vibrant capital, colorful markets and seaside Corniche' : 'Capitale vibrante, marchés colorés et Corniche',
      img: '/images/dakar.png',
    },
    {
      id: 'goree',
      name: 'Gorée',
      slug: 'goree',
      cx: 74,
      cy: 205,
      r: 4.5,
      desc: language === 'de' ? 'Sklavenhaus & UNESCO-Weltkulturerbe' : language === 'en' ? 'House of Slaves & UNESCO world heritage island' : 'Maison des Esclaves & patrimoine mondial UNESCO',
      img: '/images/goree0.jpg',
    },
    {
      id: 'lac-rose',
      name: 'Lac Rose',
      slug: 'lac-rose',
      cx: 105,
      cy: 150,
      r: 4.5,
      desc: language === 'de' ? 'Rosa Wasser, Salzgewinnung und Paris-Dakar-Dünen' : language === 'en' ? 'Pink waters, salt harvest and Paris-Dakar dunes' : 'Eaux roses, récolte du sel et pistes Paris-Dakar',
      img: '/images/lac-rose-00.webp',
    },
    {
      id: 'kayar',
      name: 'Kayar',
      slug: 'kayar',
      cx: 115,
      cy: 170,
      r: 4.5,
      desc: language === 'de' ? 'Traditioneller Fischerhafen & Riesenschildkröten-Zentrum' : language === 'en' ? 'Traditional fishing harbor & Giant Tortoises sanctuary' : 'Port de pêche traditionnel & Village des Tortues',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'saint-louis',
      name: 'Saint-Louis',
      slug: 'saint-louis',
      cx: 160,
      cy: 70,
      r: 5.5,
      desc: language === 'de' ? 'Kreolische Kolonialarchitektur, Kutschen & Jazz' : language === 'en' ? 'Creole architecture, horse carriages and jazz history' : 'Architecture créole, tour en calèche & jazz',
      img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'djoudj',
      name: 'Djoudj',
      slug: 'djoudj',
      cx: 180,
      cy: 45,
      r: 4.5,
      desc: language === 'de' ? 'Drittgrößtes Vogelschutzgebiet der Welt' : language === 'en' ? '3rd largest bird sanctuary in the world' : '3ème sanctuaire ornithologique mondial',
      img: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'lompoul',
      name: 'Lompoul',
      slug: 'lompoul',
      cx: 190,
      cy: 120,
      r: 4.5,
      desc: language === 'de' ? 'Ockerfarbene Sanddünen und Wüstencamp unter Sternen' : language === 'en' ? 'Ochre sand dunes and starry desert camp' : 'Désert de dunes ocres et bivouac étoilé',
      img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'saloum',
      name: 'Saloum',
      slug: 'saloum',
      cx: 120,
      cy: 270,
      r: 5.5,
      desc: language === 'de' ? 'Mangroven, Bolongs und nachhaltiger Sérère-Tourismus' : language === 'en' ? 'Mangroves, bolongs and Serer community tourism' : 'Mangroves, bolongs et tourisme solidaire Sérère',
      img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const [activePin, setActivePin] = useState<any>(mapPoints[0]);

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C7A77A]/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Side: Testimonials (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A85D3A] block">
              {language === 'de' ? 'SIE VERTRAUEN UNS' : language === 'en' ? 'THEY TRUSTED US' : 'ILS NOUS ONT FAIT CONFIANCE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#151515]">
              {language === 'de' ? 'Erfahrungsberichte' : language === 'en' ? 'Traveler Testimonials' : 'Témoignages'}
            </h3>
          </div>

          {/* 3 Horizontal Compact Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {testimonials.map((tItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-[#C7A77A]/25 shadow-xs flex flex-col justify-between text-left space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={tItem.avatar}
                    alt={tItem.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#C7A77A]/30"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#151515] block leading-tight">
                      {tItem.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 block leading-tight">
                      {tItem.country}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-700 font-light italic leading-relaxed">
                  {tItem.comment}
                </p>

                {/* 5 Stars */}
                <div className="flex items-center gap-0.5 text-[#C99A4A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Link */}
          <div className="text-right pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A85D3A] hover:underline"
            >
              <span>{language === 'de' ? 'Weitere Bewertungen ansehen' : language === 'en' ? 'View more reviews' : 'Voir plus d’avis'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Side: Stylized Senegal Map & Interactive Legend (6 Cols) */}
        <div className="lg:col-span-6 bg-[#EFECE6] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#151515]">
              {language === 'de' ? 'Unsere interaktive Senegal-Karte' : language === 'en' ? 'Our Interactive Senegal Map' : 'Notre carte du Sénégal'}
            </h3>
            <p className="text-xs text-[#151515]/70 font-light mt-0.5">
              {t.map.clickToExplore}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-3 relative">
            {/* SVG Stylized Map (8 Cols) */}
            <div className="sm:col-span-8 relative min-h-[200px] flex items-center justify-center">
              <svg viewBox="0 0 500 350" className="w-full h-auto max-h-[220px]" fill="none">
                {/* Landmass of Senegal */}
                <path
                  d="M60,180 C80,140 130,100 160,50 C200,30 260,30 330,60 C400,90 460,140 450,200 C440,250 390,290 320,310 C240,320 160,300 120,280 C90,260 80,240 60,200 Z"
                  fill="#D8D0C3"
                  stroke="#BEB3A2"
                  strokeWidth="2"
                />

                {/* Gambia river groove */}
                <path
                  d="M100,240 C170,240 240,250 260,240 C240,230 170,220 100,220 Z"
                  fill="#EFECE6"
                  stroke="#BEB3A2"
                  strokeWidth="1.5"
                />

                {/* Interactive Pins */}
                {mapPoints.map((pin) => {
                  const isActive = activePin?.id === pin.id;
                  return (
                    <g
                      key={pin.id}
                      className="cursor-pointer group"
                      onClick={() => setActivePin(pin)}
                    >
                      <circle
                        cx={pin.cx}
                        cy={pin.cy}
                        r={pin.r}
                        fill={isActive ? '#C99A4A' : '#173C32'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="transition-all duration-300 group-hover:scale-125"
                      />
                      {isActive && (
                        <circle
                          cx={pin.cx}
                          cy={pin.cy}
                          r={pin.r + 5}
                          stroke="#C99A4A"
                          strokeWidth="1.5"
                          className="animate-ping opacity-75"
                        />
                      )}
                      <text
                        x={pin.cx + 9}
                        y={pin.cy + 3}
                        fill="#151515"
                        fontSize="10"
                        fontFamily="serif"
                        fontWeight={isActive ? 'bold' : 'normal'}
                        className="select-none pointer-events-none"
                      >
                        {pin.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Pin Detail Popup on right (4 Cols) */}
            {activePin && (
              <div className="sm:col-span-4 bg-white rounded-2xl p-3.5 shadow-md border border-[#C7A77A]/30 text-left space-y-2 animate-fadeIn relative">
                <button
                  onClick={() => setActivePin(null)}
                  className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-700 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="h-20 w-full rounded-xl overflow-hidden">
                  <img
                    src={activePin.img}
                    alt={activePin.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[#C99A4A] text-[10px] font-bold uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    <span>{activePin.name}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-light mt-0.5 leading-snug">
                    {activePin.desc}
                  </p>
                </div>

                <Link
                  to={`/excursions?destination=${activePin.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#173C32] hover:text-[#C99A4A] transition-colors"
                >
                  <span>{language === 'de' ? 'Touren entdecken' : language === 'en' ? 'View excursions' : 'Voir les excursions'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-2 border-t border-neutral-300/60">
            <span>{language === 'de' ? '8 Hauptreiseziele' : language === 'en' ? '8 Highlight Destinations' : '8 Destinations Phares'}</span>
            <Link to="/excursions" className="font-semibold text-[#173C32] hover:underline">
              {language === 'de' ? 'Alle Reiserouten →' : language === 'en' ? 'All itineraries →' : 'Tous les itinéraires →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
