import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';

export const GoreeFeatureSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#173C32] text-white overflow-hidden">
      {/* Background Ambience / Visual Depth */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C99A4A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C99A4A]/15 blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Media Collage (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-2 border-white/20 aspect-[16/11] bg-neutral-900 group">
              <img
                src="/images/goree0.jpg"
                alt="Maison des Esclaves et ruelles pastel de Gorée"
                loading="lazy"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-106 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <Badge variant="gold">PATRIMOINE MONDIAL UNESCO</Badge>
              </div>

              {/* Bottom Schedule overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>08h30 – 12h00 ou 13h00 – 18h00</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A77A]" />
                  <span>Baie de Dakar</span>
                </div>
              </div>
            </div>

            {/* Small Inset Photo Card */}
            <div className="absolute -bottom-6 -right-6 w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#173C32] hidden sm:block">
              <img
                src="/images/goree2.jpg"
                alt="Ateliers d'artistes à Gorée"
                className="w-full h-28 sm:h-32 object-cover"
              />
            </div>
          </div>

          {/* Right Text & Narrative (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#C99A4A] text-xs font-semibold uppercase tracking-wider">
                Mémoire
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider">
                Patrimoine
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider">
                Culture
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              ÎLE DE GORÉE
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
              À seulement 20 minutes de chaloupe de Dakar, Gorée est une île hors du temps où nulle voiture ne circule. Entre le silence émouvant de la Maison des Esclaves et la douceur de ses ruelles fleuries aux façades ocre et pastel, l'île invite à un recueillement universel et à une contemplation artistique rare.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-white/90 font-light">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C99A4A] shrink-0 mt-0.5" />
                <span>Visite guidée exclusive par un historien agréé de l’île de Gorée.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#C99A4A] shrink-0 mt-0.5" />
                <span>Accès au Castel, offrant un panorama à 360° sur toute la rade de Dakar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C99A4A] shrink-0 mt-0.5" />
                <span>Horaires au choix : matinée (08h30–12h00) ou après-midi (13h00–18h00).</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/reservation?excursion=Île%20de%20Gorée"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C99A4A] to-[#C7A77A] text-[#151515] hover:brightness-105 shadow-lg transition-all"
              >
                <span>Réserver l'excursion Gorée</span>
                <ArrowRight className="w-4 h-4 text-[#151515]" />
              </Link>

              <Link
                to="/excursions/dakar-goree"
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white underline underline-offset-4 transition-colors"
              >
                <span>Voir le circuit combiné Dakar + Gorée</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
