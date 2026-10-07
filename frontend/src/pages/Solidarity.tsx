import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  Droplets,
  Home as HomeIcon,
  ArrowRight,
  PhoneCall,
  Compass,
  Users,
  Sparkles,
  Quote,
  CheckCircle2,
  TreePine,
  ShieldCheck,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export const Solidarity: React.FC = () => {
  useEffect(() => {
    document.title = 'Tourisme Solidaire & Rural Intégré au Sénégal | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Voyager avec un impact : découvrez le concept du Tourisme Rural Intégré au Sénégal. Éducation, santé, assainissement et écoconstruction co-construits avec les communautés locales.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  // Narration 5 steps: VOYAGE -> RENCONTRE -> IMMERSION -> ÉCONOMIE LOCALE -> PROJET COMMUNAUTAIRE
  const ruralNarrativeSteps = [
    {
      step: '01',
      title: 'VOYAGE',
      icon: Compass,
      description:
        'Le voyage commence par la découverte respectueuse de territoires ruraux authentiques, loin des circuits touristiques de masse standardisés.',
    },
    {
      step: '02',
      title: 'RENCONTRE',
      icon: Users,
      description:
        'Accueil chaleureux au sein des villages selon la tradition séculaire de la Teranga, favorisant des échanges sincères et bienveillants avec les habitants.',
    },
    {
      step: '03',
      title: 'IMMERSION',
      icon: Sparkles,
      description:
        'Partage de la vie quotidienne villageoise : découverte des savoir-faire, préparation des repas familiaux et compréhension intime des réalités locales.',
    },
    {
      step: '04',
      title: 'ÉCONOMIE LOCALE',
      icon: HeartHandshake,
      description:
        'Retombées économiques directes pour les familles, les groupements de femmes, les pêcheurs, éleveurs et artisans du terroir.',
    },
    {
      step: '05',
      title: 'PROJET COMMUNAUTAIRE',
      icon: HomeIcon,
      description:
        'Une contribution concrète et concertée aux initiatives de développement durable définies et portées par la communauté villageoise elle-même.',
    },
  ];

  // 4 Domaines d'Action
  const actionDomains = [
    {
      id: 'education',
      title: 'ÉDUCATION',
      subtitle: 'Accompagner l’apprentissage et l’épanouissement des enfants',
      icon: GraduationCap,
      description:
        'L’accès au savoir est le premier levier d’émancipation des jeunes générations rurales. Nos orientations visent à améliorer les conditions matérielles d’apprentissage dans les villages.',
      actions: [
        'Équipement d’écoles primaires et fournitures pédagogiques',
        'Rénovation de toitures, huisseries et clôtures scolaires',
        'Aménagement et réhabilitation de salles de classe',
        'Construction de blocs de latrines hygiéniques et séparées',
      ],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'sante',
      title: 'SANTÉ',
      subtitle: 'Renforcer l’accès aux soins de premier secours',
      icon: HeartPulse,
      description:
        'Dans les zones rurales éloignées des centres hospitaliers urbains, l’appui aux structures de soins de proximité est une priorité vitale pour les familles.',
      actions: [
        'Appui aux postes de santé villageois et cases de santé',
        'Fourniture d’équipements médicaux de base et trousses de premiers soins',
        'Soutien aux agents de santé communautaires et matrones',
        'Amélioration des conditions d’accueil des patients et mères',
      ],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'assainissement',
      title: 'ASSAINISSEMENT & HYGIÈNE',
      subtitle: 'Préserver l’environnement et les ressources vitales',
      icon: Droplets,
      description:
        'Garantir un environnement sain par une gestion raisonnée de l’eau, des déchets et la sauvegarde des écosystèmes fragiles comme les mangroves côtières.',
      actions: [
        'Sensibilisation à l’hygiène publique et salubrité villageoise',
        'Aménagement de points d’eau potable et assainissement rural',
        'Gestion communautaire des déchets et opérations de propreté',
        'Protection des ressources naturelles et des zones de mangrove',
      ],
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'ecoconstruction',
      title: 'ÉCOCONSTRUCTION',
      subtitle: 'Valoriser les matériaux locaux et la terre crue',
      icon: HomeIcon,
      description:
        'Promouvoir un habitat sain et durable en réduisant l’empreinte écologique et la dépendance aux matériaux industriels importés.',
      actions: [
        'Utilisation d’argile locale et de terre crue géo-sourcée',
        'Mise en œuvre du banco traditionnel et techniques d’enduits naturels',
        'Valorisation des matériaux locaux (paille, typha, briques compressées)',
        'Conception de bâtiments publics frais et adaptés au climat chaud',
      ],
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-28">
        {/* ==================================================
            1. HERO SECTION
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative rounded-[36px] overflow-hidden bg-[#173C32] text-white p-8 sm:p-14 lg:p-20 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85"
                alt="Tourisme solidaire au Sénégal"
                className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#173C32] via-[#173C32]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.25em] border border-white/10">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Tourisme Solidaire & Responsable</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                « Voyager avec un impact. »
              </h1>

              <p className="text-base sm:text-xl text-white/90 font-light leading-relaxed max-w-2xl">
                « Découvrir le Sénégal tout en contribuant au développement des communautés locales. »
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#tourisme-rural-integre"
                  className="btn-gold py-3.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Découvrir notre démarche</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            2. TOURISME RURAL INTÉGRÉ (Narration en 5 étapes)
           ================================================== */}
        <section id="tourisme-rural-integre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-32">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-[#C7A77A]/30 shadow-sm space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A85D3A] font-bold">
                Le Concept
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
                Le Tourisme Rural Intégré
              </h2>
              <p className="text-base text-neutral-700 font-light leading-relaxed">
                Le Tourisme Rural Intégré est un modèle de voyage équitable où la communauté d'accueil est actrice, décisionnaire et première bénéficiaire des activités touristiques.
              </p>
            </div>

            {/* Narration Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {ruralNarrativeSteps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#F7F4EE] rounded-2xl p-6 border border-[#C7A77A]/25 flex flex-col justify-between space-y-4 hover:border-[#173C32]/40 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#173C32] text-[#C99A4A] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-serif font-bold text-[#C7A77A]/70">
                          {item.step}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A] block">
                        {item.title}
                      </span>

                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            3. SECTION PHILOSOPHIE (FONDAMENTALE)
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#173C32] to-[#122e26] text-white p-8 sm:p-14 lg:p-16 shadow-2xl border border-[#C7A77A]/30">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Quote className="w-12 h-12 text-[#C99A4A] mx-auto opacity-80" />

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif leading-tight">
                « Des projets construits avec les communautés, pas imposés aux communautés. »
              </h2>

              <div className="w-20 h-1 bg-[#C99A4A] mx-auto rounded-full" />

              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                La véritable solidarité repose sur l’écoute et le respect mutuel. <strong>Les projets sont rigoureusement sélectionnés après concertation avec les populations locales</strong> (chefs de village, comités de développement, groupements de femmes et jeunes), afin de répondre à leurs besoins réels et prioritaires.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-white/90">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[#C99A4A] font-bold block mb-1">CONCERTATION</span>
                  <p className="font-light text-white/80">Décision collective avec les instances villageoises.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[#C99A4A] font-bold block mb-1">AUTONOMIE</span>
                  <p className="font-light text-white/80">Appropriation durable par les bénéficiaires locaux.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <span className="text-[#C99A4A] font-bold block mb-1">TRANSPARENCE</span>
                  <p className="font-light text-white/80">Affectation claire et traçabilité des soutiens.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            4. LES 4 DOMAINES D'ACTION
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A85D3A] font-bold">
              Axes d’Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
              Quatre grands domaines d'action
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Des orientations concrètes pour accompagner durablement le bien-être et l'avenir des terroirs.
            </p>
          </div>

          <div className="space-y-12">
            {actionDomains.map((domain, idx) => {
              const Icon = domain.icon;
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={domain.id}
                  className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#C7A77A]/30 shadow-sm overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Column */}
                    <div className={`space-y-6 ${isEven ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                        <Icon className="w-3.5 h-3.5 text-[#C99A4A]" />
                        <span>{domain.title}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                        {domain.subtitle}
                      </h3>

                      <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                        {domain.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {domain.actions.map((act, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20 flex items-start gap-2.5 text-xs text-neutral-700 font-medium"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#173C32] flex-shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className={`h-[300px] sm:h-[360px] rounded-3xl overflow-hidden shadow-lg border border-[#C7A77A]/20 ${isEven ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
                      <img
                        src={domain.image}
                        alt={domain.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            5. CTAS SECTION
           ================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#173C32] to-[#122e26] text-white rounded-[36px] p-8 sm:p-14 shadow-2xl space-y-6">
            <ShieldCheck className="w-12 h-12 text-[#C99A4A] mx-auto opacity-80" />
            <h3 className="text-2xl sm:text-4xl font-serif">
              Participer à une initiative solidaire ?
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Nous construisons des séjours immersifs sur mesure en accord avec vos valeurs et les besoins exprimés par les communautés villageoises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/reservation?experienceType=Tourisme%20Solidaire%20sur%20mesure"
                className="btn-gold py-4 px-8 text-xs uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Construire une expérience sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Projet%20Tourisme%20Solidaire"
                className="py-4 px-8 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#C99A4A]" />
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
export default Solidarity;
