import React from 'react';
import { Compass, Sparkles, MapPin, Clock } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Badge } from '../../components/ui/Badge';
import { upcomingDestinations } from '../../data/homepageData';

export const UpcomingDestinationsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F7F4EE] text-[#151515] border-b border-[#C7A77A]/20 text-left">
      <Container size="xl">
        <SectionTitle
          badge="EXPANSION GÉOGRAPHIQUE"
          title="Bientôt dans nos itinéraires"
          subtitle="De nouvelles contrées sauvages et historiques sont actuellement en préparation avec nos éclaireurs locaux."
          align="left"
          className="mb-12 max-w-2xl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingDestinations.map((dest, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] overflow-hidden border border-[#C7A77A]/30 shadow-xs flex flex-col justify-between group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter grayscale-[25%] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C99A4A] text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C99A4A]" />
                    {dest.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1 text-white text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A77A]" />
                  <span>{dest.name}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {dest.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
