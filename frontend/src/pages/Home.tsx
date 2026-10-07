import React from 'react';
import { PageTransition } from '../components/PageTransition';

// Core Sections for Module 3/8 Homepage
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { IntroEditorialSection } from '../sections/home/IntroEditorialSection';
import { ExploreDakarSection } from '../sections/home/ExploreDakarSection';
import { GoreeFeatureSection } from '../sections/home/GoreeFeatureSection';
import { JoalFadiouthSection } from '../sections/home/JoalFadiouthSection';
import { InteractivePlannerSection } from '../sections/home/InteractivePlannerSection';
import { ThemedTripsTeaserSection } from '../sections/home/ThemedTripsTeaserSection';
import { SolidarityImpactSection } from '../sections/home/SolidarityImpactSection';
import { UpcomingDestinationsSection } from '../sections/home/UpcomingDestinationsSection';
import { GalleryPreviewSection } from '../sections/home/GalleryPreviewSection';
import { FinalCtaSection } from '../sections/home/FinalCtaSection';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="w-full bg-[#F7F4EE] text-[#151515] overflow-x-hidden">
        {/* 1. HERO SECTION (~100vh, Océan/Gorée, Slogan, Dual CTAs, Scroll Indicator) */}
        <Hero />

        {/* 2. REASSURANCE & TRUST STRIP */}
        <TrustBar />

        {/* 3. SECTION INTRO ÉDITORIALE (« Plus qu'un voyage, une rencontre avec le Sénégal. ») */}
        <IntroEditorialSection />

        {/* 4. EXPLOREZ DEPUIS DAKAR (Dakar, Gorée, Kayar, Lac Rose, Noflaye) */}
        <ExploreDakarSection />

        {/* 5. ÎLE DE GORÉE — GRANDE SECTION IMMERSIVE */}
        <GoreeFeatureSection />

        {/* 6. JOAL-FADIOUTH (« Une journée pour s'évader. ») */}
        <JoalFadiouthSection />

        {/* 7. PLANIFICATEUR INTERACTIF (« Quel Sénégal voulez-vous découvrir ? ») */}
        <InteractivePlannerSection />

        {/* 8. VOYAGES À THÈMES TEASER (« Voyager autour d'une idée. ») */}
        <ThemedTripsTeaserSection />

        {/* 9. TOURISME SOLIDAIRE IMMERSIF (« Voyager avec un impact. ») */}
        <SolidarityImpactSection />

        {/* 10. DESTINATIONS À VENIR (« Bientôt dans nos itinéraires ») */}
        <UpcomingDestinationsSection />

        {/* 11. PREVIEW DE LA GALERIE */}
        <GalleryPreviewSection />

        {/* 12. CTA FINAL MAJEUR (« Votre prochaine aventure commence ici. ») */}
        <FinalCtaSection />
      </div>
    </PageTransition>
  );
};

export default Home;
