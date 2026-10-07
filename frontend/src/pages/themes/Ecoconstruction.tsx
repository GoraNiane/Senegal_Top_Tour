import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Sun,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Wind,
  Layers,
  CheckCircle2,
  HeartHandshake,
  Compass,
} from 'lucide-react';
import { PageTransition } from '../../components/PageTransition';

export const Ecoconstruction: React.FC = () => {
  useEffect(() => {
    document.title = 'Écoconstruction & Architecture de Terre (Banco) | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Découvrez l’écoconstruction en terre crue au Sénégal : argile, banco, briques compressées, adaptation bioclimatique et chantiers durables.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      title: 'ARGILE & TERRE CRUE',
      subtitle: 'Inertie thermique & régulation naturelle',
      icon: Layers,
      description:
        'L’argile locale est le cœur de l’habitat bioclimatique sahélien. Grâce à sa remarquable capacité de déphasage thermique, la terre crue emmagasine la fraîcheur de la nuit pour la restituer durant les heures chaudes de la journée, garantissant un confort intérieur optimal sans aucune consommation électrique.',
      highlights: [
        'Excellente inertie thermique naturelle',
        'Régulation saine de l’hygrométrie ambiante',
        'Matériau 100% recyclable et biodégradable',
      ],
    },
    {
      title: 'BANCO TRADITIONNEL',
      subtitle: 'Savoir-faire séculaire & cohésion communautaire',
      icon: Home,
      description:
        'Le banco, savant mélange de terre argileuse, de paille locale et de fibres végétales fermentées, est façonné à la main selon des techniques ancestrales. Utilisé pour les murs porteurs, enduits lissés et voûtes nubiennes, il est l’expression vivante de la solidarité villageoise lors des chantiers collectifs.',
      highlights: [
        'Formulation naturelle à base de ressources locales',
        'Enduits protecteurs cirés et respirants',
        'Tradition de construction collective conviviale',
      ],
    },
    {
      title: 'MATÉRIAUX LOCAUX & INNOVATION',
      subtitle: 'Briques BTC, typha & coquillages',
      icon: Sparkles,
      description:
        'Allier héritage et modernité : fabrication de Briques de Terre Compressée (BTC), valorisation du roseau typha des rives du fleuve en panneaux isolants, et incorporation de coquilles de mollusques concassées (Fadiouth) pour des liants écologiques performants remplaçant le ciment importé.',
      highlights: [
        'Briques de terre compressée haute résistance',
        'Isolation phonique et thermique en typha',
        'Valorisation des coproduits naturels marins',
      ],
    },
    {
      title: 'CLIMAT & HABITAT DURABLE',
      subtitle: 'Architecture bioclimatique & fraîcheur passive',
      icon: Wind,
      description:
        'Orientation optimale face aux vents dominants (l’alizé maritime et l’harmattan), avant-toits ombragés protégeant les façades du soleil zénithal, claustras ventilés et cours intérieures végétalisées : chaque bâtiment est conçu pour dialoguer en harmonie avec le climat chaud sahélien.',
      highlights: [
        'Ventilation transversale naturelle',
        'Bilan carbone quasi nul sur le cycle de vie',
        'Habitat sain, respirant et durable',
      ],
    },
  ];

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-28">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative rounded-[32px] overflow-hidden bg-[#173C32] text-white p-8 sm:p-14 lg:p-16 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85"
                alt="Architecture en terre et banco au Sénégal"
                className="w-full h-full object-cover filter brightness-[0.40] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#173C32] via-[#173C32]/85 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                <Link to="/voyages-a-themes" className="hover:text-[#C99A4A] transition-colors">
                  Voyages à thèmes
                </Link>
                <span>/</span>
                <span className="text-[#C99A4A] uppercase tracking-wider font-semibold">
                  Écoconstruction
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.2em] border border-white/10">
                <Sun className="w-3.5 h-3.5" />
                <span>Architecture Bioclimatique & Terre Crue</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                Écoconstruction & Habitat en Banco
              </h1>

              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                Découvrez la sagesse constructive du Sénégal : des bâtisses séculaires en banco aux écovillages contemporains en briques de terre compressée, l’architecture naturelle offre une réponse moderne et durable aux défis climatiques.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Piliers Écoconstruction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A85D3A] font-bold">
              Principes constructifs
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
              Bâtir avec la terre, le soleil et le vent
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Une harmonie parfaite entre matériaux géo-sourcés locaux, inertie thermique et savoir-faire communautaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 shadow-sm hover:shadow-xl hover:border-[#173C32]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A] block">
                        {pil.title}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#173C32] mt-1 leading-snug">
                        {pil.subtitle}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {pil.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    {pil.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="bg-gradient-to-br from-[#173C32] to-[#122e26] text-white rounded-[32px] p-8 sm:p-12 shadow-xl space-y-6">
            <HeartHandshake className="w-12 h-12 text-[#C99A4A] mx-auto opacity-80" />
            <h3 className="text-2xl sm:text-3xl font-serif">
              Intéressé par l’écoconstruction sahélienne ?
            </h3>
            <p className="text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Nous concevons des voyages d’études, des visites de chantiers écologiques et des rencontres avec les maîtres bâtisseurs en terre.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/reservation?experienceType=Voyage%20Etude%20Ecoconstruction"
                className="btn-gold py-3.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Construire une expérience sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Demande%20voyage%20Ecoconstruction"
                className="py-3.5 px-6 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#C99A4A]" />
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Ecoconstruction;
