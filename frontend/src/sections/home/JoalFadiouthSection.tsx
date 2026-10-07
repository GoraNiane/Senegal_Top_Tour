import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Check, Compass } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';
import { joalFadiouthData } from '../../data/homepageData';

export const JoalFadiouthSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#EBE7DF] text-[#151515] border-b border-[#C7A77A]/20">
      <Container size="xl">
        <div className="bg-white rounded-[32px] overflow-hidden border border-[#C7A77A]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 text-left">
          {/* Left Large Media (6 Cols) */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[480px] bg-neutral-900 overflow-hidden group">
            <img
              src={joalFadiouthData.imageUrl}
              alt="Île aux coquillages de Joal-Fadiouth et pont en bois"
              loading="lazy"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <Badge variant="glass">EXCURSION À LA JOURNÉE</Badge>
              <Badge variant="gold">PETITE CÔTE</Badge>
            </div>

            {/* Bottom details */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
                <span>{joalFadiouthData.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#C7A77A]" />
                <span>{joalFadiouthData.departure}</span>
              </div>
            </div>
          </div>

          {/* Right Narrative (6 Cols) */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#A85D3A] block">
                  {joalFadiouthData.tagline}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173C32] leading-tight">
                  {joalFadiouthData.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#C99A4A] font-serif italic">
                  {joalFadiouthData.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {joalFadiouthData.description}
              </p>

              {/* Inclusions / Highlights */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#173C32] block">
                  Au programme de votre journée :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {joalFadiouthData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <div className="w-4 h-4 rounded-full bg-[#173C32]/10 text-[#173C32] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action CTA */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                  Tarif Excursion Privatisée
                </span>
                <span className="text-sm font-serif font-bold text-[#173C32]">
                  Sur devis / 1 à 15 participants
                </span>
              </div>

              <Link
                to={joalFadiouthData.href}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full bg-[#173C32] hover:bg-[#132c25] text-white transition-all shadow-md"
              >
                <span>Découvrir Joal-Fadiouth</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
