import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, ZoomIn } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { homepageGalleryPreview } from '../../data/homepageData';

export const GalleryPreviewSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-[#151515] border-b border-[#C7A77A]/20 text-left">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            badge="CARNETS PHOTOGRAPHIQUES"
            title="Lumières & Couleurs du Sénégal"
            subtitle="Instantanés de vie, paysages marins et éclats de culture saisis sur le vif par nos voyageurs et guides."
            align="left"
            className="max-w-2xl"
          />

          <Link
            to="/galerie"
            className="inline-flex items-center gap-2 text-xs font-semibold px-6 py-3 rounded-full bg-[#173C32] hover:bg-[#1f4f42] text-white transition-all shadow-md w-fit"
          >
            <Camera className="w-3.5 h-3.5 text-[#C99A4A]" />
            <span>Voir toute la galerie</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Photo Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {homepageGalleryPreview.map((item, idx) => (
            <Link
              key={item.id}
              to="/galerie"
              className={`group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${
                idx === 0 || idx === 3 ? 'h-64 sm:h-72 lg:col-span-2' : 'h-64 sm:h-72 lg:col-span-1'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white" />

              <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[#C99A4A] text-[9.5px] uppercase font-bold tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-white">
                <p className="font-serif text-xs sm:text-sm font-bold truncate">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
