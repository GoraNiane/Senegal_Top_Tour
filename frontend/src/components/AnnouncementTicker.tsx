import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, HeartHandshake, MessageCircle, ShieldCheck, Award, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementTicker: React.FC = () => {
  const { language } = useLanguage();

  const announcements = {
    fr: [
      {
        icon: Sparkles,
        text: 'Saison 2026 : Réservations ouvertes pour vos circuits privatifs & sur-mesure',
        link: '/reservation',
        linkText: 'Planifier →',
      },
      {
        icon: MapPin,
        text: 'Départs quotidiens depuis Dakar & Saly : Gorée, Lac Rose, Joal-Fadiouth, Saint-Louis',
        link: '/excursions',
        linkText: 'Voir les circuits',
      },
      {
        icon: Award,
        text: 'Guides officiels assermentés & Véhicules récents tout confort climatisés',
        link: '/a-propos',
        linkText: 'En savoir plus',
      },
      {
        icon: MessageCircle,
        text: 'Conciergerie WhatsApp 7j/7 : +221 77 884 80 29 (Devis & réponse sous 2h)',
        link: 'https://wa.me/221778848029?text=Bonjour%20Senegal%20Top%20Tour,%20je%20souhaite%20des%20renseignements%20sur%20vos%20excursions',
        linkText: 'Écrire en direct',
        isExternal: true,
      },
      {
        icon: HeartHandshake,
        text: 'Tourisme Solidaire : Chaque voyage soutient directement les écoles et dispensaires locaux',
        link: '/tourisme-solidaire',
        linkText: 'Notre impact',
      },
      {
        icon: Compass,
        text: 'Expériences uniques : Cooking Class Teranga, Écoconstruction & Immersion villageoise',
        link: '/voyages-a-themes',
        linkText: 'Découvrir',
      },
      {
        icon: ShieldCheck,
        text: 'Annulation flexible & Paiement 100% sécurisé',
        link: '/reservation',
        linkText: 'Réserver',
      },
    ],
    en: [
      {
        icon: Sparkles,
        text: '2026 Season: Bookings open for private & customized luxury tours',
        link: '/reservation',
        linkText: 'Plan trip →',
      },
      {
        icon: MapPin,
        text: 'Daily departures from Dakar & Saly: Gorée, Pink Lake, Joal-Fadiouth, Saint-Louis',
        link: '/excursions',
        linkText: 'Explore tours',
      },
      {
        icon: Award,
        text: 'Certified professional guides & Modern air-conditioned private vehicles',
        link: '/a-propos',
        linkText: 'About us',
      },
      {
        icon: MessageCircle,
        text: '24/7 WhatsApp Concierge: +221 77 884 80 29 (Instant quote within 2h)',
        link: 'https://wa.me/221778848029?text=Hello%20Senegal%20Top%20Tour,%20I%20would%20like%20information%20on%20your%20tours',
        linkText: 'Chat now',
        isExternal: true,
      },
      {
        icon: HeartHandshake,
        text: 'Community Tourism: Every journey directly supports local bush schools & clinics',
        link: '/tourisme-solidaire',
        linkText: 'Our impact',
      },
      {
        icon: Compass,
        text: 'Exclusive Immersion: Teranga Cooking Class, Adobe Earth Building & Peer Exchanges',
        link: '/voyages-a-themes',
        linkText: 'Discover',
      },
    ],
    de: [
      {
        icon: Sparkles,
        text: 'Saison 2026: Buchungen geöffnet für private & maßgeschneiderte Touren',
        link: '/reservation',
        linkText: 'Planen →',
      },
      {
        icon: MapPin,
        text: 'Tägliche Abfahrten ab Dakar & Saly: Gorée, Retba-See, Joal-Fadiouth, Saint-Louis',
        link: '/excursions',
        linkText: 'Entdecken',
      },
      {
        icon: MessageCircle,
        text: 'WhatsApp-Concierge 7/7: +221 77 884 80 29 (Angebot innerhalb von 2h)',
        link: 'https://wa.me/221778848029?text=Hallo%20Senegal%20Top%20Tour,%20ich%20mochte%20weitere%20Informationen',
        linkText: 'Direkt kontaktieren',
        isExternal: true,
      },
      {
        icon: HeartHandshake,
        text: 'Solidartourismus: Jede Reise unterstützt direkt Dorfschulen & Buschkrankenhäuser',
        link: '/tourisme-solidaire',
        linkText: 'Mehr erfahren',
      },
      {
        icon: Compass,
        text: 'Authentische Themenreisen: Teranga-Kochkurs, Lehmbau & Handwerker-Begegnungen',
        link: '/voyages-a-themes',
        linkText: 'Entdecken',
      },
    ],
  };

  const currentItems = announcements[language] || announcements.fr;
  // Doubled array for seamless 0% -> -50% continuous loop
  const duplicatedItems = [...currentItems, ...currentItems];

  return (
    <div className="ticker-container relative w-full bg-[#0B1E19] border-b border-[#C99A4A]/20 text-white z-50 overflow-hidden py-1.5 sm:py-2 select-none">
      {/* Subtle edge gradient shadows */}
      <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#0B1E19] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#0B1E19] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex items-center overflow-hidden">
        <div className="animate-marquee">
          {duplicatedItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs text-[#F7F4EE]/90 font-medium px-4 sm:px-6"
              >
                {/* Golden Badge Icon */}
                <div className="w-5 h-5 rounded-full bg-[#C99A4A]/15 border border-[#C99A4A]/35 flex items-center justify-center flex-shrink-0 text-[#C99A4A]">
                  <IconComponent className="w-2.5 h-2.5" />
                </div>

                {/* Text Content */}
                <span className="tracking-wide whitespace-nowrap">{item.text}</span>

                {/* Quick Action Pill */}
                {item.isExternal ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-[10px] font-bold text-[#C99A4A] hover:text-white px-2.5 py-0.5 rounded-full bg-[#C99A4A]/10 hover:bg-[#C99A4A]/30 border border-[#C99A4A]/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {item.linkText}
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className="ml-1 text-[10px] font-bold text-[#C99A4A] hover:text-white px-2.5 py-0.5 rounded-full bg-[#C99A4A]/10 hover:bg-[#C99A4A]/30 border border-[#C99A4A]/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {item.linkText}
                  </Link>
                )}

                {/* Elegant Diamond Separator */}
                <span className="text-[#C99A4A]/40 text-xs ml-3">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

