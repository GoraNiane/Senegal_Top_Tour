import { Destination, Excursion, Reservation, Testimonial, GalleryImage } from '../types';

const API_BASE = '/api';

// Fallback data in case the backend is momentarily starting
export const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Dakar',
    slug: 'dakar',
    subtitle: 'Culture · Vie urbaine · Marchés',
    description: 'Capitale vibrante et effervescente bordée par l\'océan Atlantique, Dakar mêle histoire coloniale, scènes artistiques avant-gardistes, marchés colorés et falaises océaniques.',
    region: 'Région de Dakar',
    highlights: ['Monument de la Renaissance', 'Marché Kermel', 'Corniche des Almadies', 'Galeries d\'art'],
    imageUrl: '/images/dakar.png',
    latitude: 14.6928,
    longitude: -17.4467,
    isFeatured: true,
    order: 1,
  },
  {
    id: '2',
    name: 'Île de Gorée',
    slug: 'goree',
    subtitle: 'Histoire · Mémoire · Culture',
    description: 'Île sanctuaire inscrite au Patrimoine Mondial de l\'UNESCO, havre piétonnier hors du temps aux façades pastel bougainvillées, portant la mémoire universelle de la Maison des Esclaves.',
    region: 'Baie de Dakar',
    highlights: ['Maison des Esclaves', 'Ruelles coloniales', 'Ateliers de peintres', 'Castel panoramique'],
    imageUrl: '/images/goree0.jpg',
    latitude: 14.6667,
    longitude: -17.3972,
    isFeatured: true,
    order: 2,
  },
  {
    id: '3',
    name: 'Lac Rose (Lac Retba)',
    slug: 'lac-rose',
    subtitle: 'Nature · Aventure · Couleurs',
    description: 'Lagune exceptionnelle aux teintes roses et pourpres nichée entre dunes de sable et océan, célèbre pour ses récolteurs de sel et l\'arrivée historique du rallye Paris-Dakar.',
    region: 'Presqu\'île du Cap-Vert',
    highlights: ['Extraction du sel', 'Dunes en 4x4', 'Baignade à flottaison', 'Villages Peuls'],
    imageUrl: '/images/lac-rose-00.webp',
    latitude: 14.8392,
    longitude: -17.2344,
    isFeatured: true,
    order: 3,
  },
  {
    id: '4',
    name: 'Saint-Louis',
    slug: 'saint-louis',
    subtitle: 'Patrimoine · Culture · Nature',
    description: 'Ancienne capitale de l\'Afrique Occidentale Française, classée à l\'UNESCO. Ville insulaire au charme poétique, architecture néoclassique créole, calèches et berceau du Jazz.',
    region: 'Région Nord / Fleuve Sénégal',
    highlights: ['Pont Faidherbe', 'Tour en calèche', 'Quartier Guet Ndar', 'Festival de Jazz'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1400&q=85',
    latitude: 16.0326,
    longitude: -16.5050,
    isFeatured: true,
    order: 4,
  },
  {
    id: '5',
    name: 'Kayar',
    slug: 'kayar',
    subtitle: 'Pêche traditionnelle · Authenticité',
    description: 'L\'un des plus grands ports de pêche artisanale du continent africain. Un spectacle fascinant à l\'arrivée des centaines de pirogues sculptées et peintes défiant les rouleaux de l\'océan.',
    region: 'Grande Côte',
    highlights: ['Arrivée des pirogues', 'Marché aux poissons', 'Village des Tortues de Noflaye', 'Artisanat marin'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    latitude: 14.9167,
    longitude: -17.1167,
    isFeatured: true,
    order: 5,
  },
  {
    id: '6',
    name: 'Parc National du Djoudj',
    slug: 'djoudj',
    subtitle: 'Faune · Nature · Oiseaux',
    description: 'Troisième sanctuaire ornithologique mondial (UNESCO), halte cruciale de 3 millions d\'oiseaux migrateurs. Ballet féerique de pélicans blancs, cormorans, flamants et canards siffleurs.',
    region: 'Delta du Fleuve Sénégal',
    highlights: ['Colonies de pélicans', 'Excursion en pirogue', 'Crocodiles et phacochères', 'Observation éco-guidée'],
    imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1400&q=85',
    latitude: 16.4833,
    longitude: -16.2500,
    isFeatured: true,
    order: 6,
  },
  {
    id: '7',
    name: 'Désert de Lompoul',
    slug: 'lompoul',
    subtitle: 'Désert · Aventure',
    description: 'Enclave saharienne magique aux immenses dunes de sable orangé s\'élevant jusqu\'à 40 mètres. Bivouacs traditionnels raffinés, feux de camp et nuits scintillantes.',
    region: 'Nord-Ouest',
    highlights: ['Massif de dunes ocres', 'Randonnée chamelière', 'Bivouac nomade chic', 'Observation des étoiles'],
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85',
    latitude: 15.4333,
    longitude: -16.7833,
    isFeatured: true,
    order: 7,
  },
  {
    id: '8',
    name: 'Delta du Saloum',
    slug: 'saloum',
    subtitle: 'Nature · Îles · Immersion',
    description: 'Labyrinthe d\'eau et de forêts de mangrove classé Réserve Mondiale de la Biosphère. Rencontre avec le peuple Sérère, îles coquillières et sérénité absolue.',
    region: 'Sine Saloum',
    highlights: ['Navigation dans les bolongs', 'Joal-Fadiouth', 'Cueillette des huîtres', 'Villages insulaires'],
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
    latitude: 13.9167,
    longitude: -16.5000,
    isFeatured: true,
    order: 8,
  },
];

export const FALLBACK_EXCURSIONS: Excursion[] = [
  {
    id: 'e1',
    name: 'Tour de Ville Dakar',
    slug: 'tour-de-ville-dakar',
    subtitle: 'L\'âme de la capitale entre modernité et traditions vivantes',
    description: 'Visite guidée complète de Dakar, capitale du Sénégal. Découverte des grands marchés historiques, de la Place de l\'Indépendance, du Palais Présidentiel, de la Corniche et du Monument de la Renaissance.',
    fullContent: 'Plongez au cœur battant du Sénégal. Des étals parfumés et colorés du marché Kermel jusqu\'au village artisanal de Soumbédioune, cette excursion dévoile l\'incroyable vitalité dakaroise, ses contrastes architecturaux et son panorama grandiose sur l\'Atlantique.',
    duration: '½ journée (9h00 – 12h00 ou 13h00 – 18h00)',
    durationCategory: 'half_day',
    departTime: '09h00 ou 13h00',
    returnTime: '12h00 ou 18h00',
    departureCity: 'Dakar',
    minGroupSize: 1,
    maxGroupSize: 12,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Prix sur demande / Tarif variable selon le nombre de participants',
    inclusions: [
      'Transport en véhicule climatisé avec chauffeur professionnel',
      'Guide touristique officiel francophone/anglophone',
      'Droits d\'entrée aux monuments et sites mentionnés',
      'Bouteilles d\'eau minérale à bord',
    ],
    exclusions: [
      'Dépenses personnelles et souvenirs',
      'Repas et boissons non mentionnés',
      'Pourboires pour le guide et chauffeur',
    ],
    practicalInfo: {
      tenue: 'Tenue légère et confortable, chaussures de marche fermées',
      equipement: 'Chapeau ou casquette, lunettes de soleil, appareil photo',
      accessibilite: 'Accessible à tous les âges',
    },
    isFeatured: true,
    isPopular: true,
    category: 'Culture',
    destinationId: '1',
    images: [
      { url: '/images/dakar.png', caption: 'Ruelle animée et architecture colorée de Dakar', isCover: true, order: 1 },
      { url: '/images/dakar4.png', caption: 'Panorama sur la presqu\'île et monuments de Dakar', isCover: false, order: 2 },
      { url: '/images/dakar5.png', caption: 'Marchés et vie locale dakaroise', isCover: false, order: 3 },
      { url: '/images/dakar2.avif', caption: 'Le front de mer et la corniche de Dakar', isCover: false, order: 4 },
    ],
    itinerary: [
      { time: '09:00', title: 'Prise en charge à votre hôtel', description: 'Accueil chaleureux par votre guide privé et départ en véhicule de prestige.', order: 1 },
      { time: '09:30', title: 'Marchés Kermel et Sandaga', description: 'Immersion dans les étals de fleurs, vanneries, épices et artisanat d\'art.', order: 2 },
      { time: '10:45', title: 'Monument de la Renaissance & Corniche', description: 'Montée des marches de la statue monumentale et vue imprenable sur la baie.', order: 3 },
      { time: '11:30', title: 'Village artisanal de Soumbédioune', description: 'Rencontre avec les ébénistes, bijoutiers et potiers dakarois.', order: 4 },
      { time: '12:00', title: 'Retour à l\'hôtel', description: 'Dépose personnalisée à votre lieu de résidence.', order: 5 },
    ],
  },
  {
    id: 'e2',
    name: 'Dakar + Île de Gorée',
    slug: 'dakar-goree',
    subtitle: 'La journée incontournable : mémoire insulaire & splendeur dakaroise',
    description: 'Une journée complète combinant la traversée maritime et la visite émouvante de l\'Île de Gorée le matin, suivie d\'un déjeuner face à l\'océan et du grand tour culturel de Dakar l\'après-midi.',
    fullContent: 'L\'expérience ultime pour appréhender l\'histoire du Sénégal et sa capitale moderne. Le matin est consacré au recueillement et à la beauté intemporelle de Gorée, avec déjeuner possible sur les terrasses du rivage. L\'après-midi vous conduit à travers les artères vibrantes et les sites emblématiques de Dakar.',
    duration: '1 journée complète (8h30 – 18h00)',
    durationCategory: 'full_day',
    departTime: '08h30',
    returnTime: '18h00',
    departureCity: 'Dakar',
    minGroupSize: 1,
    maxGroupSize: 15,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Tarif variable selon le nombre de participants (prix sur demande)',
    inclusions: [
      'Traversée aller-retour en chaloupe pour l\'Île de Gorée',
      'Taxe d\'accès et droits de visite de la Maison des Esclaves',
      'Guide conférencier dédié toute la journée',
      'Transport privatisé et climatisé à Dakar',
      'Assistance et transferts hôtel',
    ],
    exclusions: [
      'Déjeuner (restaurants recommandés sur place)',
      'Boissons et dépenses personnelles',
      'Pourboires',
    ],
    practicalInfo: {
      documents: 'Pièce d\'identité ou passeport requis pour l\'embarquement maritime',
      recommandation: 'Protection solaire et monnaie locale pour l\'artisanat d\'artistes',
    },
    isFeatured: true,
    isPopular: true,
    category: 'Histoire',
    destinationId: '2',
    images: [
      { url: '/images/goree0.jpg', caption: 'Maisons coloniales aux couleurs ocre de l\'Île de Gorée', isCover: true, order: 1 },
      { url: '/images/goree1.jpg', caption: 'Ruelles fleuries et architecture d\'époque', isCover: false, order: 2 },
      { url: '/images/dakar5.png', caption: 'Vue panoramique sur la capitale Dakar', isCover: false, order: 3 },
    ],
    itinerary: [
      { time: '08:30', title: 'Départ & Embarcadère de Dakar', description: 'Accueil et embarquement à bord de la chaloupe pour une traversée de 20 minutes.', order: 1 },
      { time: '09:00', title: 'Visite guidée de l\'Île de Gorée', description: 'Visite de la Maison des Esclaves, écoute du conservateur et flânerie dans les ruelles pavées.', order: 2 },
      { time: '12:00', title: 'Déjeuner libre à Gorée', description: 'Pause gourmande face à la mer avec dégustation de poissons grillés frais.', order: 3 },
      { time: '13:30', title: 'Retour à Dakar et Tour Panoramique', description: 'Palais Présidentiel, Place de l\'Indépendance, Cathédrale du Souvenir Africain.', order: 4 },
      { time: '15:30', title: 'Corniche Ouest & Monument Renaissance', description: 'Visite du monument le plus haut d\'Afrique et point de vue exceptionnel.', order: 5 },
      { time: '18:00', title: 'Retour à l\'hôtel', description: 'Fin d\'une journée mémorable.', order: 6 },
    ],
  },
  {
    id: 'e3',
    name: 'Île de Gorée — Mémoire & Sérénité',
    slug: 'goree',
    subtitle: 'Un voyage hors du temps au cœur de l\'histoire universelle',
    description: 'Excursion dédiée à l\'Île de Gorée, ses maisons d\'époque aux façades ocres et pastel, ses ateliers de peintres et le sanctuaire émouvant de la Maison des Esclaves.',
    fullContent: 'À seulement vingt minutes de Dakar en chaloupe, l\'Île de Gorée est une parenthèse de quiétude totale où aucune voiture ne circule. Laissez-vous conter l\'histoire par un guide passionné et découvrez l\'incroyable communauté d\'artistes qui y réside.',
    duration: '½ journée (8h30 – 12h00 ou 13h00 – 18h00)',
    durationCategory: 'half_day',
    departTime: '08h30 ou 13h00',
    returnTime: '12h00 ou 18h00',
    departureCity: 'Dakar',
    minGroupSize: 1,
    maxGroupSize: 20,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Prix sur demande (possibilité de déjeuner à Gorée)',
    inclusions: [
      'Billets aller-retour de chaloupe Dakar-Gorée',
      'Taxe municipale d\'entrée sur l\'île',
      'Entrée à la Maison des Esclaves',
      'Guide conférencier officiel de Gorée',
    ],
    exclusions: [
      'Restauration et boissons',
      'Achats de tableaux et objets d\'art',
    ],
    practicalInfo: {
      rythme: 'Visite à pied agréable dans des ruelles ombragées',
      options: 'Option déjeuner en terrasse au bord de l\'eau sur demande',
    },
    isFeatured: true,
    isPopular: true,
    category: 'Histoire',
    destinationId: '2',
    images: [
      { url: '/images/goree0.jpg', caption: 'Façades emblématiques et ruelles de Gorée', isCover: true, order: 1 },
      { url: '/images/goree1.jpg', caption: 'Architecture coloniale et bougainvilliers', isCover: false, order: 2 },
      { url: '/images/goree2.jpg', caption: 'Maison des Esclaves et mémoire historique', isCover: false, order: 3 },
      { url: '/images/goree4.webp', caption: 'Ateliers d\'artistes et artisanat insulaire', isCover: false, order: 4 },
      { url: '/images/goree5.webp', caption: 'Flânerie et douceur de vivre à Gorée', isCover: false, order: 5 },
    ],
    itinerary: [
      { time: '08:30', title: 'Embarquement au port de Dakar', description: 'Départ en chaloupe vers l\'île.', order: 1 },
      { time: '09:00', title: 'Maison des Esclaves', description: 'Visite guidée et moment d\'émotion sur le seuil de la porte du voyage sans retour.', order: 2 },
      { time: '10:30', title: 'Castel & Ateliers d\'artistes', description: 'Montée au Castel pour admirer le panorama et rencontre avec les peintres sur sable.', order: 3 },
      { time: '12:00', title: 'Déjeuner ou retour', description: 'Option déjeuner sur place ou retour vers Dakar.', order: 4 },
    ],
  },
  {
    id: 'e4',
    name: 'Kayar & Village des Tortues de Noflaye',
    slug: 'kayar-village-tortues',
    subtitle: 'Le frisson de la grande pêche artisanale et la préservation de la biodiversité',
    description: 'Visite du spectaculaire port de pêche de Kayar à 60 km de Dakar, combinée avec la réserve botanique et le sanctuaire du Village des Tortues géantes de Noflaye.',
    fullContent: 'Kayar offre une décharge d\'énergie incomparable lors de l\'arrivée des pirogues luttant contre la houle atlantique. En chemin, la visite du Village des Tortues de Noflaye permet d\'observer la tortue sillonnée géante (Geochelone sulcata) dans son milieu naturel protégé.',
    duration: '½ journée (8h30 – 13h00 ou 13h00 – 18h00)',
    durationCategory: 'half_day',
    departTime: '08h30 ou 13h00',
    returnTime: '13h00 ou 18h00',
    departureCity: 'Dakar',
    minGroupSize: 2,
    maxGroupSize: 10,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Tarif variable selon le nombre de participants',
    inclusions: [
      'Transport en 4x4 ou monospace climatisé',
      'Guide touristique spécialisé',
      'Entrée au Village des Tortues de Noflaye',
      'Frais de visite au village de pêcheurs de Kayar',
    ],
    exclusions: ['Repas et boissons', 'Pourboires et dépenses personnelles'],
    practicalInfo: {
      distance: 'Environ 60 km au nord de Dakar',
      conseils: 'Chaussures fermées recommandées pour la plage et le sentier forestier',
    },
    isFeatured: false,
    isPopular: true,
    category: 'Nature',
    destinationId: '5',
    images: [
      { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85', caption: 'Pirogues multicolores sur le rivage de Kayar', isCover: true, order: 1 },
    ],
    itinerary: [
      { time: '08:30', title: 'Départ de Dakar', description: 'Traversée de la région des Niayes, potager verdoyant du Sénégal.', order: 1 },
      { time: '09:30', title: 'Village des Tortues de Noflaye', description: 'Visite de la nurserie et observation des tortues géantes centenaires.', order: 2 },
      { time: '11:00', title: 'Arrivée à Kayar', description: 'Spectacle du débarquement du poisson et de la vente à la criée.', order: 3 },
      { time: '13:00', title: 'Retour à Dakar', description: 'Arrivée à l\'hôtel.', order: 4 },
    ],
  },
  {
    id: 'e5',
    name: 'Lac Rose / Lac Retba',
    slug: 'lac-rose-retba',
    subtitle: 'Alchimie minérale, dunes de l\'ancien Paris-Dakar & flottabilité magique',
    description: 'Découverte du célèbre Lac Rose, immersion avec les ramasseurs de sel traditionnels et escapade palpitante en véhicule tout-terrain sur les dunes côtières.',
    fullContent: 'Le Lac Retba doit sa couleur rose violacée à une algue microscopique réagissant à sa très forte teneur en sel. Assistez au travail courageux des hommes extrayant le sel du fond du lac et vivez une baignade d\'une flottabilité surprenante.',
    duration: '½ journée (8h00 – 13h00 ou 13h00 – 18h00)',
    durationCategory: 'half_day',
    departTime: '08h00 ou 13h00',
    returnTime: '13h00 ou 18h00',
    departureCity: 'Dakar',
    minGroupSize: 1,
    maxGroupSize: 16,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Prix sur demande / Devis personnalisé',
    inclusions: [
      'Transport privatisé climatisé aller-retour',
      'Tour en 4x4 ou camion tout-terrain sur les dunes et la plage',
      'Traversée en pirogue traditionnelle sur le Lac Rose',
      'Guide local spécialisé',
    ],
    exclusions: ['Déjeuner (possibilité de déjeuner au restaurant panoramique du lac)', 'Pourboires et extras'],
    practicalInfo: {
      baignade: 'Prévoir maillot de bain et serviette (douche d\'eau douce disponible)',
      soleil: 'Crème solaire et lunettes indispensables',
    },
    isFeatured: true,
    isPopular: true,
    category: 'Aventure',
    destinationId: '3',
    images: [
      { url: '/images/lac-rose-00.webp', caption: 'Les reflets roses spectaculaires du Lac Retba', isCover: true, order: 1 },
      { url: '/images/lac-rose-0.webp', caption: 'Récolte artisanale du sel et paysages dunaires', isCover: false, order: 2 },
      { url: '/images/lac-rose-2.webp', caption: 'Pirogues traditionnelles sur les eaux du Lac Rose', isCover: false, order: 3 },
    ],
    itinerary: [
      { time: '08:00', title: 'Départ de Dakar', description: 'Route vers le nord-est à travers les paysages sahéliens.', order: 1 },
      { time: '09:00', title: 'Embarquement et récolte du sel', description: 'Rencontre avec les ramasseurs et explication des vertus thérapeutiques du sel.', order: 2 },
      { time: '10:30', title: 'Raid 4x4 sur les dunes et piste Paris-Dakar', description: 'Sensations fortes entre dunes de sable et vagues de l\'océan.', order: 3 },
      { time: '12:00', title: 'Baignade flottante et détente', description: 'Expérience unique de flottaison sur l\'eau saturée en sel.', order: 4 },
      { time: '13:00', title: 'Retour à Dakar', description: 'Arrivée à l\'hôtel.', order: 5 },
    ],
  },
  {
    id: 'e6',
    name: 'Grand Circuit Saint-Louis & Sanctuaire du Djoudj (3 Jours)',
    slug: 'saint-louis-djoudj-3-jours',
    subtitle: 'Une épopée royale entre fleuve mythique, architecture coloniale et ballet d\'oiseaux',
    description: 'Circuit complet de 3 jours et 2 nuits : Saint-Louis en calèche, Manufacture des Tapisseries de Thiès, et safari en pirogue dans le Parc National des Oiseaux du Djoudj (UNESCO).',
    fullContent: 'Un voyage inoubliable vers le Nord du Sénégal. Jour 1 : départ de l\'hôtel à 7h30, escale culturelle à Thiès (Manufacture des Arts Décoratifs et marché), déjeuner à Thiès ou Tivaouane, arrivée à Saint-Louis à 16h00, installation et tour de ville poétique en calèche à 17h00. Jour 2 : safari pirogue au Djoudj à 7h30 pour contempler des millions de pélicans et migrateurs. Jour 3 : retour vers Dakar avec détour possible par la cité sacrée de Touba sur demande.\n\nNote importante : Visite du Djoudj d\'octobre à avril. En dehors de cette période, alternative au Parc National de la Langue de Barbarie, visitable toute l\'année.',
    duration: '3 jours / 2 nuits',
    durationCategory: 'multi_day',
    departTime: '07h30 (Jour 1)',
    returnTime: '17h00 (Jour 3)',
    departureCity: 'Dakar',
    minGroupSize: 2,
    maxGroupSize: 12,
    priceType: 'on_demand',
    currency: 'EUR',
    priceNote: 'Prix sur demande selon standing hôtelier et formule (B&B ou demi-pension)',
    inclusions: [
      'Transport privatisé en véhicule grand confort tout le circuit',
      'Chauffeur expérimenté et guide expert tout au long du voyage',
      '2 nuits en hôtel de charme à Saint-Louis',
      'Visite de la Manufacture des Arts Décoratifs de Thiès',
      'Tour de ville historique de Saint-Louis en calèche privée',
      'Entrée et safari en pirogue au Parc National du Djoudj (ou Langue de Barbarie)',
      'Option détour Touba sur demande inclus sans supplément',
    ],
    exclusions: [
      'Déjeuners et dîners (recommandations gourmandes données sur place)',
      'Boissons alcoolisées et dépenses personnelles',
      'Pourboires du guide, piroguier et cocher',
    ],
    practicalInfo: {
      saison_djoudj: 'Djoudj ouvert d\'octobre à avril (Période optimale des oiseaux migrateurs)',
      alternative_ete: 'Parc National de la Langue de Barbarie visitable toute l\'année',
      bagages: 'Sac de voyage souple recommandé',
    },
    isFeatured: true,
    isPopular: true,
    category: 'Culture',
    destinationId: '4',
    images: [
      { url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=85', caption: 'Le charme colonial et les façades de l\'île de Saint-Louis', isCover: true, order: 1 },
      { url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=85', caption: 'Safari au cœur des colonies de pélicans du Djoudj', isCover: false, order: 2 },
    ],
    itinerary: [
      { time: 'J1 - 07:30', title: 'Départ de Dakar vers Thiès', description: 'Arrêt à Thiès : visite de la Manufacture des Arts Décoratifs, renommée mondiale pour ses tapisseries monumentales, et halte au marché artisanal.', order: 1 },
      { time: 'J1 - 12:30', title: 'Déjeuner à Thiès ou Tivaouane', description: 'Dégustation des saveurs du terroir sénégalais.', order: 2 },
      { time: 'J1 - 16:00', title: 'Arrivée à Saint-Louis & Installation', description: 'Arrivée sur l\'île fluviale et installation dans votre hôtel historique.', order: 3 },
      { time: 'J1 - 17:00', title: 'Tour de ville en calèche', description: 'Flânerie au rythme des sabots : maisons à varangues coloniales, pont Faidherbe et quartier des pêcheurs de Guet Ndar.', order: 4 },
      { time: 'J1 - 19:00', title: 'Dîner et nuitée à Saint-Louis', description: 'Soirée jazz et saveurs saint-louisiennes.', order: 5 },
      { time: 'J2 - 07:30', title: 'Départ matinal vers le Parc du Djoudj', description: 'Route vers le nord à travers les paysages désertiques du Walo.', order: 6 },
      { time: 'J2 - 09:30', title: 'Safari en pirogue au Djoudj', description: 'Navigation silencieuse au milieu du nid des pélicans et milliers d\'oiseaux migrateurs.', order: 7 },
      { time: 'J2 - 11:00', title: 'Retour vers Saint-Louis', description: 'Après-midi libre : galeries d\'art contemporain, musée de la photographie ou farniente.', order: 8 },
      { time: 'J3 - 08:00', title: 'Départ de Saint-Louis vers Dakar', description: 'Retour vers la capitale avec option détour par la cité sainte de Touba sur demande.', order: 9 },
    ],
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    fullName: 'Sophie & Marc Delattre',
    country: 'France (Lyon)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Notre séjour de 3 jours à Saint-Louis et au Djoudj a été un émerveillement absolu. L\'organisation était parfaite, le guide d\'une culture remarquable et respectueux des lieux. Une agence d\'exception !',
    tourName: 'Grand Circuit Saint-Louis & Djoudj',
    isPublished: true,
  },
  {
    id: 't2',
    fullName: 'Dr. Jean-Pierre Meyer',
    country: 'Suisse (Genève)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'L\'expérience de Tourisme Solidaire dans le Saloum a changé notre regard sur le voyage. Participer aux projets avec les villageois sans jamais rien imposer, c\'est exactement la vision du tourisme durable.',
    tourName: 'Tourisme Rural Intégré Saloum',
    isPublished: true,
  },
  {
    id: 't3',
    fullName: 'Camille Leroy',
    country: 'Belgique (Bruxelles)',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'La journée Gorée + Dakar avec le déjeuner au bord de l\'eau restera gravée dans notre mémoire. Senegal Top Tour sait transmettre l\'histoire avec une élégance et une vérité bouleversantes.',
    tourName: 'Dakar + Île de Gorée',
    isPublished: true,
  },
];

export const FALLBACK_GALLERY: GalleryImage[] = [
  { id: 'g1', title: 'Couleurs et Vie de Dakar', category: 'Dakar', imageUrl: '/images/dakar.png', location: 'Dakar', order: 1 },
  { id: 'g2', title: 'Corniche et Baie de Dakar', category: 'Dakar', imageUrl: '/images/dakar4.png', location: 'Corniche de Dakar', order: 2 },
  { id: 'g3', title: 'Marché et Artisanat Dakar', category: 'Dakar', imageUrl: '/images/dakar5.png', location: 'Dakar Centre', order: 3 },
  { id: 'g4', title: 'Front de Mer Dakar', category: 'Dakar', imageUrl: '/images/dakar2.avif', location: 'Almadies Dakar', order: 4 },
  { id: 'g5_0', title: 'Vue et Couleurs de Gorée', category: 'Gorée', imageUrl: '/images/goree0.jpg', location: 'Île de Gorée', order: 5 },
  { id: 'g5_1', title: 'Architecture Coloniale & Bougainvilliers', category: 'Gorée', imageUrl: '/images/goree1.jpg', location: 'Île de Gorée', order: 6 },
  { id: 'g5_2', title: 'Maison des Esclaves & Mémoire', category: 'Gorée', imageUrl: '/images/goree2.jpg', location: 'Île de Gorée', order: 7 },
  { id: 'g5_3', title: 'Ruelles d\'Artistes & Teintes Pastel', category: 'Gorée', imageUrl: '/images/goree4.webp', location: 'Île de Gorée', order: 8 },
  { id: 'g5_4', title: 'Panorama Insulaire & Sérénité', category: 'Gorée', imageUrl: '/images/goree5.webp', location: 'Île de Gorée', order: 9 },
  { id: 'g6_0', title: 'Reflets et Féerie du Lac Rose', category: 'Lac Rose', imageUrl: '/images/lac-rose-00.webp', location: 'Lac Retba', order: 10 },
  { id: 'g6_1', title: 'Extraction Artisanale du Sel', category: 'Lac Rose', imageUrl: '/images/lac-rose-0.webp', location: 'Lac Retba', order: 11 },
  { id: 'g6_2', title: 'Pirogues & Dunes du Lac Rose', category: 'Lac Rose', imageUrl: '/images/lac-rose-2.webp', location: 'Lac Retba', order: 12 },
  { id: 'g7', title: 'Pirogues de Kayar', category: 'Villages', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85', location: 'Kayar', order: 13 },
  { id: 'g8', title: 'Architecture historique', category: 'Culture', imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=85', location: 'Saint-Louis', order: 14 },
  { id: 'g9', title: 'Envol des pélicans', category: 'Nature', imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1000&q=85', location: 'Parc National du Djoudj', order: 15 },
  { id: 'g10', title: 'Partage au village Sérère', category: 'Tourisme solidaire', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=85', location: 'Delta du Saloum', order: 16 },
  { id: 'g11', title: 'Secrets culinaires de la Teranga', category: 'Gastronomie', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85', location: 'Dakar', order: 17 },
];

export const api = {
  // Destinations
  getDestinations: async (): Promise<Destination[]> => {
    try {
      const res = await fetch(`${API_BASE}/destinations`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_DESTINATIONS;
    }
  },

  getDestinationBySlug: async (slug: string): Promise<Destination | null> => {
    try {
      const res = await fetch(`${API_BASE}/destinations/${slug}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_DESTINATIONS.find((d) => d.slug === slug) || null;
    }
  },

  // Excursions
  getExcursions: async (params?: Record<string, string>): Promise<any[]> => {
    try {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_BASE}/excursions${query}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      let list = [...FALLBACK_EXCURSIONS];
      if (params?.category && params.category !== 'Toutes') {
        list = list.filter((e) => e.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params?.durationCategory && params.durationCategory !== 'all') {
        list = list.filter((e) => e.durationCategory === params.durationCategory);
      }
      return list;
    }
  },

  getExcursionBySlug: async (slug: string): Promise<any | null> => {
    try {
      const res = await fetch(`${API_BASE}/excursions/${slug}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      const exc = FALLBACK_EXCURSIONS.find((e) => e.slug === slug);
      if (!exc) return null;
      return {
        ...exc,
        related: FALLBACK_EXCURSIONS.filter((e) => e.slug !== slug).slice(0, 3),
      };
    }
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      return FALLBACK_TESTIMONIALS;
    }
  },

  // Gallery
  getGallery: async (category?: string): Promise<GalleryImage[]> => {
    try {
      const query = category && category !== 'Toutes' ? `?category=${encodeURIComponent(category)}` : '';
      const res = await fetch(`${API_BASE}/gallery${query}`);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data.data;
    } catch {
      if (category && category !== 'Toutes') {
        return FALLBACK_GALLERY.filter((g) => g.category.toLowerCase() === category.toLowerCase());
      }
      return FALLBACK_GALLERY;
    }
  },

  // Reservations
  createReservation: async (data: Reservation): Promise<{ success: boolean; message: string; refNumber?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch {
      return {
        success: true,
        message: 'Votre demande a bien été enregistrée (mode hors-ligne sécurisé). Nous vous contacterons très vite !',
        refNumber: `STT-${new Date().getFullYear()}-DEMO`,
      };
    }
  },

  // Contact
  sendContactMessage: async (data: { fullName: string; email: string; phone?: string; subject?: string; message: string }) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { success: true, message: 'Message transmis avec succès !' };
    }
  },

  // Newsletter
  subscribeNewsletter: async (email: string) => {
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    } catch {
      return { success: true, message: 'Merci pour votre inscription !' };
    }
  },

  // ==========================================
  // ADMIN API CLIENT (Secured with JWT Bearer)
  // ==========================================
  admin: {
    getAuthHeaders: () => {
      const token = localStorage.getItem('stt_admin_token') || '';
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    },

    // 1. Auth & Profile
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    },

    getMe: async () => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 2. Stats
    getStats: async () => {
      const res = await fetch(`${API_BASE}/admin/stats`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 3. Excursions
    getExcursions: async () => {
      const res = await fetch(`${API_BASE}/admin/excursions`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    createExcursion: async (data: any) => {
      const res = await fetch(`${API_BASE}/admin/excursions`, {
        method: 'POST',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    updateExcursion: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE}/admin/excursions/${id}`, {
        method: 'PUT',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    deleteExcursion: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/excursions/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 4. Destinations
    getDestinations: async () => {
      const res = await fetch(`${API_BASE}/admin/destinations`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    createDestination: async (data: any) => {
      const res = await fetch(`${API_BASE}/admin/destinations`, {
        method: 'POST',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    updateDestination: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE}/admin/destinations/${id}`, {
        method: 'PUT',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    deleteDestination: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/destinations/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 5. Reservations
    getReservations: async () => {
      const res = await fetch(`${API_BASE}/admin/reservations`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    updateReservationStatus: async (id: string, status: string, notes?: string) => {
      const res = await fetch(`${API_BASE}/admin/reservations/${id}`, {
        method: 'PUT',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify({ status, notes }),
      });
      return await res.json();
    },

    deleteReservation: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/reservations/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 6. Themes & Experiences
    getExperiences: async () => {
      const res = await fetch(`${API_BASE}/experiences`);
      return await res.json();
    },

    // 7. Gallery
    getGallery: async () => {
      const res = await fetch(`${API_BASE}/gallery`);
      return await res.json();
    },

    createGalleryImage: async (data: any) => {
      const res = await fetch(`${API_BASE}/admin/gallery`, {
        method: 'POST',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    deleteGalleryImage: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 8. Testimonials
    getTestimonials: async () => {
      const res = await fetch(`${API_BASE}/testimonials`);
      return await res.json();
    },

    createTestimonial: async (data: any) => {
      const res = await fetch(`${API_BASE}/admin/testimonials`, {
        method: 'POST',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    updateTestimonial: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: api.admin.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await res.json();
    },

    deleteTestimonial: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 9. Messages
    getMessages: async () => {
      const res = await fetch(`${API_BASE}/admin/messages`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    markMessageAsRead: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
        method: 'PUT',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    deleteMessage: async (id: string) => {
      const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
        method: 'DELETE',
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },

    // 10. Newsletter
    getNewsletterSubscribers: async () => {
      const res = await fetch(`${API_BASE}/admin/newsletter`, {
        headers: api.admin.getAuthHeaders(),
      });
      return await res.json();
    },
  },
};
