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

import { ScrollReveal } from '../components/ui/ScrollReveal';

export const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="w-full bg-[#F7F4EE] text-[#151515] overflow-x-hidden">
        {/* 1. HERO SECTION (~100vh, Océan/Gorée, Slogan, Dual CTAs, Scroll Indicator) */}
        <Hero />

        {/* 2. REASSURANCE & TRUST STRIP (Instantly available right below hero) */}
        <TrustBar />

        {/* 3. SECTION INTRO ÉDITORIALE (« Plus qu'un voyage, une rencontre avec le Sénégal. ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <IntroEditorialSection />
        </ScrollReveal>

        {/* 4. EXPLOREZ DEPUIS DAKAR (Dakar, Gorée, Kayar, Lac Rose, Noflaye) */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <ExploreDakarSection />
        </ScrollReveal>

        {/* 5. ÎLE DE GORÉE — GRANDE SECTION IMMERSIVE */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <GoreeFeatureSection />
        </ScrollReveal>

        {/* 6. JOAL-FADIOUTH (« Une journée pour s'évader. ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <JoalFadiouthSection />
        </ScrollReveal>

        {/* 7. PLANIFICATEUR INTERACTIF (« Quel Sénégal voulez-vous découvrir ? ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <InteractivePlannerSection />
        </ScrollReveal>

        {/* 8. VOYAGES À THÈMES TEASER (« Voyager autour d'une idée. ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <ThemedTripsTeaserSection />
        </ScrollReveal>

        {/* 9. TOURISME SOLIDAIRE IMMERSIF (« Voyager avec un impact. ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <SolidarityImpactSection />
        </ScrollReveal>

        {/* 10. DESTINATIONS À VENIR (« Bientôt dans nos itinéraires ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <UpcomingDestinationsSection />
        </ScrollReveal>

        {/* 11. PREVIEW DE LA GALERIE */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <GalleryPreviewSection />
        </ScrollReveal>

        {/* 12. CTA FINAL MAJEUR (« Votre prochaine aventure commence ici. ») */}
        <ScrollReveal animation="fade-up" duration={0.4}>
          <FinalCtaSection />
        </ScrollReveal>
      </div>
    </PageTransition>
  );
};

export default Home;
