/**
 * SENEGAL TOP TOUR — Homepage Data
 * Données locales structurées pour la page d'accueil (Module 3/8)
 */

export interface DakarExcursion {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categories?: string[];
  schedule: string;
  description: string;
  imageUrl: string;
  duration: string;
  priceNote: string;
  highlights: string[];
}

export const dakarExcursions: DakarExcursion[] = [
  {
    id: 'tour-de-ville-dakar',
    slug: 'tour-de-ville-dakar',
    title: 'TOUR DE VILLE DE DAKAR',
    subtitle: 'Capitale vibrante entre modernité et traditions',
    category: 'Culture & Découverte',
    categories: ['Culture', 'Histoire', 'Ville'],
    schedule: '09h00 – 12h00 ou 13h00 – 18h00',
    duration: '½ Journée',
    priceNote: 'Sur devis / Véhicule climatisé + Guide',
    description: 'Découverte des principaux marchés (Kermel, Soumbédioune), quartiers historiques (Plateau, Médina), de la Corniche et du Monument de la Renaissance Africaine.',
    imageUrl: '/images/dakar.png',
    highlights: ['Marché Kermel & Marché artisanal', 'Monument de la Renaissance', 'Corniche Ouest & Mosquée de la Divinité'],
  },
  {
    id: 'goree',
    slug: 'goree',
    title: 'ÎLE DE GORÉE',
    subtitle: 'Sanctuaire de mémoire et joyau architectural colonial',
    category: 'Mémoire & Patrimoine',
    categories: ['Mémoire', 'Patrimoine', 'Culture'],
    schedule: '08h30 – 12h00 ou 13h00 – 18h00',
    duration: '½ Journée',
    priceNote: 'Sur devis / Traversée chaloupe incluse',
    description: 'Traversée en chaloupe vers l’île piétonne classée UNESCO : visite émouvante de la Maison des Esclaves, des ateliers d’artistes et des ruelles pastel aux bougainvilliers.',
    imageUrl: '/images/goree0.jpg',
    highlights: ['Maison des Esclaves & Porte du Non-Retour', 'Musée Historique du Fort d’Estrées', 'Flânerie dans les ruelles coloniales'],
  },
  {
    id: 'kayar-village-tortues',
    slug: 'kayar-village-tortues',
    title: 'KAYAR',
    subtitle: '« Au rythme de la pêche traditionnelle. »',
    category: 'Pêche & Artisanat',
    categories: ['Tradition', 'Artisanat', 'Océan'],
    schedule: '08h30 – 13h00 ou 13h00 – 18h00',
    duration: '½ Journée',
    priceNote: 'Sur devis / Guide officiel privatisé',
    description: 'Immersion saisissante dans le premier port de pêche artisanale du pays. Arrivée spectaculaire des centaines de pirogues sculptées et déchargement animé du poisson.',
    imageUrl: '/images/dakar4.png',
    highlights: ['Retour des pirogues multicolores', 'Savoir-faire des charpentiers marins', 'Ambiance authentique du littoral'],
  },
  {
    id: 'lac-rose-retba',
    slug: 'lac-rose-retba',
    title: 'LAC ROSE',
    subtitle: 'Merveille minérale, sel et dunes du Paris-Dakar',
    category: 'Nature & Paysage',
    categories: ['Nature', 'Sel', 'Paysage', 'Culture locale'],
    schedule: '08h00 – 13h00 ou 13h00 – 18h00',
    duration: '½ Journée',
    priceNote: 'Sur devis / Safari 4x4 dunes inclus',
    description: 'Spectacle unique des eaux roses salées, rencontre chaleureuse avec les ramasseurs de sel et traversée exaltante en 4x4 des grandes dunes de sable jusqu’à la plage océane.',
    imageUrl: '/images/lac-rose-00.webp',
    highlights: ['Extraction artisanale du sel', 'Expérience de flottaison naturelle', 'Franchissement des dunes en 4x4'],
  },
  {
    id: 'village-tortues-noflaye',
    slug: 'village-tortues-noflaye',
    title: 'VILLAGE DES TORTUES DE NOFLAYE',
    subtitle: 'Sanctuaire écologique au cœur de la forêt classée',
    category: 'Nature & Biodiversité',
    categories: ['Nature', 'Biodiversité', 'Faune'],
    schedule: '09h00 – 13h00 ou 14h00 – 18h00',
    duration: '½ Journée',
    priceNote: 'Sur devis / Droits d’entrée inclus',
    description: 'Centre de protection et de repeuplement des tortues géantes sillonnées (Geochelone Sulcata), certaines pesant plus de 100 kg, dans un écosystème forestier préservé.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    highlights: ['Nursery et tortues centenaires', 'Sensibilisation à la biodiversité', 'Sentier botanique ombragé'],
  },
];

export const joalFadiouthData = {
  title: 'JOAL-FADIOUTH',
  tagline: '« Une journée pour s’évader. »',
  subtitle: 'L’île aux coquillages, les greniers sur pilotis et la concorde des peuples',
  duration: '1 Journée complète (07h30 – 18h30)',
  departure: 'Départ de Dakar ou Saly',
  description: 'À 115 km au sud de Dakar, découvrez la ville natale du poète Léopold Sédar Senghor et l’île de Fadiouth, bâtie entièrement sur des couches séculaires de coquillages marins. Reliée à la terre ferme par un pont en bois de 800 mètres, l’île abrite des greniers à mil sur pilotis uniques au monde et un émouvant cimetière mixte où reposent chrétiens et musulmans sous les baobabs.',
  highlights: [
    'Traversée du célèbre pont de bois piétonnier de 800m',
    'Visite des greniers à mil flottants sur pilotis',
    'Cimetière mixte chrétien-musulman, symbole mondial de tolérance',
    'Déjeuner de fruits de mer et poissons grillés au bord de l’eau',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85',
  href: '/reservation?excursion=Joal-Fadiouth%20Journée',
};

export const themedTripsTeaser = [
  {
    title: 'Rencontres professionnelles entre homologues',
    desc: 'Échanges confraternels d’égal à égal entre enseignants, éleveurs, artisans et bâtisseurs.',
    icon: 'Users',
    link: '/voyages-a-themes',
  },
  {
    title: 'Cooking Class de la Teranga',
    desc: 'Du marché traditionnel aux épices jusqu’au partage chaleureux du bol de Thiéboudienne.',
    icon: 'ChefHat',
    link: '/voyages-a-themes',
  },
  {
    title: 'Recyclage & Upcycling dakarois',
    desc: 'Ateliers créatifs avec les maîtres sculpteurs, fondeurs d’aluminium et designers d’art.',
    icon: 'Recycle',
    link: '/voyages-a-themes',
  },
  {
    title: 'Écoconstruction & Architecture en Banco',
    desc: 'Techniques ancestrales de terre crue et matériaux durables adaptés au climat.',
    icon: 'Home',
    link: '/voyages-a-themes',
  },
];

export const solidarityImpactPillars = [
  {
    title: 'Concept du Tourisme Rural Intégré',
    desc: 'Une démarche éthique co-construite avec les chefs de village et comités villageois.',
    badge: 'Approche Éthique',
  },
  {
    title: 'Éducation & Écoles de Brousse',
    desc: 'Rénovation de classes, mobilier pédagogique, fournitures scolaires et bibliothèques.',
    badge: 'Avenir des Enfants',
  },
  {
    title: 'Santé & Équipement des Dispensaires',
    desc: 'Appui direct aux cases de santé rurales, kits d’urgence et soutien aux matrones.',
    badge: 'Soins de Proximité',
  },
  {
    title: 'Assainissement & Protection des Eaux',
    desc: 'Blocs de latrines séparées, accès à l’eau potable et préservation des bolongs.',
    badge: 'Environnement',
  },
  {
    title: 'Écoconstruction Communautaire',
    desc: 'Bâtiments collectifs en briques de terre compressée et paille locale, bas carbone.',
    badge: 'Habitat Sain',
  },
];

export const upcomingDestinations = [
  {
    name: 'Saint-Louis',
    desc: 'Ancienne capitale coloniale, balades en calèche et festival international de Jazz.',
    badge: 'Bientôt disponible',
    imageUrl: '/images/dakar5.png',
  },
  {
    name: 'Parc National du Djoudj',
    desc: '3ème réserve ornithologique mondiale, sanctuaire de millions de pélicans et migrateurs.',
    badge: 'Bientôt disponible',
    imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Delta du Sine-Saloum',
    desc: 'Labyrinthe infini de mangroves, pirogues dans les bolongs et villages sérères.',
    badge: 'Bientôt disponible',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Désert de Lompoul',
    desc: 'Grandes dunes de sable ocre du Sahel et nuit magique sous tente mauritanienne étoilée.',
    badge: 'Bientôt disponible',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Kédougou & Pays Bassari',
    desc: 'Cascades de Dindéfelo, monts Fouta Djalon et traditions millénaires Bedik et Bassari.',
    badge: 'Bientôt disponible',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'La Gambie & Fleuve',
    desc: 'Navigation sur le fleuve Gambie, observation des chimpanzés et îles historiques.',
    badge: 'Bientôt disponible',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
];

export const homepageGalleryPreview = [
  {
    id: 1,
    title: 'Façades pastel et ruelles de Gorée',
    category: 'Patrimoine',
    imageUrl: '/images/goree0.jpg',
  },
  {
    id: 2,
    title: 'Dunes dorées du Lac Retba',
    category: 'Aventure',
    imageUrl: '/images/lac-rose-00.webp',
  },
  {
    id: 3,
    title: 'Monument de la Renaissance & Corniche',
    category: 'Dakar',
    imageUrl: '/images/dakar.png',
  },
  {
    id: 4,
    title: 'Retour des pirogues de pêche à Kayar',
    category: 'Artisanat',
    imageUrl: '/images/dakar4.png',
  },
  {
    id: 5,
    title: 'Pêcheurs et oiseaux au coucher du soleil',
    category: 'Océan',
    imageUrl: '/images/goree1.jpg',
  },
  {
    id: 6,
    title: 'Marchés colorés et épices de la Teranga',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
  },
];
