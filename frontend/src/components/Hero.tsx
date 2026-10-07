import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import heroImg from '../assets/hero.png';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 5;
  const { t } = useLanguage();

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[660px] h-[92vh] max-h-[960px] flex items-center justify-start overflow-hidden bg-[#151515] text-white">
      {/* Official hero.png Background Image from Project */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={heroImg || '/hero.png'}
          alt="Île de Gorée — SENEGAL TOP TOUR"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.03] transition-all duration-1000"
        />
      </div>

      {/* Cinematic Soft Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-10" />

      {/* Hero Content positioned exactly like the reference */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 pb-20">
        <div className="max-w-2xl text-left space-y-3.5 sm:space-y-5">
          {/* SÉNÉGAL TOP TOUR Subtitle */}
          <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.28em] text-[#C99A4A] block">
            {t.hero.badge}
          </span>

          {/* Main Title: "Découvrez le Sénégal autrement." / "Discover Senegal differently." */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-serif font-bold text-white leading-[1.12] sm:leading-[1.08] tracking-tight">
            {t.hero.titleLine1}<br />
            {t.hero.titleLine2} <span className="italic font-serif font-normal text-[#C99A4A]">{t.hero.titleItalic}</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-base text-white/90 font-light leading-relaxed max-w-xl pt-0.5 sm:pt-1">
            {t.hero.description}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 sm:pt-3">
            <Link
              to="/excursions"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-[13px] font-semibold px-6 sm:px-7 py-3 rounded-full bg-[#B8864E] hover:bg-[#a77640] text-white shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Découvrir nos excursions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/reservation"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-[13px] font-medium px-6 sm:px-7 py-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/40 hover:border-white transition-all transform hover:-translate-y-0.5"
            >
              <span>Planifier mon voyage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Location Pin, Scroll Guide, and Slider Controls */}
      <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between select-none">
        {/* Bottom Left: Location Badge */}
        <div className="flex items-center gap-2 text-white">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <div className="text-left">
            <span className="text-[11px] sm:text-xs font-bold text-white block leading-tight">
              {t.hero.locationTitle}
            </span>
            <span className="text-[10px] sm:text-[11px] text-white/70 block leading-tight">
              {t.hero.locationSubtitle}
            </span>
          </div>
        </div>

        {/* Center: Scroll pour explorer with vertical line and arrow */}
        <a
          href="#destinations"
          className="hidden md:flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium">
            {t.hero.scrollExplore}
          </span>
          <div className="w-[1px] h-5 bg-white/40 relative">
            <div className="w-full h-2 bg-white animate-pulse" />
          </div>
          <span className="text-xs">↓</span>
        </a>

        {/* Bottom Right: Slider pagination & arrow buttons */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/90">
          <div className="flex items-center gap-1 font-mono tracking-wider text-[10px] sm:text-[11px]">
            <span className="font-bold text-white">{String(currentSlide).padStart(2, '0')}</span>
            <span className="text-white/40">—</span>
            <span className="text-white/60">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 ml-1 sm:ml-2">
            <button
              onClick={handlePrev}
              aria-label="Image précédente"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Image suivante"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
