import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ChefHat, Recycle, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { themedTripsTeaser } from '../../data/homepageData';

export const ThemedTripsTeaserSection: React.FC = () => {
  const iconMap: Record<string, any> = {
    Users,
    ChefHat,
    Recycle,
    Home: HomeIcon,
  };

  return (
    <section className="py-20 md:py-28 bg-[#23201D] text-white border-b border-white/10 text-left">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionTitle
            theme="dark"
            badge="IMMERSIONS THÉMATIQUES"
            title="Voyager autour d'une idée."
            subtitle="Des séjours conçus pour partager des passions, des savoir-faire ancestraux et des échanges confraternels."
            align="left"
            className="max-w-2xl"
          />

          <Link
            to="/voyages-a-themes"
            className="inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-full bg-[#C99A4A] hover:bg-[#b88640] text-[#151515] transition-all shadow-md w-fit"
          >
            <span>Découvrir les voyages à thèmes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Thematic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themedTripsTeaser.map((theme, i) => {
            const Icon = iconMap[theme.icon] || Users;
            return (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 rounded-[24px] p-6 border border-white/15 hover:border-[#C99A4A]/50 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C99A4A]/20 text-[#C99A4A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#C99A4A] transition-colors leading-snug">
                    {theme.title}
                  </h3>

                  <p className="text-xs text-white/75 font-light leading-relaxed">
                    {theme.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <Link
                    to={theme.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C99A4A] hover:underline"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
