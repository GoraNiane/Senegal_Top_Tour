import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Flame,
  Layers,
  Trees,
  Scissors,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';
import { PageTransition } from '../../components/PageTransition';

export const Recyclage: React.FC = () => {
  useEffect(() => {
    document.title = 'Recyclage & Artisanat Créatif — Savoir-Faire Local | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explorez l’ingéniosité des artisans sénégalais dans le recyclage : aluminium, bois de pirogues, peaux et cuir, ferraille et création durable à Dakar.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const materials = [
    {
      title: 'ALUMINIUM',
      subtitle: 'Fonderie artisanale & marmites mythiques',
      icon: Flame,
      description:
        'Observation des ateliers de fonderie traditionnelle où l’aluminium de récupération (canettes, pièces mécaniques, chutes métalliques) est fondu au creuset incandescent et coulé dans des moules de sable pour façonner les fameuses marmites rondes indispensables aux cuisines sénégalaises.',
      highlights: [
        'Moulage au sable fin et gestes millimétrés',
        'Valorisation à 100% des métaux réutilisés',
        'Pièces culinaires durables sur plusieurs générations',
      ],
    },
    {
      title: 'BOIS',
      subtitle: 'Seconde vie des pirogues & chutes nobles',
      icon: Trees,
      description:
        'Rencontre avec les ébénistes et sculpteurs qui redonnent vie aux bois de pirogues anciennes usées par les vagues de l’Atlantique. Les textures patinées et les peintures multicolores d’origine sont sublimées en miroirs, meubles de caractère et sculptures contemporaines.',
      highlights: [
        'Récupération de bois durs patinés par la mer',
        'Création de mobilier unique et design',
        'Préservation des forêts et zéro déchet',
      ],
    },
    {
      title: 'PEAUX & CUIR',
      subtitle: 'Tannage végétal & maroquinerie d’art',
      icon: Scissors,
      description:
        'Découverte du travail des peaux issues des filières pastorales locales. Grâce à des procédés de tannage végétal à base d’écorces d’acacia ou de fruits d’arbres sauvages, les artisans confectionnent sacs, sandales (babouches), ceintures et reliures traditionnelles.',
      highlights: [
        'Tannage naturel sans produits chimiques nocifs',
        'Maroquinerie cousue main de haute précision',
        'Savoir-faire hérité des maîtres bottiers et selliers',
      ],
    },
    {
      title: 'ARTISANAT & RÉCUPÉRATION',
      subtitle: 'Créativité populaire & upcycling dakarois',
      icon: Layers,
      description:
        'Immersion auprès des inventeurs et designers dakarois qui transforment fûts d’acier, pneus usagés, verre sous toutes ses formes et fils de cuivre en fauteuils contemporains, luminaires poétiques et œuvres d’art exposées dans les biennales internationales.',
      highlights: [
        'Ingéniosité africaine contemporaine',
        'Économie circulaire vivante et solidaire',
        'Possibilité de participer à un atelier de création',
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
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85"
                alt="Recyclage et artisanat au Sénégal"
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
                  Recyclage & Upcycling
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#C99A4A] text-xs font-semibold uppercase tracking-[0.2em] border border-white/10">
                <Recycle className="w-3.5 h-3.5" />
                <span>Économie Circulaire & Savoir-Faire</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                Recyclage & Création Artisanale
              </h1>

              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                À Dakar et dans les régions côtières, rien ne se perd, tout se transforme. Plongez au cœur d’une ingéniosité sans pareille où les matières de récupération deviennent des objets d’art et du mobilier d’exception.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pôles de transformation de matières */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A85D3A] font-bold">
              Les matières nobles de la récupération
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#173C32]">
              L’alchimie du savoir-faire local
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Une démonstration concrète d’économie circulaire où le geste traditionnel s’allie à l’art contemporain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((mat, idx) => {
              const Icon = mat.icon;
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
                        {mat.title}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#173C32] mt-1 leading-snug">
                        {mat.subtitle}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {mat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    {mat.highlights.map((h, i) => (
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
              Rencontrer les artisans du recyclage ?
            </h3>
            <p className="text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Nous organisons des circuits privatifs et des rencontres d'ateliers avec les fondeurs, ébénistes et maroquiniers dakarois.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/reservation?experienceType=Atelier%20Recyclage%20Artisanat"
                className="btn-gold py-3.5 px-6 text-xs uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer w-full sm:w-auto"
              >
                <span>Construire une expérience sur mesure</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?subject=Demande%20circuit%20Recyclage%20et%20Artisanat"
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
export default Recyclage;
