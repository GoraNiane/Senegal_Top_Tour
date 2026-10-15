import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Target,
  ShieldCheck,
  Compass,
  Users,
} from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';

export const SolidarityImpactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objectifs' | 'methode'>('objectifs');

  const objectifsList = [
    {
      badge: 'Immersion & Flexibilité',
      title: 'Hébergement en campements villageois (communautaires ou privés)',
      desc: 'Héberger les touristes dans des campements villageois communautaires ou privés pour faciliter l\'immersion dans le monde rural (ce que le tourisme balnéaire ne permet pas). Séjour flexible : pour 10 jours, par exemple 2 à 3 nuitées en campement villageois et le reste en hôtel classique.',
      icon: Compass,
    },
    {
      badge: 'Coopération Décentralisée',
      title: 'Échanges durables & Projets de coopération',
      desc: 'La rencontre entre touristes et villageois comme point de départ pour des échanges durables et d\'éventuels projets de coopération. Nous privilégions la Coopération décentralisée, plus apte à agir dans des délais relativement courts.',
      icon: Users,
    },
    {
      badge: 'Transition & Écoconstruction',
      title: 'Appui aux initiatives locales, Banco & BTS',
      desc: 'Appuyer des initiatives visant à soutenir l’éducation, l’accès à l’eau potable, la gestion des déchets, la promotion des énergies renouvelables et des matériaux alternatifs (banco et briques en terre stabilisée - BTS) pour booster l\'écoconstruction.',
      icon: Sparkles,
    },
  ];

  const methodeList = [
    {
      badge: 'Règle #1',
      title: 'Pas de projets parachutés !',
      desc: 'Les projets retenus sont sélectionnés et gérés en concertation avec les responsables des villages d\'accueil.',
    },
    {
      badge: 'Règle #2',
      title: 'Aucune obligation de résultat !',
      desc: 'En d\'autres termes, ce n\'est pas parce qu\'un projet est validé que son financement et son exécution sont d\'avance garantis.',
    },
    {
      badge: 'Règle #3',
      title: 'Participation active du village',
      desc: 'Participation du village d\'accueil dans le financement de ses projets (même symbolique), l\'essentiel étant de ne pas susciter ou entretenir une mentalité d\'éternels assistés.',
    },
    {
      badge: 'Règle #4',
      title: 'Visibilité & Échanges durables',
      desc: 'Donner une plus grande visibilité aux villages d\'accueil et favoriser des collaborations durables sur des projets de développement et des échanges culturels.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#173C32] text-white border-b border-white/10 text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C99A4A]/10 blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column : Editorial Pitch (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 text-[#C99A4A]" />}>
              ☆▪︎☆ APPUI AU DÉVELOPPEMENT ☆▪︎☆
            </Badge>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Appui au Développement & Solidarité
            </h2>

            <p className="text-base sm:text-lg text-[#C7A77A] font-serif italic leading-relaxed">
              « Le volet Appui au développement de Sénégal Top Tour est fondé sur la solidarité avec les populations d'accueil. »
            </p>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              En rupture avec le tourisme balnéaire fermé, nous construisons des passerelles directes avec le monde rural : immersion en campements villageois, coopération décentralisée agile et essor de l'écoconstruction en matériaux locaux (banco et BTS).
            </p>

            {/* Switch Tabs Toggle */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('objectifs')}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'objectifs'
                    ? 'bg-[#C99A4A] text-[#151515] shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Objectifs STT</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('methode')}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'methode'
                    ? 'bg-[#C99A4A] text-[#151515] shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Notre Méthode</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/tourisme-solidaire#appui-au-developpement"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C99A4A] to-[#C7A77A] text-[#151515] hover:brightness-105 transition-all shadow-lg"
              >
                <span>Découvrir la charte complète</span>
                <ArrowRight className="w-4 h-4 text-[#151515]" />
              </Link>
            </div>
          </div>

          {/* Right Column : Interactive Content Cards (7 Cols) */}
          <div className="lg:col-span-7">
            {activeTab === 'objectifs' ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/15 text-xs text-white/70">
                  <span className="uppercase tracking-widest text-[#C99A4A] font-bold">
                    3 Objectifs Fondateurs
                  </span>
                  <span>Impact terrain vérifié</span>
                </div>

                {objectifsList.map((obj, idx) => {
                  const Icon = obj.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/15 transition-all duration-300 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30">
                          {obj.badge}
                        </span>
                        <Icon className="w-4 h-4 text-[#C99A4A]" />
                      </div>

                      <h3 className="font-serif text-lg font-bold text-white">
                        {obj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        {obj.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                <div className="sm:col-span-2 flex items-center justify-between pb-2 border-b border-white/15 text-xs text-white/70">
                  <span className="uppercase tracking-widest text-[#C99A4A] font-bold">
                    4 Principes de notre méthode de travail
                  </span>
                  <span>Co-responsabilité & Dignité</span>
                </div>

                {methodeList.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/15 transition-all duration-300 space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C99A4A]">
                          {m.badge}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#C99A4A]" />
                      </div>

                      <h3 className="font-serif text-base font-bold text-white">
                        {m.title}
                      </h3>

                      <p className="text-xs text-white/75 font-light leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
};

