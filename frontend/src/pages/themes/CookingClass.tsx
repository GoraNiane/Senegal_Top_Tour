import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat,
  ShoppingBag,
  Flame,
  Utensils,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Clock,
  Users,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import { PageTransition } from '../../components/PageTransition';

export const CookingClass: React.FC = () => {
  useEffect(() => {
    document.title = 'Cooking Class de la Teranga — Atelier Cuisine Sénégalaise | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Vivez une expérience culinaire immersive au Sénégal : marché traditionnel, sélection des ingrédients locaux, préparation et dégustation partagée.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      step: '01',
      title: 'MARCHÉ',
      subtitle: 'Immersion au marché traditionnel',
      icon: ShoppingBag,
      description:
        'Plongez dans l’effervescence des allées colorées d’un marché local dakarois. Accompagné de votre hôte cuisinier, vous apprenez à échanger avec les maraîchères et à vous orienter parmi les étals d’épices parfumées.',
      highlights: ['Ambiance vibrante', 'Rencontre avec les marchands', 'Découverte des herbes et aromates'],
    },
    {
      step: '02',
      title: 'INGRÉDIENTS',
      subtitle: 'Sélection des produits du terroir',
      icon: Sparkles,
      description:
        'Choix minutieux des légumes frais de la zone des Niayes (manioc, patate douce, chou, carotte), des poissons du jour ou viandes, et des condiments traditionnels comme le nététou, le guedj ou le bissap.',
      highlights: ['Produits 100% frais et locaux', 'Sensibilisation aux saveurs sénégalaises', 'Qualité et fraîcheur'],
    },
    {
      step: '03',
      title: 'CUISINE',
      subtitle: 'Préparation et secrets de cuisson',
      icon: Flame,
      description:
        'En cuisine ou dans la cour familiale ombragée, apprenez les tours de main traditionnels : découpe au pilon de bois, maîtrise des feux, dosage subtil des sauces et confection minutieuse du plat emblématique.',
      highlights: ['Gestes ancestraux', 'Transmission de secrets de famille', 'Participation active à chaque étape'],
    },
    {
      step: '04',
      title: 'DÉGUSTATION',
      subtitle: 'Le repas partagé autour du grand bol',
      icon: Utensils,
      description:
        'Moment d’apothéose et de convivialité : dégustez votre création autour du grand bol commun selon la pure tradition de la Teranga, accompagné de jus locaux naturels (hibiscus/bissap, bouye).',
      highlights: ['Art du partage de la Teranga', 'Dégustation chaleureuse', 'Échanges et souvenirs inoubliables'],
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
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=85"
                alt="Cooking Class de la Teranga"
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
                  Cooking Class
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.2em] border border-white/10">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Gastronomie & Teranga</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                Cooking Class de la Teranga
              </h1>

              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                De la découverte des étals colorés du marché traditionnel jusqu’au rituel chaleureux du repas partagé, initiez-vous aux secrets de la grande cuisine sénégalaise.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-medium text-white/90">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <Clock className="w-4 h-4 text-[#C99A4A]" />
                  <span>Durée : Demi-journée (Matinée)</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <Users className="w-4 h-4 text-[#C99A4A]" />
                  <span>Petits groupes ou privatisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parcours Visuel en 4 étapes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A85D3A] font-bold">
              Le parcours culinaire
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
              Du marché traditionnel à la dégustation
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Une progression vivante et pédagogique pour s’imprégner de la culture culinaire sénégalaise.
            </p>
          </div>

          {/* Timeline / Visual Pathway */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[28px] p-7 border border-[#C7A77A]/30 shadow-sm flex flex-col justify-between space-y-5 relative group hover:shadow-lg hover:border-[#173C32]/40 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] flex items-center justify-center group-hover:bg-[#173C32] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-serif font-bold text-[#C7A77A]/60">
                        {s.step}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A] block">
                        {s.title}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#173C32] mt-0.5 leading-snug">
                        {s.subtitle}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 space-y-1.5">
                    {s.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                        <span className="text-[#C99A4A] font-bold">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mettre en valeur : Spécialités locales et produits du terroir */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#C7A77A]/30 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>Saveurs & Patrimoine Culinaire</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
                  L’art du Thiéboudienne et des délices sénégalais
                </h2>

                <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                  Inscrit au Patrimoine Immatériel de l’UNESCO, le <strong>Thiéboudienne</strong> (riz au poisson mijoté avec légumes du terroir et sauce tomate épicée) est l’emblème national de la cuisine sénégalaise.
                </p>

                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  Selon les saisons et les envies de l’atelier, d’autres recettes emblématiques peuvent être explorées (comme le Yassa au citron et oignons caramélisés, le Mafé onctueux à la pâte d’arachide ou les savoureux pastels au poisson), toujours élaborées à partir de produits frais locaux.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Légumes frais des Niayes</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Poissons nobles pêchés du jour</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Jus de bissap & bouye maison</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Ambiance familiale authentique</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-52 sm:h-64 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                    alt="Ingrédients et marché"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-52 sm:h-64 shadow-md mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
                    alt="Plat sénégalais"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="bg-gradient-to-br from-[#173C32] to-[#122e26] text-white rounded-[32px] p-8 sm:p-12 shadow-xl space-y-6">
            <HeartHandshake className="w-12 h-12 text-[#C99A4A] mx-auto opacity-80" />
            <h3 className="text-2xl sm:text-3xl font-serif">
              Envie de vivre cette immersion gourmande ?
            </h3>
            <p className="text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Nous adaptons chaque atelier cuisine selon vos dates, le nombre de convives et vos préférences alimentaires.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/reservation?experienceType=Cooking%20Class%20Teranga"
                className="btn-gold py-3.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Construire une expérience sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Demande%20atelier%20Cooking%20Class"
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
export default CookingClass;
