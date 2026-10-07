/**
 * SENEGAL TOP TOUR — Design System Mock & Showcase Data
 * Contenu authentique valorisant les destinations, circuits, thématiques et l'artisanat du Sénégal.
 */

export const mockExperiences = [
  {
    id: 'dakar-goree',
    title: 'Dakar & Île de Gorée',
    category: 'Histoire & Mémoire',
    destination: 'Dakar · Gorée',
    duration: '1 Journée',
    price: 'Sur devis / 1 à 15 pers.',
    description: 'Une immersion complète entre la vibrante capitale dakaroise, ses marchés colorés et le sanctuaire universel de mémoire sur l’île de Gorée.',
    imageUrl: '/images/goree0.jpg',
    isPopular: true,
    rating: 4.9,
    href: '/excursions/dakar-goree',
  },
  {
    id: 'lac-rose-retba',
    title: 'Lac Rose / Retba en 4x4',
    category: 'Nature & Aventure',
    destination: 'Niayes · Lac Retba',
    duration: '½ Journée',
    price: 'Sur devis / 1 à 15 pers.',
    description: 'Traversée sensationnelle des dunes mythiques du Paris-Dakar, rencontre avec les ramasseurs de sel et flottaison magique dans les eaux salées.',
    imageUrl: '/images/lac-rose-00.webp',
    isPopular: true,
    rating: 4.8,
    href: '/excursions/lac-rose-retba',
  },
  {
    id: 'kayar-tortues',
    title: 'Kayar & Village des Tortues',
    category: 'Artisanat & Faune',
    destination: 'Grande Côte · Noflaye',
    duration: '½ Journée',
    price: 'Sur devis / 1 à 15 pers.',
    description: 'Spectacle saisissant du retour des pirogues multicolores à Kayar et visite de conservation des tortues géantes Sulcata de Noflaye.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    isPopular: false,
    rating: 4.7,
    href: '/excursions/kayar-village-tortues',
  },
];

export const mockLargeCircuit = {
  title: 'Grande Traversée : Saint-Louis, Djoudj & Désert de Lompoul',
  subtitle: 'L’élégance coloniale, le sanctuaire d’oiseaux et la nuit étoilée sous tente mauritanienne',
  category: 'Grand Circuit 3 Jours',
  departureCity: 'Dakar / Saly',
  duration: '3 Jours / 2 Nuits',
  priceNote: 'Sur mesure selon hébergement (Charme ou Luxe)',
  description: 'Un itinéraire d’exception sillonnant le nord du Sénégal : balade en calèche dans l’ancienne capitale coloniale, safari en pirogue au Djoudj (3ème réserve ornithologique mondiale) et bivouac magique dans les dunes ocres de Lompoul.',
  highlights: [
    'Visite historique de Saint-Louis en calèche d’époque',
    'Safari en pirogue au cœur du Parc National du Djoudj',
    'Bivouac de charme dans les dunes de sable de Lompoul',
    'Guide officiel historien et véhicule climatisé privatisé',
  ],
  imageUrl: '/images/dakar4.png',
  rating: 5.0,
  reviewCount: 42,
  href: '/excursions/saint-louis-djoudj-3-jours',
};

export const mockDestinations = [
  {
    name: 'Dakar & Almadies',
    tagline: 'Capitale vibrante, Corniche océane et marchés d’artisanat',
    imageUrl: '/images/dakar.png',
    excursionCount: 4,
    highlightPill: 'Capitale',
  },
  {
    name: 'Île de Gorée',
    tagline: 'Maison des Esclaves, bougainvilliers et ruelles de mémoire',
    imageUrl: '/images/goree1.jpg',
    excursionCount: 2,
    highlightPill: 'Patrimoine UNESCO',
  },
  {
    name: 'Lac Rose / Retba',
    tagline: 'Eaux roses minérales, dunes du Dakar et dunes océanes',
    imageUrl: '/images/lac-rose-0.webp',
    excursionCount: 3,
    highlightPill: 'Aventure 4x4',
  },
  {
    name: 'Delta du Saloum',
    tagline: 'Labyrinthe de mangroves, îles sérères et écotourisme solidaire',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    excursionCount: 5,
    highlightPill: 'Sanctuaire Écologique',
  },
];

export const mockArticles = [
  {
    title: 'La Teranga Sénégalaise : Bien plus qu’une hospitalité, une philosophie de vie',
    excerpt: 'Comprendre l’art de recevoir au Sénégal, du partage du grand bol de Thiéboudienne aux coutumes du thé Ataya sous le manguier.',
    category: 'Culture & Art de Vivre',
    date: 'Avril 2026',
    readTime: '5 min',
    author: 'Amadou Fall, Guide Spécialiste',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'L’Écoconstruction en Banco et Terre Crue : L’avenir durable de l’habitat au Sénégal',
    excerpt: 'Comment les techniques architecturales ancestrales reviennent au premier plan pour créer des écoles et maisons naturellement fraîches et écologiques.',
    category: 'Écologie & Solidarité',
    date: 'Mars 2026',
    readTime: '6 min',
    author: 'Équipe SENEGAL TOP TOUR',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Guide des Meilleurs Spots Photographiques de l’Île de Gorée',
    excerpt: 'De la falaise du Castel aux façades pastel de la rue Saint-Germain, découvrez les lumières dorées de fin d’après-midi sur l’océan.',
    category: 'Photographie & Voyages',
    date: 'Février 2026',
    readTime: '4 min',
    author: 'Claire Vignaud, Reporter',
    imageUrl: '/images/goree2.jpg',
  },
];

export const mockGalleryItems = [
  {
    id: 1,
    title: 'Ruelles fleuries de Gorée',
    category: 'Patrimoine',
    location: 'Île de Gorée',
    imageUrl: '/images/goree0.jpg',
  },
  {
    id: 2,
    title: 'Reflets dorés sur le Lac Rose',
    category: 'Nature',
    location: 'Lac Retba',
    imageUrl: '/images/lac-rose-2.webp',
  },
  {
    id: 3,
    title: 'Monument de la Renaissance Africaine',
    category: 'Dakar',
    location: 'Ouakam, Dakar',
    imageUrl: '/images/dakar.png',
  },
  {
    id: 4,
    title: 'Pêche artisanale & Pirogues traditionnelles',
    category: 'Artisanat',
    location: 'Kayar',
    imageUrl: '/images/dakar4.png',
  },
];
