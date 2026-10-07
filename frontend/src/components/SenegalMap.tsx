import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Sparkles, X, Compass } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

interface MapPoint {
  id: string;
  name: string;
  slug: string;
  region: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  svgX: number; // percentage in SVG viewBox
  svgY: number;
}

export const SenegalMap: React.FC = () => {
  const points: MapPoint[] = [
    {
      id: 'dakar',
      name: 'Dakar',
      slug: 'dakar',
      region: 'Presqu\'île du Cap-Vert',
      subtitle: 'Culture · Vie urbaine · Marchés',
      description: 'Capitale dynamique et avant-garde artistique de l\'Afrique de l\'Ouest.',
      imageUrl: '/images/dakar.png',
      svgX: 18,
      svgY: 48,
    },
    {
      id: 'goree',
      name: 'Île de Gorée',
      slug: 'goree',
      region: 'Baie de Dakar',
      subtitle: 'Histoire · Mémoire · Patrimoine UNESCO',
      description: 'Île sanctuaire piétonne et mémoire universelle chargée d\'émotion.',
      imageUrl: '/images/goree0.jpg',
      svgX: 16,
      svgY: 53,
    },
    {
      id: 'lac-rose',
      name: 'Lac Rose (Lac Retba)',
      slug: 'lac-rose',
      region: 'Cap-Vert Nord',
      subtitle: 'Nature · Dunes · Sel rose',
      description: 'Lagune saline aux teintes rosées et pistes mythiques du Paris-Dakar.',
      imageUrl: '/images/lac-rose-00.webp',
      svgX: 22,
      svgY: 44,
    },
    {
      id: 'kayar',
      name: 'Kayar',
      slug: 'kayar',
      region: 'Grande Côte',
      subtitle: 'Pêche artisanale · Village des Tortues',
      description: 'Le ballet impressionnant des pirogues et le sanctuaire des tortues de Noflaye.',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      svgX: 24,
      svgY: 40,
    },
    {
      id: 'lompoul',
      name: 'Désert de Lompoul',
      slug: 'lompoul',
      region: 'Nord-Ouest',
      subtitle: 'Désert · Bivouac sous les étoiles',
      description: 'Dunes de sable ocre majestueuses et nuits nomades au coin du feu.',
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      svgX: 28,
      svgY: 30,
    },
    {
      id: 'saint-louis',
      name: 'Saint-Louis',
      slug: 'saint-louis',
      region: 'Nord / Fleuve Sénégal',
      subtitle: 'Patrimoine UNESCO · Calèches · Jazz',
      description: 'L\'ancienne capitale au charme colonial, varangues et histoire fluviale.',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
      svgX: 28,
      svgY: 18,
    },
    {
      id: 'djoudj',
      name: 'Parc du Djoudj',
      slug: 'djoudj',
      region: 'Delta du Fleuve Sénégal',
      subtitle: 'Sanctuaire d\'oiseaux migrateurs',
      description: '3ème réserve ornithologique mondiale et ballet des pélicans (Octobre à Avril).',
      imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=600&q=80',
      svgX: 34,
      svgY: 10,
    },
    {
      id: 'touba',
      name: 'Touba',
      slug: 'touba',
      region: 'Diourbel',
      subtitle: 'Spiritualité & Grande Mosquée',
      description: 'Capitale religieuse mouride et l\'une des plus somptueuses mosquées d\'Afrique.',
      imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80',
      svgX: 42,
      svgY: 45,
    },
    {
      id: 'saloum',
      name: 'Delta du Saloum',
      slug: 'saloum',
      region: 'Sine Saloum',
      subtitle: 'Mangroves · Îles · Tourisme Solidaire',
      description: 'Réserve de biosphère, bolongs enchanteurs et villages de pêcheurs Sérères.',
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
      svgX: 30,
      svgY: 65,
    },
  ];

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(points[0]);

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionTitle
        badge="Notre Carte du Sénégal"
        title="Une géographie de merveilles"
        subtitle="Explorez les destinations phares du Sénégal et visualisez leurs positions d'un simple clic sur la carte interactive."
        align="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151515] rounded-[32px] p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Interactive SVG Senegal Map (Left 7 Cols) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-4">
          <svg
            viewBox="0 0 1000 700"
            className="w-full h-full max-h-[500px] drop-shadow-xl select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Senegal Stylized Geographic Outline Path */}
            <path
              d="M160,340 C170,300 240,240 270,160 C300,100 350,60 440,60 C530,60 620,110 740,150 C860,200 950,280 940,360 C930,420 880,480 820,530 C760,580 660,600 580,590 C510,580 480,630 380,640 C280,650 200,600 180,540 C160,500 260,490 320,490 C420,490 480,510 500,480 C520,450 480,420 380,420 C280,420 220,410 180,380 Z"
              fill="#1b2823"
              stroke="#C7A77A"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              opacity="0.9"
            />

            {/* Gambia enclave indentation representation */}
            <path
              d="M200,480 C320,480 460,490 480,470 C460,450 320,440 200,440 Z"
              fill="#151515"
              stroke="#C7A77A"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Ocean Waves lines */}
            <path d="M40,200 C80,220 100,180 140,200" stroke="#C99A4A" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
            <path d="M60,400 C100,420 110,390 140,410" stroke="#C99A4A" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
            <path d="M50,560 C90,580 120,550 150,570" stroke="#C99A4A" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />

            <text x="70" y="280" fill="#C7A77A" fontSize="18" fontFamily="serif" letterSpacing="4" opacity="0.5">
              OCÉAN ATLANTIQUE
            </text>

            {/* Clickable Map Markers */}
            {points.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              // Map SVG percentage to 1000x700 viewBox
              const cx = (pt.svgX / 100) * 1000;
              const cy = (pt.svgY / 100) * 700;

              return (
                <g
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt)}
                  className="cursor-pointer group"
                >
                  {/* Ping Animation on selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="22"
                      fill="#C99A4A"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Outer Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? '14' : '10'}
                    fill={isSelected ? '#C99A4A' : '#173C32'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Center Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill={isSelected ? '#151515' : '#C99A4A'}
                  />

                  {/* Label on map */}
                  <text
                    x={cx + 18}
                    y={cy + 5}
                    fill={isSelected ? '#C99A4A' : '#F7F4EE'}
                    fontSize={isSelected ? '16' : '13'}
                    fontWeight={isSelected ? '700' : '500'}
                    fontFamily="sans-serif"
                    className="select-none transition-all drop-shadow-md"
                  >
                    {pt.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail Card for Selected Point (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C99A4A]" />
                {selectedPoint.region}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/80">
                Étape Clé
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              {selectedPoint.name}
            </h3>
            <p className="text-xs text-[#A85D3A] uppercase tracking-wider font-semibold mb-4">
              {selectedPoint.subtitle}
            </p>

            <img
              src={selectedPoint.imageUrl}
              alt={selectedPoint.name}
              className="w-full h-44 object-cover rounded-xl mb-4 border border-white/10"
            />

            <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
              {selectedPoint.description}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <Link
              to={`/excursions?destination=${selectedPoint.slug}`}
              className="flex-1 btn-gold py-3 text-xs uppercase tracking-wider font-bold rounded-full text-center flex items-center justify-center gap-2"
            >
              <span>Excursions à {selectedPoint.name}</span>
              <ArrowRight className="w-4 h-4 text-[#151515]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
