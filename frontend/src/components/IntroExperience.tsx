import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../context/LanguageContext';

export interface IntroExperienceProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

const STORAGE_KEY = 'senegal-top-tour-intro-seen';

const ITINERARY_STEPS = [
  { name: 'DAKAR', region: 'Capitale & Corniche' },
  { name: 'GORÉE', region: 'Île de Mémoire' },
  { name: 'KAYAR', region: 'Grande Pêche' },
  { name: 'LAC ROSE', region: 'Dunes & Eaux Salées' },
  { name: 'SAINT-LOUIS', region: 'Fleuve & Calèche' },
  { name: 'SALOUM', region: 'Mangroves & Iles' },
];

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete, forcePlay = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const { t, language } = useLanguage();

  // Phase tracker: 1 (Emblem) -> 2 (Brand) -> 3 (Itinerary) -> 4 (Statement) -> 5 (Exit to Hero)
  const [phase, setPhase] = useState<number>(1);
  const [activeItineraryIndex, setActiveItineraryIndex] = useState<number>(0);

  const handleSkip = () => {
    setPhase(5);
    document.body.style.overflow = '';
    if (onComplete) onComplete();
  };

  // Preload hero background image immediately
  useEffect(() => {
    const heroImage = new Image();
    heroImage.src = '/hero.png';
  }, []);

  // Sequence orchestration
  useEffect(() => {
    // Lock body scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Reduced motion shortcut
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Sequence timing
    // Phase 1 -> 2 at 650ms
    const t1 = setTimeout(() => setPhase(2), 650);
    // Phase 2 -> 3 at 1450ms
    const t2 = setTimeout(() => setPhase(3), 1450);
    // Phase 3 -> 4 at 2500ms
    const t3 = setTimeout(() => setPhase(4), 2500);
    // Phase 4 -> 5 (Exit to Hero) at 3400ms
    const t4 = setTimeout(() => {
      setPhase(5);
      setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        if (onComplete) onComplete();
      }, 600);
    }, 3400);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [prefersReducedMotion, onComplete]);

  // Itinerary step cycler in Phase 3
  useEffect(() => {
    if (phase !== 3) return;
    const interval = setInterval(() => {
      setActiveItineraryIndex((prev) => (prev + 1) % ITINERARY_STEPS.length);
    }, 180);
    return () => clearInterval(interval);
  }, [phase]);

  // Statement text based on current language
  const statement = useMemo(() => {
    if (language === 'de') return '« Entdecken Sie den Senegal auf neue Art. »';
    if (language === 'en') return '« Discover Senegal differently. »';
    return '« Découvrez le Sénégal autrement. »';
  }, [language]);

  return (
    <AnimatePresence mode="wait">
      {phase < 5 && (
        <motion.div
          key="cinematic-intro-experience"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999999] bg-[#F7F4EE] flex flex-col items-center justify-center select-none px-6 overflow-hidden"
          style={{ willChange: 'opacity, transform, filter' }}
        >
          {/* Subtle Ambient Solar Glows on Ivory Background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C99A4A]/12 blur-3xl pointer-events-none -top-24 -left-24 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#173C32]/8 blur-3xl pointer-events-none -bottom-24 -right-24" />

          {/* Quick Skip Button */}
          <button
            onClick={handleSkip}
            aria-label="Passer l'introduction"
            className="absolute top-5 right-5 sm:top-7 sm:right-8 z-30 text-[11px] font-semibold text-[#173C32]/75 hover:text-[#173C32] px-4 py-1.5 rounded-full border border-[#C7A77A]/40 hover:border-[#173C32] bg-white/70 hover:bg-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm uppercase tracking-wider"
          >
            {language === 'en' ? 'Skip ✕' : language === 'de' ? 'Überspringen ✕' : 'Passer ✕'}
          </button>

          {/* Central Stage */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg w-full min-h-[360px]">

            {/* ============================================================ */}
            {/* PHASE 1: SUBTLE MONOGRAM & SACRED BAOBAB EMBLEM             */}
            {/* ============================================================ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                scale: phase >= 2 ? 0.95 : 1,
                filter: phase >= 1 ? 'blur(0px)' : 'blur(12px)',
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-20 sm:w-24 sm:h-24 mb-6 drop-shadow-[0_6px_20px_rgba(201,154,74,0.25)]"
            >
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                {/* Dôme Solaire Doré */}
                <path
                  d="M50 15 C30 15 14 31 14 52 L86 52 C86 31 70 15 50 15 Z"
                  fill="url(#introSunGrad)"
                />
                {/* Rayons Solaires Subtils */}
                <path d="M50 16 L50 52" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.95" />
                <path d="M36 21 L44 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.95" />
                <path d="M64 21 L56 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.95" />
                <path d="M24 33 L38 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.95" />
                <path d="M76 33 L62 52" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.95" />
                <path d="M17 48 L32 52" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" />
                <path d="M83 48 L68 52" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" />

                {/* Baobab Sacré Central */}
                <path
                  d="M48 52 L48 40 C44 38 42 34 44 30 C46 26 54 26 56 30 C58 34 56 38 52 40 L52 52 Z"
                  fill="#173C32"
                />

                {/* Pirogue Océanique & Courbe Dorée */}
                <path
                  d="M14 56 C28 56 46 62 50 78 C54 62 72 56 86 56 C74 76 58 84 50 84 C42 84 26 76 14 56 Z"
                  fill="url(#introBaseGrad)"
                />
                <path d="M14 56 C32 60 48 66 50 84" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                <path d="M86 56 C68 60 52 66 50 84" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />

                <defs>
                  <linearGradient id="introSunGrad" x1="50" y1="15" x2="50" y2="52" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5D28A" />
                    <stop offset="0.5" stopColor="#E2B167" />
                    <stop offset="1" stopColor="#C99A4A" />
                  </linearGradient>
                  <linearGradient id="introBaseGrad" x1="50" y1="56" x2="50" y2="84" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E2B167" />
                    <stop offset="0.6" stopColor="#C99A4A" />
                    <stop offset="1" stopColor="#8A5A23" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* ============================================================ */}
            {/* PHASE 2: SENEGAL -> TOP TOUR EDITORIAL REVELATION           */}
            {/* ============================================================ */}
            <div className="h-20 flex flex-col items-center justify-center">
              {phase >= 2 && phase < 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.26em] text-[#173C32] leading-none">
                    SENEGAL
                  </h2>
                  <motion.span
                    initial={{ opacity: 0, letterSpacing: '0.2em' }}
                    animate={{ opacity: 1, letterSpacing: '0.42em' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-sans text-xs sm:text-sm font-bold uppercase text-[#C99A4A] mt-2 block"
                  >
                    TOP TOUR
                  </motion.span>
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* PHASE 3: ITINERARY WAYPOINT REVEAL                          */}
              {/* ============================================================ */}
              {phase === 3 && (
                <motion.div
                  key="phase-3-itinerary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#A85D3A]">
                    ITINÉRAIRE EN COURS
                  </span>

                  <div className="flex items-center gap-2">
                    <motion.div
                      key={ITINERARY_STEPS[activeItineraryIndex].name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173C32] tracking-wider">
                        {ITINERARY_STEPS[activeItineraryIndex].name}
                      </h3>
                      <span className="text-xs text-[#C99A4A] font-serif italic">
                        · {ITINERARY_STEPS[activeItineraryIndex].region}
                      </span>
                    </motion.div>
                  </div>

                  {/* Waypoint dots */}
                  <div className="flex items-center gap-2 pt-2">
                    {ITINERARY_STEPS.map((step, idx) => (
                      <div
                        key={step.name}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeItineraryIndex
                            ? 'w-6 bg-[#C99A4A]'
                            : 'w-1.5 bg-[#173C32]/20'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ============================================================ */}
              {/* PHASE 4: FINAL STATEMENT & REVEAL TO HERO                   */}
              {/* ============================================================ */}
              {phase === 4 && (
                <motion.div
                  key="phase-4-statement"
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2"
                >
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-[#173C32] font-semibold tracking-wide">
                    {statement}
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#C99A4A] font-bold block pt-1">
                    BIENVENUE AU SÉNÉGAL
                  </span>
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
