/**
 * SENEGAL TOP TOUR — Module 4/8 Excursions Dataset
 * Données complètes, riches, structurées et prêtes pour future connexion API.
 */

export interface ExcursionStep {
  time?: string;
  title: string;
  description: string;
}

export interface ExcursionImage {
  url: string;
  caption?: string;
  isCover?: boolean;
}

export interface DetailedExcursion {
  id: string;
  slug: string;
  aliases?: string[];
  name: string;
  subtitle: string;
  category: 'Culture' | 'Histoire' | 'Patrimoine' | 'Nature' | 'Mémoire' | 'Aventure';
  filterTags: string[]; // ['Dakar', 'Gorée', 'Kayar', 'Lac Rose', 'Noflaye', 'Joal-Fadiouth', 'Nature', 'Culture', 'Patrimoine', 'Demi-journée', 'Journée']
  durationCategory: 'half_day' | 'full_day' | 'multi_day';
  duration: string;
  schedule: string;
  departTime: string;
  departureCity: string;
  priceNote: string;
  isPopular?: boolean;
  minGroupSize: number;
  maxGroupSize: number;
  description: string;
  fullContent: string;
  itinerary: ExcursionStep[];
  inclusions: string[];
  exclusions: string[];
  practicalInfo: Record<string, string>;
  images: ExcursionImage[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export const FILTER_OPTIONS = [
  'Toutes',
  'Dakar',
  'Gorée',
  'Kayar',
  'Lac Rose',
  'Noflaye',
  'Joal-Fadiouth',
  'Nature',
  'Culture',
  'Patrimoine',
  'Demi-journée',
  'Journée',
] as const;

export type FilterOption = (typeof FILTER_OPTIONS)[number];

export const detailedExcursions: DetailedExcursion[] = [
  {
    id: 'tour-de-ville-dakar',
    slug: 'tour-de-ville-dakar',
    aliases: ['dakar', 'tour-dakar', 'ville-dakar'],
    name: 'Tour de Ville Dakar',
    subtitle: 'Capitale vibrante entre modernité, marchés colorés et Corniche océane',
    category: 'Culture',
    filterTags: ['Dakar', 'Culture', 'Patrimoine', 'Demi-journée'],
    durationCategory: 'half_day',
    duration: '½ Journée',
    schedule: '09h00 – 12h00 ou 13h00 – 18h00',
    departTime: '09h00 ou 13h00',
    departureCity: 'Dakar (Prise en charge hôtel ou résidence)',
    priceNote: 'Prix sur demande',
    isPopular: true,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Découverte panoramique des principaux marchés, quartiers historiques et attractions emblématiques de la capitale sénégalaise.',
    fullContent: `Plongez au cœur de la capitale la plus occidentale du continent africain. Du charme colonial du quartier du Plateau aux ruelles animées de la Médina, cette visite guidée privatisée vous fait découvrir les mille facettes de Dakar.\n\nVous sillonnerez les allées parfumées du Marché Kermel, réputé pour son architecture circulaire en briques rouges et ses étals de fleurs, avant de contempler la majestueuse statue du Monument de la Renaissance Africaine érigée sur les collines des Mamelles, et d’admirer le panorama spectaculaire sur l'océan Atlantique le long de la Corniche Ouest et de la Mosquée de la Divinité.`,
    itinerary: [
      {
        time: '09h00 / 13h00',
        title: 'Prise en charge personnalisée',
        description: 'Accueil par votre guide officiel et départ en véhicule grand confort climatisé depuis votre hôtel à Dakar.',
      },
      {
        time: '09h30 / 13h30',
        title: 'Quartier historique du Plateau & Marché Kermel',
        description: 'Visite de la Place de l’Indépendance, du Palais Présidentiel avec ses gardes rouges, puis flânerie au cœur du marché colonial Kermel.',
      },
      {
        time: '10h45 / 14h45',
        title: 'Monument de la Renaissance Africaine & Collines des Mamelles',
        description: 'Ascension des marches du plus haut monument d’Afrique en bronze et contemplation du panorama à 360° sur toute la presqu’île.',
      },
      {
        time: '11h30 / 16h00',
        title: 'Corniche Ouest & Village artisanal de Soumbédioune',
        description: 'Arrêt face à la Mosquée de la Divinité sur la plage de Ouakam et rencontre avec les sculpteurs sur bois, maroquiniers, bijoutiers et peintres sous verre.',
      },
      {
        time: '12h00 / 18h00',
        title: 'Retour à votre lieu de résidence',
        description: 'Fin de l’excursion et dépose personnalisée à votre hôtel.',
      },
    ],
    inclusions: [
      'Transport climatisé privatisé aller-retour avec chauffeur professionnel',
      'Guide officiel assermenté francophone / anglophone',
      'Droits d’accès aux monuments et sites mentionnés',
      'Bouteille d’eau minérale fraîche par voyageur',
      'Assurance transport incluse',
    ],
    exclusions: [
      'Achats personnels et souvenirs d’artisanat',
      'Boissons et collations non mentionnées',
      'Pourboires discrétionnaires pour le guide et chauffeur',
    ],
    practicalInfo: {
      'Tenue recommandée': 'Vêtements légers en coton, lunettes de soleil et chapeau.',
      'Langues disponibles': 'Français, Anglais, Allemand, Wolof.',
      'Accessibilité': 'Adapté à tous les âges et aux familles.',
      'Lieu de rendez-vous': 'Hall de votre hôtel à Dakar ou Saly.',
    },
    images: [
      { url: '/images/dakar.png', caption: 'Monument de la Renaissance Africaine et vue sur Ouakam', isCover: true },
      { url: '/images/dakar4.png', caption: 'Artisanat local et marché dakarois', isCover: false },
      { url: '/images/dakar5.png', caption: 'Vie urbaine et architecture de la capitale', isCover: false },
      { url: '/images/dakar2.avif', caption: 'Panorama sur la baie et la Corniche de Dakar', isCover: false },
    ],
    relatedSlugs: ['goree', 'dakar-goree', 'lac-rose-retba'],
    seoTitle: 'Tour de Ville Dakar — Excursion Guidée Officielle | Senegal Top Tour',
    seoDescription: 'Visite guidée de Dakar : marchés Kermel et Soumbédioune, Monument de la Renaissance, Corniche et attractions phares avec guide officiel.',
  },
  {
    id: 'goree',
    slug: 'goree',
    aliases: ['ile-de-goree', 'ile-goree', 'maison-des-esclaves'],
    name: 'Île de Gorée',
    subtitle: 'Sanctuaire de mémoire universelle et joyau d’architecture coloniale',
    category: 'Patrimoine',
    filterTags: ['Gorée', 'Patrimoine', 'Culture', 'Demi-journée'],
    durationCategory: 'half_day',
    duration: '½ Journée',
    schedule: '08h30 – 12h00 ou 13h00 – 18h00',
    departTime: '08h30 ou 13h00',
    departureCity: 'Embarcadère de Dakar (Transfert hôtel inclus)',
    priceNote: 'Prix sur demande',
    isPopular: true,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Traversée en chaloupe et visite émouvante de la Maison des Esclaves, du Castel et des ruelles fleuries de l’île classée UNESCO.',
    fullContent: `Classée au Patrimoine Mondial de l'UNESCO dès 1978, l'île de Gorée est un haut lieu d'histoire et de mémoire universelle. Durant plusieurs siècles, elle fut l'un des points névralgiques du commerce transatlantique.\n\nAccompagné par un guide historien officiel, vous visiterez la Maison des Esclaves et sa célèbre « Porte du Non-Retour » s'ouvrant sur l'immensité de l'océan Atlantique. Vous déambulerez ensuite dans la quiétude des ruelles pavées piétonnes, bordées de bougainvilliers éclatants et de bâtisses ocre du XVIIIe siècle, avant de gravir le Castel pour contempler un panorama d'exception sur la baie de Dakar. Déjeuner savoureux de poisson possible sur l'île dans un restaurant face à la mer.`,
    itinerary: [
      {
        time: '08h30 / 13h00',
        title: 'Traversée en chaloupe vers Gorée',
        description: 'Prise en charge à votre hôtel et embarquement à l’embarcadère de Dakar pour une agréable traversée maritime de 20 minutes.',
      },
      {
        time: '09h00 / 13h30',
        title: 'Visite guidée de la Maison des Esclaves',
        description: 'Récit historique poignant par le conservateur officiel et recueillement solennel devant la mythique Porte du Non-Retour.',
      },
      {
        time: '10h15 / 14h45',
        title: 'Musée Historique & Fort d’Estrées',
        description: 'Découverte des collections archéologiques et du riche passé insulaire à travers les siècles.',
      },
      {
        time: '11h00 / 15h45',
        title: 'Flânerie dans les ruelles coloniales & Le Castel',
        description: 'Rencontre avec les artistes peintres sur sable et vue panoramique imprenable sur Dakar depuis le sommet du Castel.',
      },
      {
        time: '12h00 / 18h00',
        title: 'Déjeuner sur place (optionnel) & Retour en chaloupe',
        description: 'Possibilité de déguster un poisson braisé au bord de l’eau puis traversée retour vers Dakar et dépose à votre hôtel.',
      },
    ],
    inclusions: [
      'Transferts terrestres aller-retour hôtel - embarcadère en véhicule climatisé',
      'Billets aller-retour de la chaloupe Dakar-Gorée',
      'Taxe municipale d’accès à l’île',
      'Droits d’entrée à la Maison des Esclaves et aux musées',
      'Visite guidée par un historien officiel assermenté',
    ],
    exclusions: [
      'Déjeuner et boissons (optionnel dans un restaurant en terrasse)',
      'Achats de toiles et artisanat d’art insulaire',
      'Pourboires discrétionnaires',
    ],
    practicalInfo: {
      'Chaussures': 'Chaussures de marche confortables (île piétonne entièrement pavée).',
      'Pièce d’identité': 'Passeport ou CNI indispensable pour l’accès à la chaloupe.',
      'Photographie': 'Autorisée dans toute l’île ; respectueuse dans la Maison des Esclaves.',
      'Restauration': 'Excellents restaurants de poissons frais et terrasses face à la mer sur l’île.',
    },
    images: [
      { url: '/images/goree0.jpg', caption: 'Façade ocre et double escalier de la Maison des Esclaves', isCover: true },
      { url: '/images/goree1.jpg', caption: 'Ruelles fleuries aux bougainvilliers de l’île de Gorée', isCover: false },
      { url: '/images/goree2.jpg', caption: 'Vue panoramique sur l’océan depuis le Castel', isCover: false },
      { url: '/images/goree4.webp', caption: 'Ateliers de peintres et galeries d’art de Gorée', isCover: false },
      { url: '/images/goree5.webp', caption: 'Douceur de vivre et façades pastel insulaires', isCover: false },
    ],
    relatedSlugs: ['dakar-goree', 'tour-de-ville-dakar', 'joal-fadiouth'],
    seoTitle: 'Visite Guidée de l’Île de Gorée — Maison des Esclaves | Senegal Top Tour',
    seoDescription: 'Excursion officielle sur l’Île de Gorée : traversée chaloupe, Maison des Esclaves, Castel et ruelles coloniales classées UNESCO avec guide historien.',
  },
  {
    id: 'dakar-goree',
    slug: 'dakar-goree',
    aliases: ['dakar-et-goree', 'combo-dakar-goree'],
    name: 'Dakar + Gorée',
    subtitle: 'La combinaison incontournable : mémoire insulaire le matin, capitale vibrante l’après-midi',
    category: 'Patrimoine',
    filterTags: ['Dakar', 'Gorée', 'Patrimoine', 'Culture', 'Journée'],
    durationCategory: 'full_day',
    duration: 'Journée',
    schedule: 'Matin : Gorée (08h30 – 12h00) • Après-midi : Dakar (13h30 – 17h30)',
    departTime: '08h30',
    departureCity: 'Dakar (Prise en charge personnalisée hôtel ou résidence)',
    priceNote: 'Prix sur demande',
    isPopular: true,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Une journée complète combinant la traversée matinale de l’île de Gorée et le tour panoramique de Dakar l’après-midi.',
    fullContent: `L’excursion signature par excellence pour découvrir l’âme et l’histoire du Sénégal en une journée complète !\n\nLa matinée est dédiée à l'émotion et à la quiétude de l'île de Gorée (Maison des Esclaves, Porte du Non-Retour, ruelles d’artistes et Castel), suivie d'un déjeuner savoureux face à la mer. L'après-midi, retour sur le continent pour explorer la capitale Dakar : la Place de l'Indépendance, le Palais Présidentiel, le Marché Kermel, le Monument de la Renaissance Africaine et la Corniche Ouest face à l'océan.`,
    itinerary: [
      {
        time: '08h30',
        title: 'Prise en charge à votre hôtel & Traversée chaloupe',
        description: 'Départ matinal en véhicule privatisé vers le port de Dakar et embarquement immédiat pour l’île de Gorée.',
      },
      {
        time: '09h00 – 12h00',
        title: 'Matin : Visite complète de l’Île de Gorée',
        description: 'Visite émouvante de la Maison des Esclaves, passage de la Porte du Non-Retour, découverte du musée historique, ascension du Castel et rencontre avec les artistes locaux.',
      },
      {
        time: '12h15 – 13h30',
        title: 'Déjeuner face à l’océan à Gorée',
        description: 'Pause gastronomique dans un restaurant au bord de l’eau : poissons grillés, thieboudienne et spécialités de la Teranga.',
      },
      {
        time: '13h45 – 17h30',
        title: 'Après-midi : Grand Tour de Dakar',
        description: 'Retour à Dakar et exploration complète : quartier du Plateau, Palais Présidentiel, Marché Kermel, Monument de la Renaissance Africaine et coucher de soleil sur la Corniche Ouest.',
      },
      {
        time: '18h00',
        title: 'Retour à votre hôtel',
        description: 'Fin de cette journée riche en découvertes et dépose personnalisée.',
      },
    ],
    inclusions: [
      'Transport privatisé en véhicule grand confort climatisé toute la journée',
      'Billets aller-retour de la chaloupe Dakar-Gorée',
      'Toutes les taxes insulaires et droits d’entrée aux monuments',
      'Guide officiel accompagnateur certifié durant toute la journée',
      'Bouteilles d’eau minérale fraîche à bord',
    ],
    exclusions: [
      'Déjeuner et boissons (réservable en option)',
      'Dépenses personnelles et souvenirs',
      'Pourboires discrétionnaires',
    ],
    practicalInfo: {
      'Durée': 'Journée complète (environ 9 heures).',
      'Repas': 'Déjeuner de poissons grillés disponible sur les terrasses de Gorée.',
      'Pièce d’identité': 'Obligatoire pour l’embarquement à bord de la chaloupe.',
    },
    images: [
      { url: '/images/hero-goree-sunset.jpg', caption: 'Lumières crépusculaires sur l’Île de Gorée', isCover: true },
      { url: '/images/dakar.png', caption: 'Monument de la Renaissance Africaine à Dakar', isCover: false },
      { url: '/images/goree0.jpg', caption: 'Maison des Esclaves et architecture historique', isCover: false },
      { url: '/images/dakar5.png', caption: 'Marchés et animation du Plateau dakarois', isCover: false },
    ],
    relatedSlugs: ['goree', 'tour-de-ville-dakar', 'lac-rose-retba'],
    seoTitle: 'Circuit Combiné Dakar + Gorée 1 Journée | Senegal Top Tour',
    seoDescription: 'Excursion intégrale 1 journée : Île de Gorée le matin et Grand Tour de Dakar l’après-midi. Transport privatisé et guide officiel inclus.',
  },
  {
    id: 'kayar-peche',
    slug: 'kayar',
    aliases: ['kayar-peche', 'kayar-village-tortues', 'port-kayar'],
    name: 'Kayar — Port de Pêche Traditionnelle',
    subtitle: '« Au rythme de la pêche traditionnelle. »',
    category: 'Culture',
    filterTags: ['Kayar', 'Culture', 'Patrimoine', 'Demi-journée'],
    durationCategory: 'half_day',
    duration: '½ Journée',
    schedule: '08h30 – 13h00 ou 13h00 – 18h00',
    departTime: '08h30 ou 13h00',
    departureCity: 'Dakar (Prise en charge hôtel)',
    priceNote: 'Prix sur demande',
    isPopular: false,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Spectacle saisissant du plus grand port de pêche artisanale du Sénégal et observation des pirogues multicolores.',
    fullContent: `Situé sur la Grande Côte à environ 60 km au nord de Dakar, Kayar est le troisième centre de débarquement de poissons du pays et le symbole vivant de la tradition maritime lébou.\n\nÀ l'heure où les vagues ramènent les pirogues peintes de symboles protecteurs, la plage se transforme en une fourmilière humaine d'une énergie incroyable : porteurs d'eau, écailleurs, négociants et charpentiers réparant les embarcations au bord de l'eau. Une expérience culturelle intense et profondément authentique.`,
    itinerary: [
      {
        time: '08h30 / 13h00',
        title: 'Départ de Dakar vers la Grande Côte',
        description: 'Route en véhicule climatisé à travers la zone maraîchère des Niayes.',
      },
      {
        time: '09h45 / 14h15',
        title: 'Arrivée sur la plage de Kayar & Chantiers navals',
        description: 'Découverte des chantiers de charpente navale où naissent les pirogues en bois sculptées et peintes.',
      },
      {
        time: '10h30 / 15h00',
        title: 'Débarquement des pirogues & Vente à la criée',
        description: 'Spectacle fascinant du retour des marins-pêcheurs bravant les rouleaux et vente à la criée sur le sable chaud.',
      },
      {
        time: '12h00 / 17h00',
        title: 'Ateliers de salage, séchage et fumage traditionnel',
        description: 'Rencontre avec les femmes transformatrices de poisson séché (kethiakh) et découverte des savoir-faire ancestraux.',
      },
      {
        time: '13h00 / 18h00',
        title: 'Retour à Dakar',
        description: 'Trajet retour et arrivée à votre hébergement.',
      },
    ],
    inclusions: [
      'Transport privatisé en véhicule climatisé aller-retour',
      'Guide officiel assermenté expert de la culture côtière',
      'Visite commentée du port, de la criée et des ateliers',
      'Bouteilles d’eau minérale',
    ],
    exclusions: [
      'Achats personnels et souvenirs',
      'Pourboires discrétionnaires',
    ],
    practicalInfo: {
      'Chaussures': 'Sandales de plage ou chaussures ne craignant pas le sable et l’eau.',
      'Photographie': 'Toujours solliciter l’accord avec le sourire aux pêcheurs, facilité par votre guide.',
      'Meilleur moment': 'L’après-midi offre le plus spectaculaire retour de centaines de pirogues.',
    },
    images: [
      { url: '/images/dakar4.png', caption: 'Pirogues multicolores et débarquement à Kayar', isCover: true },
      { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85', caption: 'Pirogues traditionnelles sur le rivage de l’océan' },
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', caption: 'Plage sauvage et écume de la Grande Côte sénégalaise' },
    ],
    relatedSlugs: ['lac-rose-retba', 'village-tortues-noflaye', 'tour-de-ville-dakar'],
    seoTitle: 'Excursion Kayar Port de Pêche Traditionnelle | Senegal Top Tour',
    seoDescription: 'Vivez l’expérience authentique du retour des pirogues de pêche artisanale à Kayar sur la Grande Côte avec guide officiel privatisé.',
  },
  {
    id: 'lac-rose-retba',
    slug: 'lac-rose',
    aliases: ['lac-rose-retba', 'lac-rose', 'retba'],
    name: 'Lac Rose (Retba) & Safari Dunes 4x4',
    subtitle: 'Merveille minérale, flottaison naturelle et pistes mythiques du Paris-Dakar',
    category: 'Nature',
    filterTags: ['Lac Rose', 'Nature', 'Aventure', 'Demi-journée'],
    durationCategory: 'half_day',
    duration: '½ Journée',
    schedule: '08h00 – 13h00 ou 13h00 – 18h00',
    departTime: '08h00 ou 13h00',
    departureCity: 'Dakar (Prise en charge hôtel)',
    priceNote: 'Prix sur demande',
    isPopular: true,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Safari en 4x4 dans les dunes du Paris-Dakar, rencontre des ramasseurs de sel et expérience de flottaison dans les eaux salées.',
    fullContent: `À seulement 35 km au nord-est de Dakar, le Lac Retba — mondialement réputé sous le nom de Lac Rose — est une lagune hypersalée unique au monde. Sa salinité exceptionnelle (jusqu'à 380 g/litre) dépasse même celle de la mer Morte.\n\nVous observerez le travail titanesque des ramasseurs et ramasseuses de sel qui s'induisent de beurre de karité pour protéger leur peau. Puis, vous embarquerez à bord d’un 4x4 tout-terrain pour franchir les impressionnantes dunes de sable qui séparent le lac de l’océan Atlantique, sur les pistes mythiques du rallye Paris-Dakar. Possibilité de vivre une baignade flottante magique sans aucun effort.`,
    itinerary: [
      {
        time: '08h00 / 13h00',
        title: 'Départ de Dakar vers le Lac Retba',
        description: 'Route en véhicule climatisé à travers les paysages sahéliens et les cuvettes maraîchères.',
      },
      {
        time: '09h00 / 14h00',
        title: 'Arrivée sur les berges du Lac Rose',
        description: 'Explication par votre guide du phénomène naturel de la couleur rose et de l’écosystème lagunaire.',
      },
      {
        time: '09h30 / 14h30',
        title: 'Navigation en pirogue & Rencontre des extracteurs de sel',
        description: 'Balade en pirogue traditionnelle sur le lac et observation de l’extraction artisanale du sel au fond de l’eau.',
      },
      {
        time: '10h30 / 15h30',
        title: 'Safari 4x4 dans les dunes & Grande Plage sauvage',
        description: 'Sensations fortes en 4x4 tout-terrain sur les pistes du rallye Paris-Dakar entre massif de dunes et vagues de l’océan.',
      },
      {
        time: '11h45 / 16h45',
        title: 'Baignade et flottaison magique',
        description: 'Expérience surprenante de flottaison dans l’eau salée et rinçage immédiat à l’eau douce disponible.',
      },
      {
        time: '13h00 / 18h00',
        title: 'Retour à Dakar',
        description: 'Arrivée à votre hébergement.',
      },
    ],
    inclusions: [
      'Transport climatisé aller-retour privatisé depuis Dakar',
      'Safari en véhicule 4x4 tout-terrain dans les dunes avec chauffeur professionnel',
      'Balade en pirogue traditionnelle à sel sur le lac',
      'Guide officiel accompagnateur assermenté',
      'Accès aux douches d’eau douce après la baignade',
    ],
    exclusions: [
      'Déjeuner au restaurant panoramique en bord de lac (optionnel)',
      'Achats personnels (artisanat et sel gemme)',
      'Pourboires discrétionnaires',
    ],
    practicalInfo: {
      'À prévoir': 'Maillot de bain, serviette, crème solaire haute protection et lunettes de soleil.',
      'Flottaison': 'Rinçage immédiat à l’eau douce disponible sur place.',
      'Accessibilité': 'Convient à tous les publics et enfants.',
    },
    images: [
      { url: '/images/lac-rose-00.webp', caption: 'Safari 4x4 au sommet des dunes du Lac Rose', isCover: true },
      { url: '/images/lac-rose-0.webp', caption: 'Extraction artisanale du sel sur le Lac Retba', isCover: false },
      { url: '/images/lac-rose-2.webp', caption: 'Collines de sel et reflets sur la lagune', isCover: false },
    ],
    relatedSlugs: ['kayar', 'village-tortues-noflaye', 'tour-de-ville-dakar'],
    seoTitle: 'Excursion Lac Rose & Safari Dunes 4x4 | Senegal Top Tour',
    seoDescription: 'Vivez l’aventure au Lac Rose : safari 4x4 sur les dunes du Paris-Dakar, récolte du sel et flottaison. Excursion guidée privatisée au départ de Dakar.',
  },
  {
    id: 'village-tortues-noflaye',
    slug: 'noflaye',
    aliases: ['village-tortues-noflaye', 'noflaye', 'village-des-tortues'],
    name: 'Village des Tortues de Noflaye',
    subtitle: 'Sanctuaire de préservation des tortues géantes au cœur de la forêt classée',
    category: 'Nature',
    filterTags: ['Noflaye', 'Nature', 'Demi-journée'],
    durationCategory: 'half_day',
    duration: '½ Journée',
    schedule: '09h00 – 13h00 ou 14h00 – 18h00',
    departTime: '09h00 ou 14h00',
    departureCity: 'Dakar (Prise en charge hôtel)',
    priceNote: 'Prix sur demande',
    isPopular: false,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Visite guidée du centre de protection et de repeuplement des tortues géantes d’Afrique (Geochelone Sulcata).',
    fullContent: `Niché dans la fraîcheur végétale de la forêt classée de Noflaye, près de Rufisque, le Village des Tortues est un centre écologique unique au Sénégal consacré à la sauvegarde de la tortue sillonnée (Centrochelys sulcata), la plus grande tortue terrestre du continent africain.\n\nGuidé par des naturalistes passionnés, vous découvrirez les différents enclos : de la couveuse où éclosent les bébés tortues aux espaces des impressionnants spécimens centenaires pesant plus de 100 kg. Une visite pédagogique idéale pour petits et grands, participant directement au programme de réintroduction dans le milieu naturel.`,
    itinerary: [
      {
        time: '09h00 / 14h00',
        title: 'Départ de Dakar vers la forêt de Noflaye',
        description: 'Trajet en véhicule climatisé vers la réserve écologique de Noflaye.',
      },
      {
        time: '09h45 / 14h45',
        title: 'Accueil par les guides naturalistes',
        description: 'Présentation de l’histoire du sanctuaire et des enjeux vitaux de sauvegarde de l’espèce.',
      },
      {
        time: '10h15 / 15h15',
        title: 'Visite des enclos & Nursery',
        description: 'Observation des nouveau-nés dans les couveuses, nourrissage des tortues géantes centenaires et balade sur le sentier botanique ombragé.',
      },
      {
        time: '11h30 / 16h30',
        title: 'Espace sensibilisation & Protection environnementale',
        description: 'Échanges sur les programmes de réintroduction en milieu sahélien naturel.',
      },
      {
        time: '12h30 / 17h30',
        title: 'Retour à Dakar',
        description: 'Fin de la visite et retour à votre hébergement.',
      },
    ],
    inclusions: [
      'Transport climatisé aller-retour privatisé',
      'Droits d’entrée au Village des Tortues de Noflaye',
      'Visite guidée exclusive par les naturalistes du centre',
      'Guide officiel accompagnateur',
      'Bouteille d’eau minérale',
    ],
    exclusions: [
      'Dépenses personnelles et dons bénévoles à l’association de protection',
      'Pourboires',
    ],
    practicalInfo: {
      'Famille': 'Excursion particulièrement recommandée pour les enfants et amoureux de la faune.',
      'Ombrage': 'Sentier entièrement sous canopée forestière agréable et fraîche.',
      'Saison': 'Accessible toute l’année avec le même émerveillement.',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=85', caption: 'Tortue géante sillonnée dans son environnement naturel', isCover: true },
      { url: 'https://images.unsplash.com/photo-1508455858334-95337ba25607?auto=format&fit=crop&w=1200&q=85', caption: 'Sentier botanique ombragé de la forêt classée de Noflaye', isCover: false },
    ],
    relatedSlugs: ['kayar', 'lac-rose', 'tour-de-ville-dakar'],
    seoTitle: 'Visite du Village des Tortues de Noflaye | Senegal Top Tour',
    seoDescription: 'Découvrez les tortues géantes Sulcata au Village des Tortues de Noflaye au Sénégal. Excursion nature et biodiversité pour toute la famille.',
  },
  {
    id: 'joal-fadiouth',
    slug: 'joal-fadiouth',
    aliases: ['joal-fadiouth', 'ile-aux-coquillages', 'fadiouth'],
    name: 'Joal-Fadiouth — L’Île aux Coquillages',
    subtitle: '« Une journée pour s’évader. » — Greniers sur pilotis et concorde des religions',
    category: 'Patrimoine',
    filterTags: ['Joal-Fadiouth', 'Patrimoine', 'Culture', 'Journée'],
    durationCategory: 'full_day',
    duration: 'Journée',
    schedule: 'Excursion à la journée (07h30 – 18h30)',
    departTime: '07h30',
    departureCity: 'Dakar ou Saly (Prise en charge hôtel)',
    priceNote: 'Prix sur demande',
    isPopular: true,
    minGroupSize: 1,
    maxGroupSize: 15,
    description: 'Une journée d’évasion complète à la découverte de l’île aux coquillages de Fadiouth, de son pont de bois et de son cimetière mixte unique.',
    fullContent: `À 115 km au sud de Dakar, sur la Petite Côte, découvrez Joal — village natal du président-poète Léopold Sédar Senghor — et Fadiouth, une île fascinante entièrement constituée de coquilles de mollusques accumulées au fil des siècles.\n\nVous emprunterez le mythique pont en bois de 800 mètres reliant l’île au continent. Sur place, vous contemplerez les célèbres greniers à mil sur pilotis érigés sur l'eau pour parer aux incendies et aux rongeurs, avant de franchir un second pont vers le cimetière marin mixte où reposent chrétiens et musulmans sous les baobabs, exemple universel d'harmonie communautaire. Déjeuner de poissons et fruits de mer face à la lagune.`,
    itinerary: [
      {
        time: '07h30',
        title: 'Départ de Dakar vers la Petite Côte',
        description: 'Route en véhicule climatisé avec halte photo sous les baobabs majestueux.',
      },
      {
        time: '09h45',
        title: 'Arrivée à Joal & Traversée du grand pont en bois',
        description: 'Traversée à pied du spectaculaire pont en bois de 800 mètres au-dessus de la lagune vers l’île de Fadiouth.',
      },
      {
        time: '10h30',
        title: 'Visite guidée de l’Île de Fadiouth',
        description: 'Ruelles tapissées de coquillages blanchis, église Saint-François-Xavier et cases traditionnelles sérères.',
      },
      {
        time: '11h30',
        title: 'Balade en pirogue vers les greniers à mil sur pilotis',
        description: 'Navigation silencieuse à la perche pour approcher les surprenants greniers flottants dressés sur les flots.',
      },
      {
        time: '12h15',
        title: 'Cimetière marin mixte chrétien-musulman',
        description: 'Visite émouvante de la colline de coquillages surplombant la lagune, symbole mondial de concorde et de fraternité religieuse.',
      },
      {
        time: '13h15',
        title: 'Déjeuner de fruits de mer face à la lagune',
        description: 'Dégustation de poissons braisés, crevettes et spécialités locales dans un cadre paisible au bord de l’eau.',
      },
      {
        time: '15h30',
        title: 'Maison familiale de Senghor (Mbind Diogoye)',
        description: 'Découverte du royaume d’enfance de l’illustre poète et premier président du Sénégal.',
      },
      {
        time: '18h30',
        title: 'Retour à Dakar',
        description: 'Arrivée à votre hébergement après une journée d’évasion inoubliable.',
      },
    ],
    inclusions: [
      'Transport climatisé privatisé aller-retour',
      'Balade en pirogue traditionnelle dans la mangrove et greniers à mil',
      'Droits de visite municipale de l’île et des sites historiques',
      'Guide officiel accompagnateur assermenté',
      'Bouteille d’eau minérale',
    ],
    exclusions: [
      'Déjeuner et boissons (réservable en option)',
      'Dépenses personnelles et artisanat',
      'Pourboires discrétionnaires',
    ],
    practicalInfo: {
      'Chaussures': 'Chaussures fermées et confortables (sol composé d’amas de petits coquillages).',
      'Protection solaire': 'Chapeau, crème solaire et lunettes conseillés.',
      'Déjeuner': 'Excellents restaurants de poissons frais et fruits de mer sur place.',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85', caption: 'Pont en bois et île aux coquillages de Fadiouth', isCover: true },
      { url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85', caption: 'Greniers à mil sur pilotis dans la lagune du Saloum', isCover: false },
    ],
    relatedSlugs: ['goree', 'dakar-goree', 'lac-rose'],
    seoTitle: 'Excursion Joal-Fadiouth Île aux Coquillages 1 Journée | Senegal Top Tour',
    seoDescription: 'Partez 1 journée à Joal-Fadiouth : pont de bois de 800m, greniers à mil sur pilotis et cimetière marin mixte. Excursion privatisée avec guide officiel.',
  },
];

// Helper functions for easy consumption and API substitution
export const getAllExcursions = (): DetailedExcursion[] => {
  return detailedExcursions;
};

export const getExcursionBySlug = (slug: string): DetailedExcursion | undefined => {
  const cleanSlug = slug.toLowerCase().trim();
  return detailedExcursions.find(
    (e) =>
      e.slug.toLowerCase() === cleanSlug ||
      (e.aliases && e.aliases.some((a) => a.toLowerCase() === cleanSlug)) ||
      e.id.toLowerCase() === cleanSlug
  );
};

export const getSimilarExcursions = (currentSlug: string, count: number = 3): DetailedExcursion[] => {
  const current = getExcursionBySlug(currentSlug);
  if (!current) return detailedExcursions.slice(0, count);

  // Filter out current excursion
  const others = detailedExcursions.filter((e) => e.id !== current.id && e.slug !== current.slug);

  // If explicit related slugs exist, prioritize them
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const relatedList: DetailedExcursion[] = [];
    current.relatedSlugs.forEach((relSlug) => {
      const found = getExcursionBySlug(relSlug);
      if (found && !relatedList.some((r) => r.id === found.id)) {
        relatedList.push(found);
      }
    });
    if (relatedList.length >= count) return relatedList.slice(0, count);
  }

  // Fallback to matching category or tag
  const matching = others.filter(
    (e) =>
      e.category === current.category ||
      e.filterTags.some((t) => current.filterTags.includes(t))
  );

  const combined = [...matching, ...others.filter((e) => !matching.includes(e))];
  return combined.slice(0, count);
};
