import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ChefHat,
  Recycle,
  Home as HomeIcon,
  ArrowRight,
  PhoneCall,
  Sparkles,
  GraduationCap,
  Hammer,
  Trees,
  MessageSquare,
  BookOpen,
  Handshake,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export const Themes: React.FC = () => {
  useEffect(() => {
    document.title = 'Voyages à Thèmes — Voyager autour d’une idée | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Voyager autour d’une idée : tourisme pensé comme une école mobile. Rencontres entre homologues, cooking class de la Teranga, recyclage créatif et écoconstruction au Sénégal.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const peerProfiles = [
    {
      title: 'Enseignants & Éducateurs',
      icon: GraduationCap,
      description:
        'Immersion dans les écoles primaires, collèges et centres de formation pour échanger avec des enseignants sénégalais sur les démarches pédagogiques, la gestion de classe et la transmission des savoirs.',
    },
    {
      title: 'Éleveurs & Pasteurs',
      icon: Trees,
      description:
        'Rencontre avec les éleveurs de la zone sylvopastorale et des Niayes : partage d’expériences sur la conduite des troupeaux, la sélection des races locales, le fourrage et l’adaptation au climat sahélien.',
    },
    {
      title: 'Maîtres Artisans',
      icon: Hammer,
      description:
        'Partage d’atelier avec les forgerons, sculpteurs sur bois, maroquiniers, potières et tisserands : confrontation des gestes, des outils traditionnels et des sensibilités artistiques.',
    },
    {
      title: 'Acteurs de l’Écoconstruction',
      icon: HomeIcon,
      description:
        'Visite de chantiers en terre crue (banco), briques de terre compressée (BTC) et dialogue avec les maçons et architectes bioclimatiques sur les techniques d’isolation passive.',
    },
  ];

  const peerTimeline = [
    {
      step: '01',
      title: 'RENCONTRER',
      icon: Users,
      description: 'Mise en relation directe avec vos pairs et pairs professionnels sénégalais dans leur milieu de travail.',
    },
    {
      step: '02',
      title: 'ÉCHANGER',
      icon: MessageSquare,
      description: 'Dialogue ouvert d’égal à égal sur les pratiques, défis quotidiens, innovations et réalités de terrain.',
    },
    {
      step: '03',
      title: 'APPRENDRE',
      icon: BookOpen,
      description: 'Observation des savoir-faire ancestraux, des ingéniosités locales et des méthodes de travail adaptées.',
    },
    {
      step: '04',
      title: 'COLLABORER',
      icon: Handshake,
      description: 'Tissage de liens durables, co-création éventuelle et partenariats professionnels humains et enrichissants.',
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
            {/* Background Image with warm overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85"
                alt="Voyages à thèmes au Sénégal"
                className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#173C32] via-[#173C32]/90 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.25em] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Voyages Thématiques</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                « Voyager autour d'une idée. »
              </h1>

              <p className="text-base sm:text-xl text-white/90 font-light leading-relaxed max-w-2xl">
                « Nous concevons le tourisme comme une école mobile : un espace de rencontre, d'apprentissage et d'échange. »
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#rencontres-homologues"
                  className="btn-gold py-3.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-2 shadow-lg"
                >
                  <span>Découvrir les expériences</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            2. RENCONTRES ENTRE HOMOLOGUES
           ================================================== */}
        <section id="rencontres-homologues" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-32">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-14 border border-[#C7A77A]/30 shadow-sm space-y-12">
            {/* Header & Concept */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>Expérience Dédiée</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
                  Rencontres entre homologues
                </h2>
                <p className="text-base text-neutral-700 font-light leading-relaxed">
                  Le concept est simple et profondément humain : <strong>des professionnels de différents pays se rencontrent pour partager leurs expériences</strong>, confronter leurs regards et enrichir mutuellement leurs pratiques dans un cadre immersif et respectueux.
                </p>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-2">
                <Quote className="w-6 h-6 text-[#C99A4A]" />
                <p className="text-xs text-[#173C32] font-serif italic leading-relaxed">
                  « Le voyage devient alors un pont de compétences, un dialogue d’égal à égal entre passionnés d’un même métier. »
                </p>
              </div>
            </div>

            {/* 4 Profils Phares */}
            <div>
              <h3 className="text-xl font-serif text-[#173C32] font-bold mb-6">
                Domaines d'échange proposés
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {peerProfiles.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/20 hover:border-[#173C32]/40 transition-all duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-[#173C32] text-white flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#C99A4A]" />
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#173C32] leading-snug">
                          {p.title}
                        </h4>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline : RENCONTRER -> ÉCHANGER -> APPRENDRE -> COLLABORER */}
            <div className="pt-6 border-t border-neutral-100">
              <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A]">
                  La démarche pédagogique
                </span>
                <h3 className="text-2xl font-serif text-[#173C32]">
                  La timeline de l'immersion
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {peerTimeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-[#C7A77A]/30 shadow-sm relative group hover:border-[#173C32] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#173C32]/10 text-[#173C32] flex items-center justify-center group-hover:bg-[#173C32] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-[#C7A77A]/60">
                          {item.step}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A] block mb-1">
                        {item.title}
                      </span>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Peer Tour */}
            <div className="pt-4 text-center">
              <Link
                to="/reservation?experienceType=Rencontres%20entre%20homologues"
                className="btn-primary text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Construire une rencontre entre homologues sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================
            3. COOKING CLASS (Spotlight)
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-[#173C32] text-white rounded-[36px] p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C99A4A] text-xs font-semibold uppercase tracking-wider">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Atelier Culinaire & Gastronomie</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
                  Cooking Class de la Teranga
                </h2>

                <p className="text-base text-white/85 font-light leading-relaxed">
                  Vivez l'alchimie de la cuisine sénégalaise : de la sélection matinale au marché d’épices jusqu’à la dégustation collective du <strong>Thiéboudienne</strong> et des spécialités locales préparées aux côtés d'une famille passionnée.
                </p>

                {/* Parcours Visuel Pill Steps */}
                <div className="py-2">
                  <span className="text-xs uppercase tracking-widest text-[#C99A4A] font-bold block mb-3">
                    Parcours visuel :
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md font-bold text-white border border-white/15">
                      MARCHÉ
                    </span>
                    <span className="text-[#C99A4A] font-bold">↓</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md font-bold text-white border border-white/15">
                      INGRÉDIENTS
                    </span>
                    <span className="text-[#C99A4A] font-bold">↓</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md font-bold text-white border border-white/15">
                      CUISINE
                    </span>
                    <span className="text-[#C99A4A] font-bold">↓</span>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md font-bold text-white border border-white/15">
                      DÉGUSTATION
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-4">
                  <Link
                    to="/voyages-a-themes/cooking-class"
                    className="btn-gold py-3 px-6 text-xs uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-2 shadow-lg"
                  >
                    <span>Découvrir la Cooking Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85"
                  alt="Cooking class sénégalaise"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            4. RECYCLAGE & 5. ÉCOCONSTRUCTION (Two Columns Grid)
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 4. RECYCLAGE */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#C7A77A]/30 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300">
              <div className="space-y-5">
                <div className="h-56 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85"
                    alt="Recyclage artisanal"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                  <Recycle className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>Savoir-Faire Local</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                  Recyclage & Upcycling Créatif
                </h3>

                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Découvrez l’ingéniosité des artisans dakarois qui subliment l’<strong>aluminium de récupération</strong> en marmites traditionnelles, les <strong>chutes de bois et de pirogues</strong> en mobilier, les <strong>peaux locales</strong> en maroquinerie d’art et la ferraille en œuvres contemporaines.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fonderies d’aluminium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bois de pirogue marin</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tannage végétal & peaux</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Économie circulaire</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <Link
                  to="/voyages-a-themes/recyclage"
                  className="btn-primary text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 w-full justify-center"
                >
                  <span>Explorer l’atelier recyclage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 5. ÉCOCONSTRUCTION */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#C7A77A]/30 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300">
              <div className="space-y-5">
                <div className="h-56 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85"
                    alt="Écoconstruction banco"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                  <HomeIcon className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>Habitat Durable</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                  Écoconstruction & Banco
                </h3>

                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Immersion dans l’architecture bioclimatique sahélienne : utilisation de l’<strong>argile</strong>, du <strong>banco traditionnel</strong> et de matériaux locaux pour bâtir des habitats sains, régulateurs de température et respectueux du climat sans dépendre du ciment industriel.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inertie thermique de l’argile</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Banco & fibres naturelles</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Briques compressées (BTC)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ventilation passive</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <Link
                  to="/voyages-a-themes/ecoconstruction"
                  className="btn-primary text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 w-full justify-center"
                >
                  <span>Explorer l’écoconstruction</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            11. GLOBAL CTAS
           ================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#173C32] to-[#122e26] text-white rounded-[36px] p-8 sm:p-14 shadow-2xl space-y-6">
            <Sparkles className="w-12 h-12 text-[#C99A4A] mx-auto opacity-80" />
            <h3 className="text-2xl sm:text-4xl font-serif">
              Une idée particulière en tête ?
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Nous concevons des itinéraires thématiques 100% personnalisés selon votre profession, votre passion ou vos objectifs pédagogiques.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/reservation?experienceType=Voyage%20a%20theme%20sur%20mesure"
                className="btn-gold py-4 px-8 text-xs uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Construire une expérience sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Projet%20Voyage%20a%20themes"
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
export default Themes;
