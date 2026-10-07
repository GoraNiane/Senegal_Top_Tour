import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Info,
  Calendar,
  Users,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Compass,
  PhoneCall,
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ExcursionCard } from '../components/ExcursionCard';
import {
  getExcursionBySlug,
  getSimilarExcursions,
  DetailedExcursion,
} from '../data/excursionsData';

export const ExcursionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [excursion, setExcursion] = useState<DetailedExcursion | null>(null);
  const [similarTours, setSimilarTours] = useState<DetailedExcursion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const found = getExcursionBySlug(slug);
    if (found) {
      setExcursion(found);
      setSimilarTours(getSimilarExcursions(found.slug, 3));

      // Update SEO Head Tags
      document.title = found.seoTitle || `${found.name} | Senegal Top Tour`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', found.seoDescription || found.description);
      }

      // Inject JSON-LD Schema.org Structured Data
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: found.name,
        description: found.description,
        touristType: found.category,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: '0',
          priceSpecification: {
            '@type': 'PriceSpecification',
            description: found.priceNote || 'Prix sur demande',
          },
          availability: 'https://schema.org/InStock',
        },
        itinerary: {
          '@type': 'ItemList',
          itemListElement: found.itinerary.map((step, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: step.title,
            description: step.description,
          })),
        },
        image: found.images.map((img) => img.url),
        provider: {
          '@type': 'TravelAgency',
          name: 'Senegal Top Tour',
          url: 'https://senegaltoptour.sn',
          telephone: '+221 77 000 00 00',
        },
      };

      const existingScript = document.getElementById('jsonld-excursion');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(structuredData);
      } else {
        const script = document.createElement('script');
        script.id = 'jsonld-excursion';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    } else {
      setExcursion(null);
    }

    setLoading(false);
    window.scrollTo(0, 0);

    return () => {
      const script = document.getElementById('jsonld-excursion');
      if (script) script.remove();
    };
  }, [slug]);

  // Lightbox handlers with keyboard controls
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextImage = useCallback(() => {
    if (!excursion || lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % excursion.images.length : 0));
  }, [excursion, lightboxIndex]);

  const handlePrevImage = useCallback(() => {
    if (!excursion || lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + excursion.images.length) % excursion.images.length : 0
    );
  }, [excursion, lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNextImage, handlePrevImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#173C32]">
          <div className="w-10 h-10 border-3 border-[#C99A4A] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest font-serif">Chargement de l’excursion...</span>
        </div>
      </div>
    );
  }

  if (!excursion) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex flex-col items-center justify-center px-4">
        <Compass className="w-16 h-16 text-[#C7A77A] mb-4 opacity-50" />
        <h2 className="text-3xl font-serif text-[#173C32] mb-3">Excursion introuvable</h2>
        <p className="text-sm text-neutral-600 mb-6 text-center max-w-md">
          Cette excursion n’existe pas ou a été déplacée. Découvrez nos circuits au départ de Dakar.
        </p>
        <Link to="/excursions" className="btn-primary text-xs">
          Retour au catalogue des excursions
        </Link>
      </div>
    );
  }

  const coverImage =
    excursion.images?.find((img) => img.isCover)?.url ||
    excursion.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=85';

  // WhatsApp pre-filled concierge message
  const whatsappMessage = `Bonjour SENEGAL TOP TOUR,\n\nJe souhaite réserver ou obtenir des informations concernant l'excursion :\n✨ *${excursion.name}*\n\n📅 Date souhaitée :\n👥 Nombre de personnes :\n🏨 Lieu de prise en charge (Hôtel / Dakar) :\n\nMerci d'avance pour votre retour personnalisé.`;
  const whatsappUrl = `https://wa.me/221770000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <PageTransition>
      <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pb-28 sm:pb-32">
        {/* ==================================================
            1. HERO SECTION
           ================================================== */}
        <section className="relative min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-end justify-start bg-[#151515] text-white">
          <img
            src={coverImage}
            alt={excursion.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
          />
          {/* Subtle multi-stop gradient for premium legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/45 to-black/25" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 w-full">
            {/* Breadcrumbs & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">
                Accueil
              </Link>
              <span className="text-white/40">/</span>
              <Link to="/excursions" className="text-[#C7A77A] hover:text-white transition-colors">
                Excursions
              </Link>
              <span className="text-white/40">/</span>
              <span className="px-3 py-1 rounded-full bg-[#173C32] text-white uppercase tracking-wider text-[10.5px] font-semibold border border-white/10 shadow-sm">
                {excursion.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-[10.5px] font-medium border border-white/10">
                {excursion.duration}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white max-w-4xl leading-tight font-normal">
              {excursion.name}
            </h1>

            {/* Subtitle */}
            {excursion.subtitle && (
              <p className="mt-3 text-base sm:text-lg text-white/85 font-light max-w-3xl leading-relaxed">
                {excursion.subtitle}
              </p>
            )}

            {/* Quick Metadata Pill Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/95">
              {/* Horaires */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Calendar className="w-4 h-4 text-[#C99A4A]" />
                <span><strong>Horaires :</strong> {excursion.schedule}</span>
              </div>

              {/* Lieu de départ */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-4 h-4 text-[#C99A4A]" />
                <span><strong>Départ :</strong> {excursion.departureCity}</span>
              </div>

              {/* Durée */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Clock className="w-4 h-4 text-[#C99A4A]" />
                <span><strong>Durée :</strong> {excursion.duration}</span>
              </div>

              {/* Groupe */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Users className="w-4 h-4 text-[#C99A4A]" />
                <span>Privatisé ({excursion.minGroupSize} à {excursion.maxGroupSize} pers.)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            MAIN CONTENT LAYOUT (8 cols + 4 cols)
           ================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* LEFT MAIN COLUMN (8 COLS) */}
            <div className="lg:col-span-8 space-y-12">
              {/* 2. PRÉSENTATION */}
              <section className="bg-white rounded-[28px] p-7 sm:p-10 border border-[#C7A77A]/25 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold">
                  <Sparkles className="w-4 h-4 text-[#C99A4A]" />
                  <span>Présentation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                  L’expérience en détails
                </h2>
                <div className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed whitespace-pre-line space-y-4">
                  {excursion.fullContent || excursion.description}
                </div>
              </section>

              {/* 3. PROGRAMME DÉTAILLÉ (VERTICAL TIMELINE) */}
              {excursion.itinerary && excursion.itinerary.length > 0 && (
                <section className="bg-white rounded-[28px] p-7 sm:p-10 border border-[#C7A77A]/25 shadow-sm">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold mb-2">
                    <Clock className="w-4 h-4 text-[#C99A4A]" />
                    <span>Déroulement</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32] mb-8">
                    Programme étape par étape
                  </h3>

                  {/* Vertical Timeline */}
                  <div className="relative border-l-2 border-[#C99A4A]/40 ml-3 sm:ml-5 pl-6 sm:pl-8 space-y-8">
                    {excursion.itinerary.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Glowing Timeline Marker */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-[#173C32] border-2 border-[#C99A4A] flex items-center justify-center shadow-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C99A4A]" />
                        </div>

                        {/* Step Content */}
                        <div className="space-y-1.5">
                          {step.time && (
                            <span className="inline-block px-3 py-0.5 rounded-full bg-[#173C32]/10 text-[#173C32] text-xs font-bold font-mono tracking-wider">
                              {step.time}
                            </span>
                          )}
                          <h4 className="text-lg font-serif font-bold text-[#173C32]">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. CE QUI EST INCLUS / NON INCLUS */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-emerald-900/15 shadow-sm space-y-4">
                  <h4 className="text-lg font-serif font-bold text-[#173C32] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Ce qui est inclus</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                    {excursion.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-rose-900/15 shadow-sm space-y-4">
                  <h4 className="text-lg font-serif font-bold text-[#173C32] flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <span>Ce qui n'est pas inclus</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                    {excursion.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-rose-500 font-bold mt-0.5">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 5. INFORMATIONS PRATIQUES */}
              {excursion.practicalInfo && Object.keys(excursion.practicalInfo).length > 0 && (
                <section className="bg-white rounded-[28px] p-7 sm:p-10 border border-[#C7A77A]/25 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold">
                    <Info className="w-4 h-4 text-[#C99A4A]" />
                    <span>Conseils de voyage</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                    Informations pratiques
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {Object.entries(excursion.practicalInfo).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-4 sm:p-5 rounded-2xl bg-[#F7F4EE] border border-[#C7A77A]/20 space-y-1"
                      >
                        <span className="text-[11px] uppercase font-bold text-[#A85D3A] tracking-wider block">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. GALERIE PHOTOS AVEC LIGHTBOX */}
              {excursion.images && excursion.images.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold block mb-1">
                        Immersion visuelle
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                        Galerie de l'excursion
                      </h3>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">
                      Cliquez pour agrandir ({excursion.images.length} photos)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {excursion.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => handleOpenLightbox(i)}
                        className="relative rounded-[20px] overflow-hidden h-60 sm:h-64 group shadow-sm border border-[#C7A77A]/20 cursor-pointer"
                      >
                        <img
                          src={img.url}
                          alt={img.caption || excursion.name}
                          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-100 transition-opacity" />

                        {/* Expand Icon */}
                        <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-4 h-4" />
                        </div>

                        {/* Caption */}
                        {img.caption && (
                          <div className="absolute bottom-0 inset-x-0 p-3.5 bg-black/60 backdrop-blur-md text-white text-xs font-light">
                            {img.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT STICKY BOOKING CARD (4 COLS) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-[30px] p-6 sm:p-8 border border-[#C7A77A]/35 shadow-xl space-y-6">
                {/* Pricing Block */}
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold block mb-1">
                    Tarif Officiel
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif text-[#173C32] font-bold">
                    {excursion.priceNote || 'Prix sur demande'}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Tarif garanti sans frais cachés. Ajusté selon la taille du groupe et vos préférences.
                  </p>
                </div>

                {/* Key Summary Badges */}
                <div className="py-4 border-y border-neutral-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/15">
                    <span className="text-neutral-500 text-[10.5px] uppercase block font-medium">Durée</span>
                    <span className="font-semibold text-[#173C32]">{excursion.duration}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F7F4EE] border border-[#C7A77A]/15">
                    <span className="text-neutral-500 text-[10.5px] uppercase block font-medium">Format</span>
                    <span className="font-semibold text-[#173C32]">Privatisé</span>
                  </div>
                </div>

                {/* 3 RESERVATION & CONTACT CTAS */}
                <div className="space-y-3">
                  {/* CTA 1: Réserver cette excursion */}
                  <Link
                    to={`/reservation?excursion=${encodeURIComponent(excursion.name)}`}
                    className="w-full btn-primary py-3.5 px-4 text-xs uppercase tracking-wider font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    <span>Réserver cette excursion</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* CTA 2: Demander des informations */}
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Demande d'informations : ${excursion.name}`)}`}
                    className="w-full py-3.5 px-4 rounded-full border border-[#173C32] text-[#173C32] hover:bg-[#173C32]/5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#A85D3A]" />
                    <span>Demander des informations</span>
                  </Link>

                  {/* CTA 3: Réserver via WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Réserver via WhatsApp</span>
                  </a>
                </div>

                {/* Teranga & Quality Guarantees */}
                <div className="pt-6 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#173C32] flex-shrink-0" />
                    <span>Guides officiels assermentés</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#173C32] flex-shrink-0" />
                    <span>Prise en charge personnalisée hôtel / résidence</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#173C32] flex-shrink-0" />
                    <span>Véhicules climatisés & grand confort</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            7. EXCURSIONS SIMILAIRES
           ================================================== */}
        {similarTours && similarTours.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 border-t border-[#C7A77A]/25 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A85D3A] font-bold block mb-1">
                  Découvrir aussi
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#173C32]">
                  Excursions similaires
                </h3>
              </div>
              <Link
                to="/excursions"
                className="text-xs font-semibold text-[#173C32] hover:text-[#A85D3A] flex items-center gap-1"
              >
                <span>Voir tout le catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarTours.map((sim) => (
                <ExcursionCard key={sim.id} excursion={sim} />
              ))}
            </div>
          </div>
        )}

        {/* ==================================================
            8. MOBILE STICKY BOTTOM BAR (CONVERSION BAR)
           ================================================== */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#C7A77A]/30 p-3.5 z-40 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase text-neutral-500 font-semibold block truncate">
              {excursion.name}
            </span>
            <span className="text-xs font-serif font-bold text-[#173C32] truncate block">
              {excursion.priceNote || 'Prix sur demande'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Concierge"
              className="p-2.5 rounded-full bg-[#25D366] text-white shadow flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            <Link
              to={`/reservation?excursion=${encodeURIComponent(excursion.name)}`}
              className="btn-primary py-2.5 px-4 text-xs font-bold rounded-full shadow-md whitespace-nowrap"
            >
              Réserver
            </Link>
          </div>
        </div>

        {/* ==================================================
            9. LIGHTBOX MODAL
           ================================================== */}
        {lightboxIndex !== null && excursion.images[lightboxIndex] && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 select-none animate-in fade-in duration-200"
          >
            {/* Top Bar with Counter & Close Button */}
            <div className="w-full max-w-6xl flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="font-mono text-white/80">
                Photo {lightboxIndex + 1} sur {excursion.images.length}
              </span>
              <button
                onClick={handleCloseLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="Fermer la galerie"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Image with Prev / Next Buttons */}
            <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <img
                src={excursion.images[lightboxIndex].url}
                alt={excursion.images[lightboxIndex].caption || excursion.name}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
              />

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="w-full max-w-3xl text-center text-white/90 text-xs sm:text-sm font-light pb-2">
              {excursion.images[lightboxIndex].caption || excursion.name}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
export default ExcursionDetail;
