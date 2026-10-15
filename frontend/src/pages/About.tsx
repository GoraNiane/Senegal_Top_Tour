import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Compass,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-24">
        {/* Top Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <SectionTitle
            badge={t.aboutPage.badge}
            title={t.aboutPage.title}
            subtitle={t.aboutPage.subtitle}
            align="center"
          />
        </div>

        {/* Founder Storytelling Main Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[#C7A77A]/30 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Photo & Caption */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                    alt="Fondateur de Senegal Top Tour"
                    className="w-full h-[520px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C99A4A] font-bold block">
                      {t.aboutPage.founderBadge}
                    </span>
                    <h3 className="text-xl font-serif text-white mt-1">
                      {t.aboutPage.founderTitle}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Storytelling Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>{t.aboutPage.founderGenese}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#173C32] leading-tight">
                  {t.aboutPage.founderQuote}
                </h2>

                <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
                  {t.aboutPage.founderP1}
                </p>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  {t.aboutPage.founderP2}
                </p>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                  {t.aboutPage.founderP3}
                </p>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-xs">
                  <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <span className="font-bold text-[#173C32] block mb-1">{t.aboutPage.pillar1Title}</span>
                    <p className="text-neutral-600">{t.aboutPage.pillar1Desc}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/20">
                    <span className="font-bold text-[#173C32] block mb-1">{t.aboutPage.pillar2Title}</span>
                    <p className="text-neutral-600">{t.aboutPage.pillar2Desc}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/reservation"
                    className="btn-primary text-xs uppercase tracking-wider font-semibold"
                  >
                    {t.aboutPage.organizeCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            Appui au Développement Section (☆▪︎Appui au Développement☆▪︎)
           ================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[#C7A77A]/30 shadow-sm space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-bold uppercase tracking-[0.25em] border border-[#173C32]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A4A]" />
                <span>☆▪︎ Appui au Développement ▪︎☆</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#173C32]">
                Notre Engagement avec les Populations d'Accueil
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
                Le volet <strong>Appui au développement</strong> de STT est fondé sur la solidarité avec les populations d'accueil.
              </p>
            </div>

            {/* Objectifs STT */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#173C32] text-[#C99A4A] flex items-center justify-center font-serif font-bold shadow-md">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#173C32] font-semibold">
                  Voici les objectifs de STT :
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A]">
                      Immersion rurale
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#173C32]">
                      Campements villageois
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                      Inviter les touristes à résider dans des campements villageois communautaires ou privés. Le but est de faciliter l'immersion dans le monde rural. Ce que le tourisme balnéaire ne permet pas.
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#173C32] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                    <span>Immersion dans le monde rural</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A]">
                      Échanges durables
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#173C32]">
                      Coopération décentralisée
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                      La rencontre entre touristes et villageois pourrait être le point de départ pour des échanges durables et d'éventuels projets de coopération entre les villages d'accueil et les touristes. À noter que nous souhaiterions privilégier la <strong>Coopération décentralisée</strong> qui semble plus apte à agir dans des délais relativement courts.
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#173C32] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                    <span>Agilité & délais courts</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#A85D3A]">
                      Projets communautaires
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#173C32]">
                      Écoconstruction, Banco & BTS
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                      Soutenir des initiatives visant à soutenir l’éducation, l’accès à l’eau potable, l’amélioration de la gestion des déchets, la promotion des énergies renouvelables et des techniques et matériaux de construction alternatifs, comme le <strong>banco</strong> et les <strong>briques en terre stabilisée dites aussi BTS</strong>. Ce volet servirait à booster l'écoconstruction.
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#173C32] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                    <span>Booster l'écoconstruction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Méthode de travail */}
            <div className="space-y-6 pt-4 border-t border-[#C7A77A]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C99A4A] text-[#173C32] flex items-center justify-center font-serif font-bold shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#173C32] font-semibold">
                  Notre méthode de travail est indiquée ci-dessous :
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#173C32] bg-[#173C32]/10 px-2.5 py-0.5 rounded-full">
                    Concertation
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#173C32]">
                    Pas de projets parachutés !
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Les projets retenus sont sélectionnés et gérés en concertation avec les responsables des villages d'accueil.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#173C32] bg-[#173C32]/10 px-2.5 py-0.5 rounded-full">
                    Transparence
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#173C32]">
                    Aucune obligation de résultat !
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    En d'autres termes, ce n'est pas parce qu'un projet est validé que son financement et son exécution sont d'avance garantis.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#173C32] bg-[#173C32]/10 px-2.5 py-0.5 rounded-full">
                    Dignité
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#173C32]">
                    Participation du village
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Participation du village d'accueil dans le financement de ses projets. Cette participation pourrait même être symbolique, l'essentiel étant d'éviter d'avoir une mentalité d'éternels assistés.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/25 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#173C32] bg-[#173C32]/10 px-2.5 py-0.5 rounded-full">
                    Visibilité
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#173C32]">
                    Projets & Échanges durables
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Donner une plus grande visibilité aux villages d'accueil et favoriser la réalisation de projets sociaux. D'où la possibilité de favoriser une collaboration susceptible de déboucher sur des projets de développement et des échanges culturels durables.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/tourisme-solidaire#appui-au-developpement"
                className="btn-gold py-3.5 px-7 text-xs uppercase tracking-wider font-bold rounded-full inline-flex items-center gap-2 shadow-lg"
              >
                <span>Découvrir le volet complet sur le Tourisme Solidaire</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* Agency Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-[24px] p-8 border border-[#C7A77A]/25 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#C99A4A]" />
              </div>
              <h4 className="text-xl font-serif text-[#173C32]">{t.aboutPage.val1Title}</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {t.aboutPage.val1Desc}
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-[#C7A77A]/25 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] mx-auto flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#C99A4A]" />
              </div>
              <h4 className="text-xl font-serif text-[#173C32]">{t.aboutPage.val2Title}</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {t.aboutPage.val2Desc}
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-[#C7A77A]/25 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] mx-auto flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-[#C99A4A]" />
              </div>
              <h4 className="text-xl font-serif text-[#173C32]">{t.aboutPage.val3Title}</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {t.aboutPage.val3Desc}
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
