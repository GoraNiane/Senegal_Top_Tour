import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ArrowRight, GraduationCap, HeartPulse, Droplets, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Badge } from '../../components/ui/Badge';
import { solidarityImpactPillars } from '../../data/homepageData';

export const SolidarityImpactSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#173C32] text-white border-b border-white/10 text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C99A4A]/10 blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Pitch (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="gold" icon={<HeartHandshake className="w-3.5 h-3.5" />}>
              ENGAGEMENT CITOYEN & DURABLE
            </Badge>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Voyager avec un impact.
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
              Nous réinvestissons une part directe de chaque réservation dans les projets de développement communautaire co-construits avec les villages : écoles de brousse, dispensaires ruraux, adduction d'eau et éco-habitat en terre crue.
            </p>

            <div className="pt-2">
              <Link
                to="/tourisme-solidaire"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C99A4A] to-[#C7A77A] text-[#151515] hover:brightness-105 transition-all shadow-lg"
              >
                <span>Découvrir notre approche</span>
                <ArrowRight className="w-4 h-4 text-[#151515]" />
              </Link>
            </div>
          </div>

          {/* Right Pillars List Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solidarityImpactPillars.map((p, idx) => (
              <div
                key={idx}
                className={`bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/15 transition-all duration-300 space-y-2 ${
                  idx === 0 ? 'sm:col-span-2 bg-white/15 border-[#C99A4A]/40' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C99A4A]">
                    {p.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#C99A4A]" />
                </div>

                <h3 className="font-serif text-lg font-bold text-white">
                  {p.title}
                </h3>

                <p className="text-xs text-white/75 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
