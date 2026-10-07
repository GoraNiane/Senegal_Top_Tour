import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MapPin,
} from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { PageTransition } from '../components/PageTransition';
import { api } from '../services/api';
import { GalleryImage } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCatKey, setSelectedCatKey] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', fr: 'Toutes', en: 'All', de: 'Alle', apiFilter: 'Toutes' },
    { key: 'dakar', fr: 'Dakar', en: 'Dakar', de: 'Dakar', apiFilter: 'Dakar' },
    { key: 'goree', fr: 'Gorée', en: 'Gorée', de: 'Gorée', apiFilter: 'Gorée' },
    { key: 'lac-rose', fr: 'Lac Rose', en: 'Pink Lake', de: 'Lac Rose', apiFilter: 'Lac Rose' },
    { key: 'nature', fr: 'Nature', en: 'Nature', de: 'Natur', apiFilter: 'Nature' },
    { key: 'culture', fr: 'Culture', en: 'Culture', de: 'Kultur', apiFilter: 'Culture' },
    { key: 'gastronomy', fr: 'Gastronomie', en: 'Gastronomy', de: 'Gastronomie', apiFilter: 'Gastronomie' },
    { key: 'villages', fr: 'Villages', en: 'Villages', de: 'Dörfer', apiFilter: 'Villages' },
    { key: 'solidarity', fr: 'Tourisme solidaire', en: 'Solidarity', de: 'Solidartourismus', apiFilter: 'Tourisme solidaire' },
  ];

  const currentCategoryObj = categories.find((c) => c.key === selectedCatKey) || categories[0];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await api.getGallery(currentCategoryObj.apiFilter);
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCatKey]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % images.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
  };

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-24">
        {/* Top Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <SectionTitle
            badge={t.galleryPage.badge}
            title={t.galleryPage.title}
            subtitle={t.galleryPage.subtitle}
            align="center"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {categories.map((cat) => {
              const label = language === 'de' ? cat.de : language === 'en' ? cat.en : cat.fr;
              const isSelected = selectedCatKey === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCatKey(cat.key)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#173C32] text-white font-semibold shadow-md scale-105'
                      : 'bg-white text-neutral-700 hover:bg-[#C7A77A]/20 border border-[#C7A77A]/25'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Responsive Photo Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {images.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                data-cursor="image"
                className="group relative h-72 sm:h-80 rounded-[22px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#151515]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay - slightly visible on mobile so title is readable, enhanced on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C99A4A] text-[10px] uppercase font-bold tracking-wider border border-white/10">
                    {img.category}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 sm:bg-white/20 backdrop-blur-md flex items-center justify-center text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Bottom Title & Location */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300 text-white">
                  <h4 className="font-serif text-base sm:text-lg font-semibold">{img.title}</h4>
                  {img.location && (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#C7A77A] mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{img.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Lightbox Modal */}
        {lightboxIndex !== null && images[lightboxIndex] && (
          <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Fermer la vue agrandie"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Image précédente"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Image suivante"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main Modal Image */}
            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center px-6 sm:px-12">
              <img
                src={images[lightboxIndex].imageUrl}
                alt={images[lightboxIndex].title}
                className="max-w-full max-h-[65vh] sm:max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="text-center text-white mt-3 sm:mt-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-serif text-[#C99A4A]">
                  {images[lightboxIndex].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70">
                  {images[lightboxIndex].location} · {images[lightboxIndex].category} ({lightboxIndex + 1} / {images.length})
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
