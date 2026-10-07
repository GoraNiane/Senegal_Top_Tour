import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Compass,
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
