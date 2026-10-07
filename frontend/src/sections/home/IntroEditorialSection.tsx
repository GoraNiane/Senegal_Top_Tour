import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';

export const IntroEditorialSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4EE] text-[#151515] border-b border-[#C7A77A]/20">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="green" icon={<Compass className="w-3.5 h-3.5 text-[#C99A4A]" />}>
              VISION & PHILOSOPHIE
            </Badge>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173C32] leading-tight">
              Plus qu'un voyage, <br className="hidden sm:inline" />
              <span className="italic text-[#C99A4A] font-normal">une rencontre avec le Sénégal.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
              SENEGAL TOP TOUR est né d’un désir profond : faire découvrir le Sénégal au-delà des sentiers battus et du tourisme standardisé. Nous croyons que chaque voyage doit être une passerelle vivante entre les voyageurs et les femmes et hommes qui font la richesse de notre pays.
            </p>

            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Des ruelles chargées de mémoire de l’île de Gorée aux ateliers des maîtres forgerons de Dakar, des dunes dorées du Lac Rose aux villages solidaires du Sine-Saloum, nos itinéraires sont conçus pour susciter l'émerveillement, le respect mutuel et des souvenirs inoubliables.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#C7A77A]/25 shadow-xs space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#173C32] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99A4A]" />
                  Expériences Privatisées
                </span>
                <p className="text-xs text-neutral-500 font-light">
                  Véhicules confortables et guides officiels historiens dédiés à votre rythme.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#C7A77A]/25 shadow-xs space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#173C32] flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#A85D3A]" />
                  Tourisme Responsable
                </span>
                <p className="text-xs text-neutral-500 font-light">
                  Chaque séjour soutient directement les écoles et dispensaires ruraux.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-full bg-[#173C32] hover:bg-[#1f4f42] text-white transition-all shadow-md"
              >
                <span>Découvrir notre histoire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Large Photography Layout (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-neutral-900 group">
              <img
                src="/images/goree1.jpg"
                alt="Pêcheurs et enfants au coucher de soleil à Gorée"
                loading="lazy"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C99A4A] font-bold">
                  TERANGA & HOSPITALITÉ
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold">
                  L'âme authentique du Sénégal
                </h4>
                <p className="text-xs text-white/80 font-light">
                  Partage, générosité et chaleur humaine au cœur de chaque étape.
                </p>
              </div>
            </div>

            {/* Small Floating Seal Badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#C99A4A] text-[#151515] p-3.5 sm:p-4 rounded-2xl shadow-xl border-2 border-white hidden sm:block">
              <span className="font-serif font-bold text-lg block leading-none">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider block mt-0.5">Local & Éthique</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
