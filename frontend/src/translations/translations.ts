export type Language = 'fr' | 'en' | 'de';

export interface Translations {
  common: {
    discover: string;
    bookNow: string;
    learnMore: string;
    contactUs: string;
    seeAll: string;
    backToHome: string;
    duration: string;
    day: string;
    days: string;
    halfDay: string;
    fullDay: string;
    priceOnRequest: string;
    loading: string;
    send: string;
    success: string;
    allRightsReserved: string;
    pricing: string;
    details: string;
    mustSee: string;
  };
  nav: {
    home: string;
    excursions: string;
    themes: string;
    solidarity: string;
    about: string;
    gallery: string;
    booking: string;
    contact: string;
    bookStay: string;
    ourMainCircuits: string;
    ourThemes: string;
    ourSolidarity: string;
    seeAllCircuits: string;
    explore: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleItalic: string;
    description: string;
    btnExcursions: string;
    btnExperiences: string;
    locationTitle: string;
    locationSubtitle: string;
    scrollExplore: string;
  };
  intro: {
    slogan: string;
    loading: string;
  };
  trustBar: {
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
  };
  destinations: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    dakarDesc: string;
    goreeDesc: string;
    lacRoseDesc: string;
    saintLouisDesc: string;
    saloumDesc: string;
    djoudjDesc: string;
    ctaButton: string;
  };
  experiences: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    culinaryTitle: string;
    culinaryDesc: string;
    culturalTitle: string;
    culturalDesc: string;
    natureTitle: string;
    natureDesc: string;
    ecoTitle: string;
    ecoDesc: string;
  };
  planner: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    ctaButton: string;
  };
  founder: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    quote: string;
    bio1: string;
    bio2: string;
    signature: string;
    role: string;
  };
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  map: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    clickToExplore: string;
  };
  footer: {
    description: string;
    navigation: string;
    circuits: string;
    contactTitle: string;
    phone: string;
    email: string;
    address: string;
    location: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    subscribe: string;
    copyright: string;
    madeWithLove: string;
  };
  excursionsPage: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterCategory: string;
    filterDuration: string;
    filterAll: string;
    filterHalfDay: string;
    filterFullDay: string;
    filterMultiDay: string;
    resultsCount: string;
    noResults: string;
    resetFilters: string;
  };
  bookingPage: {
    badge: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formDate: string;
    formParticipants: string;
    formExcursion: string;
    formNotes: string;
    submitButton: string;
    successMessage: string;
  };
  contactPage: {
    badge: string;
    title: string;
    subtitle: string;
    sendMessage: string;
    getInTouch: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    hoursTitle: string;
    hoursDesc: string;
  };
  aboutPage: {
    badge: string;
    title: string;
    subtitle: string;
    founderBadge: string;
    founderTitle: string;
    founderGenese: string;
    founderQuote: string;
    founderP1: string;
    founderP2: string;
    founderP3: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    organizeCta: string;
    val1Title: string;
    val1Desc: string;
    val2Title: string;
    val2Desc: string;
    val3Title: string;
    val3Desc: string;
  };
  galleryPage: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      dakar: string;
      goree: string;
      nature: string;
      culture: string;
      gastronomy: string;
      villages: string;
      solidarity: string;
    };
  };
  excursionDetailPage: {
    loading: string;
    notFoundTitle: string;
    notFoundDesc: string;
    backToCatalog: string;
    departure: string;
    group: string;
    guests: string;
    presentation: string;
    itinerary: string;
    inclusions: string;
    includedTitle: string;
    excludedTitle: string;
    practicalInfos: string;
    bookThisExcursion: string;
    askQuote: string;
    chatWhatsapp: string;
    customNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      discover: 'Découvrir',
      bookNow: 'Réserver maintenant',
      learnMore: 'En savoir plus',
      contactUs: 'Nous contacter',
      seeAll: 'Tout voir',
      backToHome: 'Retour à l’accueil',
      duration: 'Durée',
      day: 'jour',
      days: 'jours',
      halfDay: '½ journée',
      fullDay: '1 journée',
      priceOnRequest: 'Sur demande',
      loading: 'Chargement...',
      send: 'Envoyer',
      success: 'Succès',
      allRightsReserved: 'Tous droits réservés.',
      pricing: 'Tarification',
      details: 'Détails',
      mustSee: 'Incontournable',
    },
    nav: {
      home: 'Accueil',
      excursions: 'Excursions',
      themes: 'Voyages à thèmes',
      solidarity: 'Tourisme Solidaire',
      about: 'À Propos',
      gallery: 'Galerie',
      booking: 'Réservation',
      contact: 'Contact',
      bookStay: 'Réserver un séjour',
      ourMainCircuits: 'Nos Circuits Phares',
      ourThemes: 'Nos Voyages Thématiques',
      ourSolidarity: 'Nos Actions Solidaires',
      seeAllCircuits: 'Tout voir →',
      explore: 'Explorer',
    },
    hero: {
      badge: 'SÉNÉGAL TOP TOUR',
      titleLine1: 'Découvrez le',
      titleLine2: 'Sénégal',
      titleItalic: 'autrement.',
      description: 'Des excursions inoubliables, des voyages à thèmes et des expériences solidaires pour vivre une rencontre authentique avec le Sénégal.',
      btnExcursions: 'Découvrir nos excursions',
      btnExperiences: 'Nos expériences',
      locationTitle: 'Île de Gorée',
      locationSubtitle: 'Mémoire & patrimoine',
      scrollExplore: 'SCROLL POUR EXPLORER',
    },
    intro: {
      slogan: '« Découvrez le Sénégal autrement. »',
      loading: 'Chargement de votre voyage...',
    },
    trustBar: {
      item1Title: 'La Teranga Authentique',
      item1Desc: 'Accueil chaleureux & hospitalité sénégalaise',
      item2Title: 'Guides Locaux Certifiés',
      item2Desc: 'Passionnés, experts & bilingues',
      item3Title: 'Circuits Sur Mesure',
      item3Desc: 'Itinéraires 100% personnalisables',
      item4Title: 'Impact Solidaire & Éthique',
      item4Desc: 'Soutien direct aux communautés locales',
    },
    destinations: {
      badge: 'DESTINATIONS EMBLÉMATIQUES',
      title: 'Les Merveilles du',
      titleHighlight: 'Sénégal',
      subtitle: 'Des plages sauvages de l’Atlantique aux dunes flamboyantes, parcourez les joyaux d’un pays aux mille visages.',
      dakarDesc: 'Capitale vibrante, art contemporain, falaises de la Corniche et marchés colorés.',
      goreeDesc: 'Île chargée d’histoire, mémoire universelle, ruelles pastel et douceur de vivre.',
      lacRoseDesc: 'Lagune saline aux reflets magiques, dunes du Paris-Dakar et ramasseurs de sel.',
      saintLouisDesc: 'Ancienne capitale coloniale, charme intemporel, calèches et fleuve Sénégal.',
      saloumDesc: 'Labyrinthe de mangroves, îles sauvages, pirogues traditionnelles et sanctuaire d’oiseaux.',
      djoudjDesc: '3e réserve ornithologique au monde, pélicans blancs et faune exceptionnelle.',
      ctaButton: 'Découvrir toutes les destinations',
    },
    experiences: {
      badge: 'EXPÉRIENCES IMMERSIVES',
      title: 'Vivez le Sénégal de',
      titleHighlight: 'l’Intérieur',
      subtitle: 'Plus qu’un simple voyage : une immersion humaine, culturelle et gourmande au cœur des traditions.',
      culinaryTitle: 'Cooking Class Teranga',
      culinaryDesc: 'Marché aux épices, préparation du Thiéboudienne traditionnel et dégustation partagée.',
      culturalTitle: 'Rencontres entre Homologues',
      culturalDesc: 'Échanges enrichissants entre professionnels, enseignants, artisans et agriculteurs locaux.',
      natureTitle: 'Safari & Sanctuaires Sauvages',
      natureDesc: 'Pirogue dans la mangrove du Saloum et observation des milliers d’oiseaux du Djoudj.',
      ecoTitle: 'Écoconstruction & Artisanat',
      ecoDesc: 'Initiation à l’architecture en terre (banco) et découverte des ateliers de recyclage dakarois.',
    },
    planner: {
      badge: 'SUR MESURE',
      title: 'Créez votre Voyage',
      titleHighlight: 'Idéal',
      subtitle: 'Concevons ensemble un itinéraire sur mesure adapté à votre rythme, vos envies et votre budget.',
      step1Title: '1. Exprimez vos envies',
      step1Desc: 'Dates, durée, style de voyage et centres d’intérêt.',
      step2Title: '2. Proposition personnalisée',
      step2Desc: 'Notre équipe élabore votre carnet de route exclusif.',
      step3Title: '3. Vivez l’aventure',
      step3Desc: 'Accompagnement VIP et conciergerie 24/7 sur place.',
      ctaButton: 'Personnaliser mon voyage',
    },
    founder: {
      badge: 'NOTRE HISTOIRE',
      title: 'La Passion de la',
      titleHighlight: 'Teranga',
      subtitle: 'Fondée avec le cœur pour partager la beauté et l’âme authentique du Sénégal.',
      quote: '« Notre mission n’est pas seulement de vous faire visiter un pays, mais de vous faire toucher son âme et vivre des moments d’humanité inoubliables. »',
      bio1: 'Guide passionné depuis plus de 15 ans, notre fondateur a créé Senegal Top Tour pour offrir aux voyageurs une approche plus humaine, respectueuse et immersive.',
      bio2: 'Chaque circuit est conçu en harmonie avec les populations locales afin que votre passage laisse une empreinte positive et durable.',
      signature: 'L’équipe SENEGAL TOP TOUR',
      role: 'Fondateur & Guide Concepteur',
    },
    testimonials: {
      badge: 'TÉMOIGNAGES',
      title: 'Ce que nos Voyageurs',
      titleHighlight: 'Racontent',
      subtitle: 'Des souvenirs gravés à jamais dans les mémoires.',
    },
    map: {
      badge: 'CARTE INTERACTIVE',
      title: 'Explorez le',
      titleHighlight: 'Sénégal',
      subtitle: 'Cliquez sur une région pour découvrir nos circuits et excursions dédiés.',
      clickToExplore: 'Cliquez sur un point pour explorer la région',
    },
    footer: {
      description: 'Agence touristique d’exception au Sénégal. Excursions inoubliables, voyages à thèmes immersifs et tourisme solidaire.',
      navigation: 'Navigation',
      circuits: 'Circuits Populaires',
      contactTitle: 'Contact & Réservations',
      phone: '+221 77 000 00 00',
      email: 'contact@senegaltoptour.com',
      address: 'Dakar & Saly, Sénégal',
      location: 'Sénégal, Afrique de l’Ouest',
      newsletterTitle: 'Restez Inspiré',
      newsletterDesc: 'Recevez nos récits de voyage et offres exclusives.',
      newsletterPlaceholder: 'Votre adresse email...',
      subscribe: 'S’inscrire',
      copyright: '© 2026 SENEGAL TOP TOUR. Tous droits réservés.',
      madeWithLove: 'Créé avec passion pour le Sénégal.',
    },
    excursionsPage: {
      badge: 'Catalogue Officiel',
      title: 'Nos Excursions & Circuits',
      subtitle: 'Découvrez notre sélection d’itinéraires exclusifs pour explorer les plus beaux sites du Sénégal.',
      searchPlaceholder: 'Rechercher par destination, mot-clé (ex: Gorée, Djoudj, Lac Rose, Calèche)...',
      filterCategory: 'Catégorie :',
      filterDuration: 'Durée :',
      filterAll: 'Toutes les excursions',
      filterHalfDay: '½ Journée',
      filterFullDay: '1 Journée',
      filterMultiDay: '2 à 3 Jours',
      resultsCount: 'excursions trouvées',
      noResults: 'Aucune excursion ne correspond à vos critères.',
      resetFilters: 'Réinitialiser les filtres',
    },
    bookingPage: {
      badge: 'Sur Mesure',
      title: 'Réservez votre Expérience',
      subtitle: 'Remplissez le formulaire ci-dessous et notre équipe vous recontactera sous 24h avec un devis personnalisé.',
      formName: 'Nom complet',
      formEmail: 'Adresse email',
      formPhone: 'Numéro de téléphone / WhatsApp',
      formDate: 'Date souhaitée',
      formParticipants: 'Nombre de participants',
      formExcursion: 'Circuit ou excursion choisie',
      formNotes: 'Demandes particulières ou préférences',
      submitButton: 'Envoyer ma demande de réservation',
      successMessage: 'Votre demande a été envoyée avec succès ! Notre équipe vous contactera rapidement.',
    },
    contactPage: {
      badge: 'Nous Contacter',
      title: 'Contactez Notre Équipe',
      subtitle: 'Une question, un projet de séjour sur mesure ? Nous sommes à votre écoute 7j/7.',
      sendMessage: 'Envoyez-nous un message',
      getInTouch: 'Nos Coordonnées',
      name: 'Votre nom',
      email: 'Votre email',
      subject: 'Sujet',
      message: 'Votre message...',
      hoursTitle: 'Horaires d’ouverture',
      hoursDesc: 'Du Lundi au Dimanche : 24h/24 via WhatsApp & Conciergerie',
    },
    aboutPage: {
      badge: 'Notre Histoire & Philosophie',
      title: 'L’Esprit Senegal Top Tour',
      subtitle: 'Découvrez la genèse d’une agence réceptive née de la passion pour le Sénégal, de la recherche universitaire et du respect des peuples.',
      founderBadge: 'Fondateur & Concepteur',
      founderTitle: 'Une vision éthique & universitaire',
      founderGenese: 'Genèse & Vision du Fondateur',
      founderQuote: '« Une vision du tourisme fondée sur la rencontre, la connaissance et le partage. »',
      founderP1: 'L’aventure de Senegal Top Tour est le fruit d’un parcours exceptionnel alliant rigueur académique internationale et amour inconditionnel pour les terroirs sénégalais.',
      founderP2: 'Après de solides études en langue et civilisation germaniques ainsi qu’en socioéconomie, le fondateur s’est spécialisé à l’Université de Genève où il a obtenu un Diplôme en Études du Développement puis un Diplôme d’Études Approfondies (DEA). Ses travaux pionniers ont porté sur les dynamiques du Tourisme Rural Intégré au Sénégal, démontrant comment le voyage peut devenir un formidable levier d’autonomie pour les villages.',
      founderP3: 'Cette double casquette d’universitaire et de praticien du terrain garantit à nos voyageurs une approche d’une finesse rare : chaque guide est formé, chaque rencontre est préparée avec déférence, et chaque itinéraire fait sens.',
      pillar1Title: 'Rigueur & Culture',
      pillar1Desc: 'Guides conférenciers maîtrisant l’histoire, la sociologie et la faune locale.',
      pillar2Title: 'Éthique & Respect',
      pillar2Desc: 'Partenariat loyal avec les chefferies villageoises et artisans.',
      organizeCta: 'Organiser votre voyage avec nous →',
      val1Title: 'Sécurité & Confort',
      val1Desc: 'Véhicules récents et climatisés, chauffeurs chevronnés et assistance 24/7 pour un voyage en toute sérénité.',
      val2Title: 'Sur Mesure Absolu',
      val2Desc: 'Chaque voyageur est unique. Nos programmes s’ajustent à votre rythme, vos centres d’intérêt et votre calendrier.',
      val3Title: 'Teranga & Humanité',
      val3Desc: 'L’hospitalité sénégalaise n’est pas un vain mot : nous vous ouvrons les portes des maisons et des cœurs.',
    },
    galleryPage: {
      badge: 'Instants de Vie',
      title: 'Galerie photographique du Sénégal',
      subtitle: 'Plongez dans les teintes, les visages, les horizons sauvages et l’énergie vibrante de notre terre.',
      categories: {
        all: 'Toutes',
        dakar: 'Dakar',
        goree: 'Gorée',
        nature: 'Nature',
        culture: 'Culture',
        gastronomy: 'Gastronomie',
        villages: 'Villages',
        solidarity: 'Tourisme solidaire',
      },
    },
    excursionDetailPage: {
      loading: 'Chargement de l’excursion...',
      notFoundTitle: 'Excursion non trouvée',
      notFoundDesc: 'L’itinéraire demandé n’est pas disponible ou a été déplacé.',
      backToCatalog: 'Retourner au catalogue',
      departure: 'Départ',
      group: 'Groupe',
      guests: 'pers.',
      presentation: 'Présentation de l’expérience',
      itinerary: 'Programme & Étapes de l’itinéraire',
      inclusions: 'Ce qui est inclus & Non inclus',
      includedTitle: 'Inclus dans la formule',
      excludedTitle: 'Non inclus',
      practicalInfos: 'Informations pratiques & Conseils',
      bookThisExcursion: 'Réserver cette excursion',
      askQuote: 'Demander un devis personnalisé',
      chatWhatsapp: 'Échanger par WhatsApp',
      customNote: 'Circuit 100% privatisable & personnalisable selon vos envies.',
    },
  },
  en: {
    common: {
      discover: 'Discover',
      bookNow: 'Book Now',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      seeAll: 'See All',
      backToHome: 'Back to Home',
      duration: 'Duration',
      day: 'day',
      days: 'days',
      halfDay: '½ Day',
      fullDay: '1 Day',
      priceOnRequest: 'On Request',
      loading: 'Loading...',
      send: 'Send',
      success: 'Success',
      allRightsReserved: 'All rights reserved.',
      pricing: 'Pricing',
      details: 'Details',
      mustSee: 'Must See',
    },
    nav: {
      home: 'Home',
      excursions: 'Excursions',
      themes: 'Themed Tours',
      solidarity: 'Solidarity Tourism',
      about: 'About Us',
      gallery: 'Gallery',
      booking: 'Booking',
      contact: 'Contact',
      bookStay: 'Book a Tour',
      ourMainCircuits: 'Our Featured Tours',
      ourThemes: 'Our Themed Journeys',
      ourSolidarity: 'Our Solidarity Actions',
      seeAllCircuits: 'View All →',
      explore: 'Explore',
    },
    hero: {
      badge: 'SENEGAL TOP TOUR',
      titleLine1: 'Discover',
      titleLine2: 'Senegal',
      titleItalic: 'differently.',
      description: 'Unforgettable excursions, immersive themed journeys, and solidarity experiences for an authentic encounter with Senegal.',
      btnExcursions: 'Discover Our Excursions',
      btnExperiences: 'Our Experiences',
      locationTitle: 'Gorée Island',
      locationSubtitle: 'History & Heritage',
      scrollExplore: 'SCROLL TO EXPLORE',
    },
    intro: {
      slogan: '« Discover Senegal differently. »',
      loading: 'Loading your journey...',
    },
    trustBar: {
      item1Title: 'Authentic Teranga',
      item1Desc: 'Warm Senegalese welcome & legendary hospitality',
      item2Title: 'Certified Local Guides',
      item2Desc: 'Passionate, expert & bilingual',
      item3Title: 'Tailor-Made Itineraries',
      item3Desc: '100% customizable travel plans',
      item4Title: 'Ethical & Solidarity Impact',
      item4Desc: 'Direct support to local rural communities',
    },
    destinations: {
      badge: 'ICONIC DESTINATIONS',
      title: 'The Wonders of',
      titleHighlight: 'Senegal',
      subtitle: 'From wild Atlantic coastlines to glowing desert dunes, journey through the treasures of a multifaceted land.',
      dakarDesc: 'Vibrant capital, contemporary art scene, coastal Corniche cliffs and bustling markets.',
      goreeDesc: 'Historic sanctuary island, world heritage, colorful colonial alleys and timeless tranquility.',
      lacRoseDesc: 'Magical pink saline lagoon, Paris-Dakar sand dunes and salt harvesting traditions.',
      saintLouisDesc: 'Former colonial capital, timeless charm, horse carriages and the Senegal River.',
      saloumDesc: 'Labyrinth of mangroves, wild islands, traditional wooden pirogues and bird sanctuary.',
      djoudjDesc: '3rd largest bird sanctuary in the world, white pelicans and remarkable biodiversity.',
      ctaButton: 'Discover all destinations',
    },
    experiences: {
      badge: 'IMMERSIVE EXPERIENCES',
      title: 'Experience Senegal from the',
      titleHighlight: 'Inside',
      subtitle: 'More than just travel: a genuine cultural, human, and culinary immersion into local heritage.',
      culinaryTitle: 'Teranga Cooking Class',
      culinaryDesc: 'Traditional spice market tour, cooking authentic Thiéboudienne and shared tasting.',
      culturalTitle: 'Peer-to-Peer Encounters',
      culturalDesc: 'Inspiring exchanges between teachers, artisans, farmers and travelers.',
      natureTitle: 'Safari & Wild Sanctuaries',
      natureDesc: 'Pirogue cruise in the Saloum delta and birdwatching in the Djoudj sanctuary.',
      ecoTitle: 'Earth Building & Crafts',
      ecoDesc: 'Hands-on adobe/banco architecture and visits to innovative Dakar upcycling workshops.',
    },
    planner: {
      badge: 'TAILOR MADE',
      title: 'Design Your Ideal',
      titleHighlight: 'Journey',
      subtitle: 'Let’s craft a custom itinerary tailored to your pace, passions, and travel budget.',
      step1Title: '1. Share your wishes',
      step1Desc: 'Dates, duration, travel style and personal interests.',
      step2Title: '2. Custom Proposal',
      step2Desc: 'Our specialists create your exclusive bespoke roadmap.',
      step3Title: '3. Live the Adventure',
      step3Desc: 'VIP guidance and 24/7 dedicated local concierge support.',
      ctaButton: 'Customize My Trip',
    },
    founder: {
      badge: 'OUR STORY',
      title: 'The Passion for',
      titleHighlight: 'Teranga',
      subtitle: 'Founded from the heart to share the true soul and authentic warmth of Senegal.',
      quote: '« Our mission is not merely to show you a destination, but to touch your heart and create unforgettable human connections. »',
      bio1: 'Passionate guide for over 15 years, our founder created Senegal Top Tour to offer travelers a more humane, respectful and deeply immersive journey.',
      bio2: 'Every tour is designed in close harmony with local communities, ensuring your visit leaves a positive and lasting imprint.',
      signature: 'The SENEGAL TOP TOUR Team',
      role: 'Founder & Tour Designer',
    },
    testimonials: {
      badge: 'TESTIMONIALS',
      title: 'What Our Travelers',
      titleHighlight: 'Say',
      subtitle: 'Precious memories cherished by our guests around the world.',
    },
    map: {
      badge: 'INTERACTIVE MAP',
      title: 'Explore',
      titleHighlight: 'Senegal',
      subtitle: 'Click on any region to discover our dedicated excursions and guided circuits.',
      clickToExplore: 'Click on a point to explore the region',
    },
    footer: {
      description: 'Premier tour agency in Senegal. Unforgettable excursions, immersive themed tours and ethical solidarity tourism.',
      navigation: 'Navigation',
      circuits: 'Popular Circuits',
      contactTitle: 'Contact & Bookings',
      phone: '+221 77 000 00 00',
      email: 'contact@senegaltoptour.com',
      address: 'Dakar & Saly, Senegal',
      location: 'Senegal, West Africa',
      newsletterTitle: 'Stay Inspired',
      newsletterDesc: 'Receive our travel stories, updates, and exclusive tour offers.',
      newsletterPlaceholder: 'Your email address...',
      subscribe: 'Subscribe',
      copyright: '© 2026 SENEGAL TOP TOUR. All rights reserved.',
      madeWithLove: 'Crafted with passion for Senegal.',
    },
    excursionsPage: {
      badge: 'Official Catalog',
      title: 'Our Excursions & Tours',
      subtitle: 'Discover our handpicked collection of exclusive itineraries to explore the finest landmarks in Senegal.',
      searchPlaceholder: 'Search by destination, keyword (e.g. Gorée, Djoudj, Pink Lake)...',
      filterCategory: 'Category:',
      filterDuration: 'Duration:',
      filterAll: 'All Excursions',
      filterHalfDay: '½ Day',
      filterFullDay: '1 Day',
      filterMultiDay: '2 to 3 Days',
      resultsCount: 'tours found',
      noResults: 'No excursions match your search criteria.',
      resetFilters: 'Reset filters',
    },
    bookingPage: {
      badge: 'Tailor Made',
      title: 'Book Your Experience',
      subtitle: 'Fill out the form below and our dedicated team will get back to you within 24 hours with a custom quote.',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number / WhatsApp',
      formDate: 'Preferred Date',
      formParticipants: 'Number of Guests',
      formExcursion: 'Selected Circuit or Excursion',
      formNotes: 'Special requests or preferences',
      submitButton: 'Send Booking Request',
      successMessage: 'Your request has been sent successfully! Our team will contact you shortly.',
    },
    contactPage: {
      badge: 'Get in Touch',
      title: 'Contact Our Team',
      subtitle: 'Have a question or planning a bespoke trip? We are here for you 7 days a week.',
      sendMessage: 'Send us a message',
      getInTouch: 'Get in Touch',
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Your message...',
      hoursTitle: 'Opening Hours',
      hoursDesc: 'Monday to Sunday: 24/7 Concierge via WhatsApp',
    },
    aboutPage: {
      badge: 'Our Story & Philosophy',
      title: 'The Senegal Top Tour Spirit',
      subtitle: 'Discover the genesis of an inbound travel agency born from deep passion for Senegal, academic research, and profound respect for local communities.',
      founderBadge: 'Founder & Tour Designer',
      founderTitle: 'An ethical & academic vision',
      founderGenese: 'Genesis & Founder’s Vision',
      founderQuote: '« A vision of travel founded on genuine encounters, deep knowledge, and shared experiences. »',
      founderP1: 'The story of Senegal Top Tour stems from an exceptional background uniting international academic rigor with unconditional love for Senegal’s authentic terroirs.',
      founderP2: 'After comprehensive studies in Germanic languages and socio-economics, the founder specialized at the University of Geneva, earning a Diploma in Development Studies followed by an Advanced Studies Degree (DEA). His pioneering research examined Integrated Rural Tourism in Senegal, demonstrating how travel can empower village communities.',
      founderP3: 'This dual background as a scholar and seasoned field practitioner guarantees rare depth and finesse: every guide is certified, every cultural encounter is prepared with deference, and every route makes profound sense.',
      pillar1Title: 'Rigor & Cultural Insight',
      pillar1Desc: 'Expert lecturer-guides mastering history, sociology, and local wildlife.',
      pillar2Title: 'Ethics & Respect',
      pillar2Desc: 'Honorable partnership with village leaders, elders, and craftspeople.',
      organizeCta: 'Plan your journey with us →',
      val1Title: 'Safety & Comfort',
      val1Desc: 'Modern air-conditioned vehicles, experienced drivers, and 24/7 assistance for serene exploration.',
      val2Title: '100% Bespoke Journeys',
      val2Desc: 'Every traveler is unique. Our custom itineraries adjust seamlessly to your pace, passions, and schedule.',
      val3Title: 'Teranga & Humanity',
      val3Desc: 'Senegalese hospitality is an authentic way of life: welcoming you warmly into homes and hearts.',
    },
    galleryPage: {
      badge: 'Moments of Life',
      title: 'Photographic Gallery of Senegal',
      subtitle: 'Immerse yourself in the colors, portraits, wild horizons, and vibrant energy of Senegal.',
      categories: {
        all: 'All',
        dakar: 'Dakar',
        goree: 'Gorée',
        nature: 'Nature',
        culture: 'Culture',
        gastronomy: 'Gastronomy',
        villages: 'Villages',
        solidarity: 'Solidarity Tourism',
      },
    },
    excursionDetailPage: {
      loading: 'Loading excursion...',
      notFoundTitle: 'Excursion not found',
      notFoundDesc: 'The requested itinerary is not available or has moved.',
      backToCatalog: 'Back to catalog',
      departure: 'Departure',
      group: 'Group',
      guests: 'guests',
      presentation: 'Experience Overview',
      itinerary: 'Detailed Itinerary & Highlights',
      inclusions: 'What is Included & Excluded',
      includedTitle: 'Included in package',
      excludedTitle: 'Not included',
      practicalInfos: 'Practical Information & Tips',
      bookThisExcursion: 'Book this excursion',
      askQuote: 'Request a custom quote',
      chatWhatsapp: 'Chat on WhatsApp',
      customNote: '100% private and customizable tour tailored to your schedule.',
    },
  },
  de: {
    common: {
      discover: 'Entdecken',
      bookNow: 'Jetzt buchen',
      learnMore: 'Mehr erfahren',
      contactUs: 'Kontaktieren Sie uns',
      seeAll: 'Alle ansehen',
      backToHome: 'Zur Startseite',
      duration: 'Dauer',
      day: 'Tag',
      days: 'Tage',
      halfDay: '½ Tag',
      fullDay: '1 Tag',
      priceOnRequest: 'Auf Anfrage',
      loading: 'Wird geladen...',
      send: 'Senden',
      success: 'Erfolg',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      pricing: 'Preise',
      details: 'Details',
      mustSee: 'Höhepunkt',
    },
    nav: {
      home: 'Startseite',
      excursions: 'Ausflüge',
      themes: 'Themenreisen',
      solidarity: 'Solidartourismus',
      about: 'Über uns',
      gallery: 'Galerie',
      booking: 'Buchung',
      contact: 'Kontakt',
      bookStay: 'Reise buchen',
      ourMainCircuits: 'Unsere beliebtesten Touren',
      ourThemes: 'Unsere Themenreisen',
      ourSolidarity: 'Unsere Solidarprojekte',
      seeAllCircuits: 'Alle ansehen →',
      explore: 'Erkunden',
    },
    hero: {
      badge: 'SÉNÉGAL TOP TOUR',
      titleLine1: 'Entdecken Sie den',
      titleLine2: 'Senegal',
      titleItalic: 'neu und authentisch.',
      description: 'Unvergessliche Ausflüge, thematische Reisen und solidarische Erfahrungen für eine authentische und respektvolle Begegnung mit dem Senegal.',
      btnExcursions: 'Unsere Ausflüge entdecken',
      btnExperiences: 'Unsere Erlebnisse',
      locationTitle: 'Insel Gorée',
      locationSubtitle: 'Geschichte & Welterbe',
      scrollExplore: 'SCROLLEN ZUM ERKUNDEN',
    },
    intro: {
      slogan: '« Entdecken Sie den Senegal neu und authentisch. »',
      loading: 'Ihre Reise wird geladen...',
    },
    trustBar: {
      item1Title: 'Authentische Teranga',
      item1Desc: 'Herzliche senegalesische Gastfreundschaft',
      item2Title: 'Zertifizierte lokale Guides',
      item2Desc: 'Leidenschaftlich, fachkundig & mehrsprachig',
      item3Title: 'Maßgeschneiderte Touren',
      item3Desc: '100% individuell anpassbare Routen',
      item4Title: 'Solidarisch & Ethisch',
      item4Desc: 'Direkte Unterstützung lokaler Gemeinschaften',
    },
    destinations: {
      badge: 'IKONISCHE REISEZIELE',
      title: 'Die Wunder des',
      titleHighlight: 'Senegal',
      subtitle: 'Von den wilden Atlantikküsten bis zu den leuchtenden Sanddünen – entdecken Sie die Schätze eines faszinierenden Landes.',
      dakarDesc: 'Lebendige Hauptstadt, zeitgenössische Kunstszene, Corniche-Klippen und bunte Märkte.',
      goreeDesc: 'Historische Welterbe-Insel, autofreie Gassen in Pastelltönen und zeitlose Ruhe.',
      lacRoseDesc: 'Magisch rosa Salzwasserlagune, Dünen der Paris-Dakar-Piste und traditionelle Salzgewinnung.',
      saintLouisDesc: 'Ehemalige Kolonialhauptstadt, poetischer Charme, Pferdekutschen und der Senegal-Fluss.',
      saloumDesc: 'Mangroven-Labyrinth, unberührte Inseln, traditionelle Pirogen und Vogelschutzgebiet.',
      djoudjDesc: '3. größtes Vogelschutzgebiet der Welt, weiße Pelikane und artenreiche Tierwelt.',
      ctaButton: 'Alle Reiseziele entdecken',
    },
    experiences: {
      badge: 'IMMERSIVE ERLEBNISSE',
      title: 'Erleben Sie den Senegal von',
      titleHighlight: 'Innen',
      subtitle: 'Mehr als nur eine Reise: ein menschlicher, kultureller und kulinarischer Einblick in lebendige Traditionen.',
      culinaryTitle: 'Teranga Kochkurs',
      culinaryDesc: 'Gewürzmarkt-Führung, Zubereitung des traditionellen Thiéboudienne und gemeinsames Essen.',
      culturalTitle: 'Fachlicher Austausch auf Augenhöhe',
      culturalDesc: 'Bereichernde Begegnungen zwischen Lehrern, Handwerkern, Landwirten und Reisenden.',
      natureTitle: 'Safari & Wildtierschutzgebiete',
      natureDesc: 'Pirogenfahrt durch die Mangroven des Saloum und Vogelbeobachtung im Djoudj-Nationalpark.',
      ecoTitle: 'Lehmbau & Upcycling-Handwerk',
      ecoDesc: 'Einführung in die Lehmbaukunst (Banco) und Besuch innovativer Recycling-Werkstätten in Dakar.',
    },
    planner: {
      badge: 'INDIVIDUELL & NACH MASS',
      title: 'Gestalten Sie Ihre Traumreise',
      titleHighlight: 'nach Wunsch',
      subtitle: 'Gemeinsam planen wir Ihre Traumreise, abgestimmt auf Ihr Tempo, Ihre Interessen und Ihr Budget.',
      step1Title: '1. Wünsche äußern',
      step1Desc: 'Reisedaten, Dauer, Reisestil und persönliche Schwerpunkte.',
      step2Title: '2. Maßgeschneidertes Angebot',
      step2Desc: 'Unser Team erstellt Ihr exklusives Reisetagebuch.',
      step3Title: '3. Das Abenteuer erleben',
      step3Desc: 'VIP-Betreuung und 24/7 Concierge-Service vor Ort.',
      ctaButton: 'Reise individuell anpassen',
    },
    founder: {
      badge: 'UNSERE GESCHICHTE',
      title: 'Die Leidenschaft für die',
      titleHighlight: 'Teranga',
      subtitle: 'Mit Herzblut gegründet, um die wahre Seele und herzliche Gastfreundschaft des Senegal zu teilen.',
      quote: '« Unsere Mission ist es nicht nur, Ihnen ein Land zu zeigen, sondern Sie seine Seele spüren zu lassen und unvergessliche menschliche Momente zu schenken. »',
      bio1: 'Seit über 15 Jahren passionierter Reiseleiter, gründete unser Gründer Senegal Top Tour, um Reisenden eine menschlichere, respektvollere und tiefere Reiseerfahrung zu ermöglichen.',
      bio2: 'Jede Tour wird im Einklang mit den lokalen Gemeinschaften konzipiert, sodass Ihr Besuch nachhaltig positive Spuren hinterlässt.',
      signature: 'Das Team von SENEGAL TOP TOUR',
      role: 'Gründer & Reisedesigner',
    },
    testimonials: {
      badge: 'KUNDENSTIMMEN',
      title: 'Was unsere Reisenden',
      titleHighlight: 'Berichten',
      subtitle: 'Erinnerungen, die ein Leben lang im Gedächtnis bleiben.',
    },
    map: {
      badge: 'INTERAKTIVE KARTE',
      title: 'Erkunden Sie den',
      titleHighlight: 'Senegal',
      subtitle: 'Klicken Sie auf eine Region, um unsere Ausflüge und geführten Rundreisen zu entdecken.',
      clickToExplore: 'Klicken Sie auf einen Punkt, um die Region zu erkunden',
    },
    footer: {
      description: 'Erstklassige Reiseagentur im Senegal. Unvergessliche Ausflüge, thematische Kulturreisen und engagierter Solidartourismus.',
      navigation: 'Navigation',
      circuits: 'Beliebte Touren',
      contactTitle: 'Kontakt & Buchungen',
      phone: '+221 77 000 00 00',
      email: 'contact@senegaltoptour.com',
      address: 'Dakar & Saly, Senegal',
      location: 'Senegal, Westafrika',
      newsletterTitle: 'Inspiriert bleiben',
      newsletterDesc: 'Erhalten Sie Reiseberichte, Neuigkeiten und exklusive Angebote.',
      newsletterPlaceholder: 'Ihre E-Mail-Adresse...',
      subscribe: 'Abonnieren',
      copyright: '© 2026 SENEGAL TOP TOUR. Alle Rechte vorbehalten.',
      madeWithLove: 'Mit Leidenschaft für den Senegal gestaltet.',
    },
    excursionsPage: {
      badge: 'Offizieller Katalog',
      title: 'Unsere Ausflüge & Rundreisen',
      subtitle: 'Entdecken Sie unsere Auswahl an exklusiven Routen zu den schönsten Sehenswürdigkeiten des Senegal.',
      searchPlaceholder: 'Suche nach Reiseziel, Stichwort (z. B. Gorée, Djoudj, Lac Rose, Kutsche)...',
      filterCategory: 'Kategorie:',
      filterDuration: 'Dauer:',
      filterAll: 'Alle Ausflüge',
      filterHalfDay: '½ Tag',
      filterFullDay: '1 Tag',
      filterMultiDay: '2 bis 3 Tage',
      resultsCount: 'Ausflüge gefunden',
      noResults: 'Keine Ausflüge entsprechen Ihren Suchkriterien.',
      resetFilters: 'Filter zurücksetzen',
    },
    bookingPage: {
      badge: 'Nach Maß',
      title: 'Buchen Sie Ihr Reiseerlebnis',
      subtitle: 'Füllen Sie das folgende Formular aus – unser Team meldet sich innerhalb von 24 Stunden mit einem individuellen Angebot.',
      formName: 'Vollständiger Name',
      formEmail: 'E-Mail-Adresse',
      formPhone: 'Telefonnummer / WhatsApp',
      formDate: 'Wunschdatum',
      formParticipants: 'Anzahl der Teilnehmer',
      formExcursion: 'Gewählte Tour oder Ausflug',
      formNotes: 'Besondere Wünsche oder Vorlieben',
      submitButton: 'Buchungsanfrage senden',
      successMessage: 'Ihre Anfrage wurde erfolgreich übermittelt! Unser Team wird sich in Kürze bei Ihnen melden.',
    },
    contactPage: {
      badge: 'Kontakt',
      title: 'Kontaktieren Sie unser Team',
      subtitle: 'Haben Sie Fragen oder planen Sie eine Individualreise? Wir sind 7 Tage die Woche für Sie da.',
      sendMessage: 'Senden Sie uns eine Nachricht',
      getInTouch: 'Kontaktdaten',
      name: 'Ihr Name',
      email: 'Ihre E-Mail-Adresse',
      subject: 'Betreff',
      message: 'Ihre Nachricht...',
      hoursTitle: 'Öffnungszeiten',
      hoursDesc: 'Montag bis Sonntag: 24h Concierge via WhatsApp',
    },
    aboutPage: {
      badge: 'Unsere Geschichte & Philosophie',
      title: 'Der Geist von Senegal Top Tour',
      subtitle: 'Entdecken Sie die Entstehung einer Reiseagentur, die aus der Liebe zum Senegal, wissenschaftlicher Forschung und tiefem Respekt für die Menschen entstanden ist.',
      founderBadge: 'Gründer & Reisedesigner',
      founderTitle: 'Eine ethische & akademische Vision',
      founderGenese: 'Entstehung & Vision des Gründers',
      founderQuote: '« Eine Vision des Reisens, die auf echter Begegnung, Wissen und gegenseitigem Austausch beruht. »',
      founderP1: 'Die Geschichte von Senegal Top Tour entspringt einem außergewöhnlichen Werdegang, der internationale akademische Genauigkeit mit bedingungsloser Liebe zu den senegalesischen Regionen verbindet.',
      founderP2: 'Nach fundierten Studien der Germanistik und Sozioökonomie spezialisierte sich der Gründer an der Universität Genf mit einem Diplom in Entwicklungsstudien sowie einem DEA. Seine Pionierarbeit untersuchte die Dynamiken des integrierten ländlichen Tourismus im Senegal und zeigte, wie Reisen die Eigenständigkeit der Dörfer stärken kann.',
      founderP3: 'Diese Doppelrolle als Wissenschaftler und erfahrener Praktiker vor Ort garantiert unseren Reisenden höchste Qualität: Jeder Guide ist ausgebildet, jede Begegnung wird mit Respekt vorbereitet und jede Route ergibt tiefen Sinn.',
      pillar1Title: 'Kulturelle Tiefe & Präzision',
      pillar1Desc: 'Erfahrene Dozenten-Guides mit fundiertem Wissen über Geschichte, Soziologie und Tierwelt.',
      pillar2Title: 'Ethik & Respekt',
      pillar2Desc: 'Vertrauensvolle Partnerschaften mit Dorfältesten, Gemeinschaften und Kunsthandwerkern.',
      organizeCta: 'Planen Sie Ihre Reise mit uns →',
      val1Title: 'Sicherheit & Komfort',
      val1Desc: 'Moderne klimatisierte Fahrzeuge, routinierte Fahrer und 24/7 Betreuung für eine vollkommen sorgenfreie Reise.',
      val2Title: '100% Maßgeschneidert',
      val2Desc: 'Jeder Reisende ist einzigartig. Unsere Programme passen sich perfekt Ihrem Rhythmus, Ihren Interessen und Ihrem Kalender an.',
      val3Title: 'Teranga & Menschlichkeit',
      val3Desc: 'Senegalesische Gastfreundschaft ist gelebte Herzlichkeit: Wir öffnen Ihnen die Türen zu Häusern und Herzen.',
    },
    galleryPage: {
      badge: 'Lebendige Momente',
      title: 'Fotogalerie des Senegal',
      subtitle: 'Tauchen Sie ein in die Farben, Gesichter, wilden Horizonte und die pulsierende Energie unseres Landes.',
      categories: {
        all: 'Alle',
        dakar: 'Dakar',
        goree: 'Gorée',
        nature: 'Natur',
        culture: 'Kultur',
        gastronomy: 'Gastronomie',
        villages: 'Dörfer',
        solidarity: 'Solidartourismus',
      },
    },
    excursionDetailPage: {
      loading: 'Ausflug wird geladen...',
      notFoundTitle: 'Ausflug nicht gefunden',
      notFoundDesc: 'Die gewünschte Route ist nicht verfügbar oder wurde verschoben.',
      backToCatalog: 'Zurück zum Katalog',
      departure: 'Abfahrt',
      group: 'Gruppe',
      guests: 'Pers.',
      presentation: 'Überblick über das Erlebnis',
      itinerary: 'Programm & Etappen der Route',
      inclusions: 'Leistungen & Nicht enthalten',
      includedTitle: 'Im Preis enthalten',
      excludedTitle: 'Nicht enthalten',
      practicalInfos: 'Praktische Informationen & Tipps',
      bookThisExcursion: 'Diesen Ausflug buchen',
      askQuote: 'Individuelles Angebot anfordern',
      chatWhatsapp: 'Über WhatsApp austauschen',
      customNote: 'Tour zu 100% privatisierbar und individuell an Ihre Wünsche anpassbar.',
    },
  },
};
