import prisma from './prisma.js';
import { hashPassword } from './utils/password.js';

export const seedDatabase = async () => {
  console.log('🌱 Starting SENEGAL TOP TOUR database seeding...');

  // 1. Create or update Default Admin User
  const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@senegaltoptour.com').toLowerCase();
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'SenegalTopTour2026!';
  const hashedPassword = await hashPassword(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      name: 'Direction Senegal Top Tour',
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      name: 'Direction Senegal Top Tour',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Clear existing records to ensure clean state
  await prisma.itineraryStep.deleteMany({});
  await prisma.excursionImage.deleteMany({});
  await prisma.excursion.deleteMany({});
  await prisma.destination.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.galleryImage.deleteMany({});
  await prisma.testimonial.deleteMany({});

  // 3. SEED PUBLISHED DESTINATIONS (6 Destinations)
  const publishedDestinationsData = [
    {
      name: 'Dakar',
      slug: 'dakar',
      subtitle: 'Capitale océane · Marchés & Culture vivante',
      description: 'Capitale vibrante et effervescente bordée par l’océan Atlantique, Dakar mêle patrimoine colonial, scènes artistiques avant-gardistes, marchés colorés et falaises océaniques.',
      region: 'Presqu’île du Cap-Vert',
      highlights: JSON.stringify(['Monument de la Renaissance', 'Marché Kermel', 'Corniche Ouest', 'Soumbédioune']),
      imageUrl: '/images/dakar.png',
      category: 'Culture',
      status: 'PUBLISHED',
      isFeatured: true,
      order: 1,
    },
    {
      name: 'Île de Gorée',
      slug: 'goree',
      subtitle: 'Mémoire universelle · Ruelles coloniales UNESCO',
      description: 'Île sanctuaire inscrite au Patrimoine Mondial de l’UNESCO, havre piétonnier hors du temps aux façades pastel bougainvillées, portant la mémoire universelle de la Maison des Esclaves.',
      region: 'Baie de Dakar',
      highlights: JSON.stringify(['Maison des Esclaves', 'Porte du Non-Retour', 'Castel', 'Ateliers d’artistes']),
      imageUrl: '/images/goree0.jpg',
      category: 'Patrimoine',
      status: 'PUBLISHED',
      isFeatured: true,
      order: 2,
    },
    {
      name: 'Kayar',
      slug: 'kayar',
      subtitle: 'Pêche traditionnelle · Énergie maritime de la Grande Côte',
      description: 'Le plus spectaculaire port de pêche artisanale du pays : des centaines de pirogues multicolores bravant les rouleaux de l’océan et une criée bouillonnante sur le sable chaud.',
      region: 'Grande Côte',
      highlights: JSON.stringify(['Arrivée des pirogues', 'Criée sur le sable', 'Fumage et salage', 'Charpente navale']),
      imageUrl: '/images/dakar4.png',
      category: 'Culture',
      status: 'PUBLISHED',
      isFeatured: true,
      order: 3,
    },
    {
      name: 'Lac Rose (Retba)',
      slug: 'lac-rose',
      subtitle: 'Merveille minérale · Dunes 4x4 Paris-Dakar & Flottaison',
      description: 'Lagune hypersalée aux teintes roses nichée entre dunes de sable et océan, célèbre pour ses récolteurs de sel et l’arrivée historique du rallye Paris-Dakar.',
      region: 'Grande Côte',
      highlights: JSON.stringify(['Extraction du sel', 'Safari 4x4 dunes', 'Flottaison sans effort', 'Grande plage océane']),
      imageUrl: '/images/lac-rose-00.webp',
      category: 'Nature',
      status: 'PUBLISHED',
      isFeatured: true,
      order: 4,
    },
    {
      name: 'Noflaye',
      slug: 'noflaye',
      subtitle: 'Forêt classée · Sanctuaire des tortues géantes Sulcata',
      description: 'Centre écologique au cœur de la forêt classée consacré à la sauvegarde et à la reproduction de la tortue sillonnée géante (Centrochelys sulcata).',
      region: 'Région de Dakar',
      highlights: JSON.stringify(['Tortues centenaires', 'Nursery', 'Sentier botanique', 'Sensibilisation']),
      imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=85',
      category: 'Nature',
      status: 'PUBLISHED',
      isFeatured: false,
      order: 5,
    },
    {
      name: 'Joal-Fadiouth',
      slug: 'joal-fadiouth',
      subtitle: 'Île aux coquillages · Greniers sur pilotis & Cimetière mixte',
      description: 'Découverte de l’île aux coquillages de Fadiouth reliée par un pont en bois de 800m, de ses greniers sur pilotis en pirogue et de son cimetière marin symbole mondial de concorde.',
      region: 'Petite Côte / Sine-Saloum',
      highlights: JSON.stringify(['Pont de bois 800m', 'Greniers à mil sur pilotis', 'Cimetière marin mixte', 'Maison Senghor']),
      imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=85',
      category: 'Patrimoine',
      status: 'PUBLISHED',
      isFeatured: true,
      order: 6,
    },
  ];

  const createdPublishedDestinations: Record<string, any> = {};
  for (const dest of publishedDestinationsData) {
    const created = await prisma.destination.create({ data: dest });
    createdPublishedDestinations[dest.slug] = created;
  }
  console.log(`✅ Seeded 6 PUBLISHED destinations.`);

  // 4. SEED DRAFT DESTINATIONS (7 Destinations specified by requirement 12)
  const draftDestinationsData = [
    {
      name: 'Saint-Louis',
      slug: 'saint-louis',
      subtitle: 'Ancienne capitale de l’AOF · Calèches & Jazz',
      description: 'Île fluviale classée au Patrimoine Mondial de l’UNESCO, architecture néoclassique créole, pont Faidherbe et quartier historique des pêcheurs de Guet Ndar.',
      region: 'Fleuve Sénégal',
      highlights: JSON.stringify(['Pont Faidherbe', 'Tour en calèche', 'Quartier Guet Ndar', 'Festival de Jazz']),
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=85',
      category: 'Patrimoine',
      status: 'DRAFT',
      isFeatured: false,
      order: 7,
    },
    {
      name: 'Djoudj',
      slug: 'djoudj',
      subtitle: 'Parc National des Oiseaux · Sanctuaire mondial UNESCO',
      description: 'Troisième réserve ornithologique au monde : ballet de millions de pélicans blancs, cormorans et migrateurs paléarctiques en pirogue.',
      region: 'Delta du Fleuve Sénégal',
      highlights: JSON.stringify(['Colonies de pélicans', 'Pirogue éco-guidée', 'Oiseaux migrateurs', 'Faune sauvage']),
      imageUrl: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=800&q=85',
      category: 'Nature',
      status: 'DRAFT',
      isFeatured: false,
      order: 8,
    },
    {
      name: 'Kédougou',
      slug: 'kedougou',
      subtitle: 'Pays des cascades & Monts du Bassari',
      description: 'Terre de relief et de nature sauvage au sud-est du Sénégal, cascades majestueuses de Dindéfélo et forêts denses.',
      region: 'Sénégal Oriental',
      highlights: JSON.stringify(['Cascade de Dindéfélo', 'Randonnées en montagne', 'Fleuve Gambie', 'Faune']),
      imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=85',
      category: 'Aventure',
      status: 'DRAFT',
      isFeatured: false,
      order: 9,
    },
    {
      name: 'Pays Bassari',
      slug: 'pays-bassari',
      subtitle: 'Cultures séculaires Bedik & Bassari UNESCO',
      description: 'Villages perchés dans les collines, traditions initiatiques et paysages culturels uniques classés à l’UNESCO.',
      region: 'Sénégal Oriental',
      highlights: JSON.stringify(['Villages Bedik', 'Traditions initiatiques', 'Randonnées culturelles', 'Artisanat']),
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
      category: 'Culture',
      status: 'DRAFT',
      isFeatured: false,
      order: 10,
    },
    {
      name: 'Gambie',
      slug: 'gambie',
      subtitle: 'Croisières fluviales & immersion le long du fleuve Gambie',
      description: 'Itinéraires transfrontaliers au cœur du corridor écologique du fleuve Gambie, observation de la faune et marchés.',
      region: 'Bassin de la Gambie',
      highlights: JSON.stringify(['Navigation fluviale', 'Cercles mégalithiques', 'Parcs naturels', 'Marchés']),
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=85',
      category: 'Aventure',
      status: 'DRAFT',
      isFeatured: false,
      order: 11,
    },
    {
      name: 'Saloum',
      slug: 'saloum',
      subtitle: 'Labyrinthe de bolongs · Réserve de Biosphère',
      description: 'Paradis d’eau, de mangrove et d’îles coquillières habité par les pêcheurs et cueilleuses d’huîtres Sérères.',
      region: 'Sine Saloum',
      highlights: JSON.stringify(['Navigation dans les bolongs', 'Pêche artisanale', 'Villages insulaires', 'Mangrove']),
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
      category: 'Nature',
      status: 'DRAFT',
      isFeatured: false,
      order: 12,
    },
    {
      name: 'Lompoul',
      slug: 'lompoul',
      subtitle: 'Enclave désertique · Massifs de dunes ocres & Bivouac',
      description: 'Massif de dunes orangées s’élevant face à l’Atlantique, randonnées chamelières et nuits sous les étoiles.',
      region: 'Nord-Ouest',
      highlights: JSON.stringify(['Dunes de sable fin', 'Balade à dos de chameau', 'Nuit sous tente mauritanienne', 'Ciel étoilé']),
      imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=85',
      category: 'Aventure',
      status: 'DRAFT',
      isFeatured: false,
      order: 13,
    },
  ];

  for (const dest of draftDestinationsData) {
    await prisma.destination.create({ data: dest });
  }
  console.log(`✅ Seeded 7 DRAFT destinations.`);

  // 5. SEED PUBLISHED EXCURSIONS (7 Official Excursions)
  const excursionsData = [
    {
      name: 'Tour de Ville Dakar',
      slug: 'tour-de-ville-dakar',
      subtitle: 'Capitale vibrante entre modernité, marchés colorés et Corniche océane',
      description: 'Découverte panoramique des principaux marchés, quartiers historiques et attractions emblématiques de la capitale sénégalaise.',
      fullContent: 'Plongez au cœur de la capitale la plus occidentale du continent africain. Du charme colonial du Plateau aux allées parfumées du Marché Kermel, en passant par le Monument de la Renaissance et la Corniche Ouest.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departTime: '09h00 ou 13h00',
      returnTime: '12h00 ou 18h00',
      departureCity: 'Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify([
        'Transport climatisé privatisé aller-retour',
        'Guide officiel assermenté',
        'Droits d’accès aux monuments',
        'Bouteille d’eau minérale',
      ]),
      exclusions: JSON.stringify(['Achats personnels', 'Pourboires discrétionnaires']),
      practicalInfo: JSON.stringify({
        'Tenue': 'Vêtements légers et confortables',
        'Langues': 'Français, Anglais, Allemand, Wolof',
      }),
      category: 'Culture',
      status: 'PUBLISHED',
      isFeatured: true,
      isPopular: true,
      destinationId: createdPublishedDestinations['dakar']?.id,
      images: [
        { url: '/images/dakar.png', caption: 'Monument de la Renaissance Africaine', isCover: true, order: 1 },
        { url: '/images/dakar4.png', caption: 'Marché Kermel et artisanat', isCover: false, order: 2 },
      ],
      itinerary: [
        { time: '09h00 / 13h00', title: 'Prise en charge à l’hôtel', description: 'Départ en véhicule grand confort climatisé.', order: 1 },
        { time: '09h30 / 13h30', title: 'Quartier du Plateau & Marché Kermel', description: 'Place de l’Indépendance, Palais Présidentiel et marché colonial.', order: 2 },
        { time: '10h45 / 14h45', title: 'Monument de la Renaissance Africaine', description: 'Ascension des marches et panorama sur les Mamelles.', order: 3 },
        { time: '11h30 / 16h00', title: 'Corniche & Village artisanal de Soumbédioune', description: 'Arrêt face à la Mosquée de la Divinité et sculpteurs sur bois.', order: 4 },
        { time: '12h00 / 18h00', title: 'Retour à l’hôtel', description: 'Fin de l’excursion.', order: 5 },
      ],
    },
    {
      name: 'Île de Gorée',
      slug: 'goree',
      subtitle: 'Sanctuaire de mémoire universelle et joyau d’architecture coloniale',
      description: 'Traversée en chaloupe et visite émouvante de la Maison des Esclaves, du Castel et des ruelles fleuries de l’île classée UNESCO.',
      fullContent: 'Classée au Patrimoine Mondial de l’UNESCO, l’île de Gorée est un haut lieu de mémoire universelle. Maison des Esclaves, Porte du Non-Retour, ruelles pavées d’artistes et vue imprenable depuis le Castel.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departTime: '08h30 ou 13h00',
      returnTime: '12h00 ou 18h00',
      departureCity: 'Embarcadère de Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify([
        'Billets aller-retour de la chaloupe Dakar-Gorée',
        'Taxe municipale et entrées aux musées',
        'Guide historien officiel certifié',
      ]),
      exclusions: JSON.stringify(['Déjeuner (optionnel sur l’île)', 'Dépenses personnelles']),
      practicalInfo: JSON.stringify({
        'Chaussures': 'Chaussures de marche confortables',
        'Pièce d’identité': 'Passeport / CNI requis pour l’embarcadère',
      }),
      category: 'Patrimoine',
      status: 'PUBLISHED',
      isFeatured: true,
      isPopular: true,
      destinationId: createdPublishedDestinations['goree']?.id,
      images: [
        { url: '/images/goree0.jpg', caption: 'Maison des Esclaves', isCover: true, order: 1 },
        { url: '/images/goree1.jpg', caption: 'Ruelles fleuries de Gorée', isCover: false, order: 2 },
      ],
      itinerary: [
        { time: '08h30 / 13h00', title: 'Traversée en chaloupe', description: 'Embarquement à l’embarcadère de Dakar.', order: 1 },
        { time: '09h00 / 13h30', title: 'Maison des Esclaves', description: 'Visite guidée et Porte du Non-Retour.', order: 2 },
        { time: '10h30 / 15h00', title: 'Ruelles coloniales & Le Castel', description: 'Rencontre avec les artistes peintres.', order: 3 },
        { time: '12h00 / 18h00', title: 'Retour à Dakar', description: 'Traversée retour et dépose à votre hôtel.', order: 4 },
      ],
    },
    {
      name: 'Dakar + Gorée',
      slug: 'dakar-goree',
      subtitle: 'La combinaison incontournable : mémoire insulaire le matin, capitale vibrante l’après-midi',
      description: 'Une journée complète combinant la traversée matinale de l’île de Gorée et le tour panoramique de Dakar l’après-midi.',
      fullContent: 'L’excursion signature intégrale : recueillement matinal à Gorée avec déjeuner au bord de l’eau, suivi du tour complet de Dakar l’après-midi.',
      duration: 'Journée',
      durationCategory: 'full_day',
      departTime: '08h30',
      returnTime: '17h30',
      departureCity: 'Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify([
        'Transport privatisé toute la journée',
        'Billets de chaloupe Dakar-Gorée',
        'Toutes les entrées aux monuments',
        'Guide officiel permanent',
      ]),
      exclusions: JSON.stringify(['Déjeuner et boissons', 'Pourboires']),
      practicalInfo: JSON.stringify({
        'Durée': 'Journée complète de 8h30 à 17h30',
      }),
      category: 'Patrimoine',
      status: 'PUBLISHED',
      isFeatured: true,
      isPopular: true,
      destinationId: createdPublishedDestinations['goree']?.id,
      images: [
        { url: '/images/hero-goree-sunset.jpg', caption: 'Île de Gorée au crépuscule', isCover: true, order: 1 },
        { url: '/images/dakar.png', caption: 'Dakar et Monument Renaissance', isCover: false, order: 2 },
      ],
      itinerary: [
        { time: '08h30', title: 'Départ & Traversée Gorée', description: 'Prise en charge hôtel et embarquement.', order: 1 },
        { time: '09h00 – 12h00', title: 'Matinée à Gorée', description: 'Maison des Esclaves, musée et ruelles.', order: 2 },
        { time: '12h30 – 14h00', title: 'Déjeuner face à l’océan', description: 'Pause gourmande à Gorée.', order: 3 },
        { time: '14h30 – 17h30', title: 'Grand Tour de Dakar', description: 'Plateau, Marché Kermel, Monument Renaissance et Corniche.', order: 4 },
      ],
    },
    {
      name: 'Kayar — Port de Pêche Traditionnelle',
      slug: 'kayar',
      subtitle: '« Au rythme de la pêche traditionnelle. »',
      description: 'Spectacle saisissant du plus grand port de pêche artisanale du Sénégal et observation des pirogues multicolores.',
      fullContent: 'Immersion au cœur de la tradition maritime lébou à Kayar : retour de centaines de pirogues bravant les rouleaux, criée et transformation artisanale.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departTime: '08h30 ou 13h00',
      returnTime: '13h00 ou 18h00',
      departureCity: 'Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify(['Transport climatisé privatisé', 'Guide officiel assermenté']),
      exclusions: JSON.stringify(['Dépenses personnelles']),
      practicalInfo: JSON.stringify({ 'Chaussures': 'Sandales de plage adaptées' }),
      category: 'Culture',
      status: 'PUBLISHED',
      isFeatured: false,
      isPopular: false,
      destinationId: createdPublishedDestinations['kayar']?.id,
      images: [{ url: '/images/dakar4.png', caption: 'Pirogues de Kayar', isCover: true, order: 1 }],
      itinerary: [
        { time: '08h30 / 13h00', title: 'Départ de Dakar', description: 'Route vers la Grande Côte.', order: 1 },
        { time: '10h00 / 14h30', title: 'Débarquement des pirogues', description: 'Spectacle de la grande pêche et criée.', order: 2 },
        { time: '13h00 / 18h00', title: 'Retour à Dakar', description: 'Arrivée à votre hébergement.', order: 3 },
      ],
    },
    {
      name: 'Lac Rose (Retba) & Safari Dunes 4x4',
      slug: 'lac-rose',
      subtitle: 'Merveille minérale, flottaison naturelle et pistes mythiques du Paris-Dakar',
      description: 'Safari en 4x4 dans les dunes du Paris-Dakar, rencontre des ramasseurs de sel et expérience de flottaison dans les eaux salées.',
      fullContent: 'Lagune hypersalée unique au monde : rencontre avec les extracteurs de sel, raid 4x4 sur les dunes de l’ancien Paris-Dakar et flottaison magique.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departTime: '08h00 ou 13h00',
      returnTime: '13h00 ou 18h00',
      departureCity: 'Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify([
        'Transport climatisé privatisé aller-retour',
        'Safari 4x4 tout-terrain dans les dunes',
        'Pirogue traditionnelle sur le lac',
        'Accès aux douches d’eau douce',
      ]),
      exclusions: JSON.stringify(['Déjeuner (optionnel)', 'Achats personnels']),
      practicalInfo: JSON.stringify({ 'À prévoir': 'Maillot de bain, serviette et crème solaire' }),
      category: 'Nature',
      status: 'PUBLISHED',
      isFeatured: true,
      isPopular: true,
      destinationId: createdPublishedDestinations['lac-rose']?.id,
      images: [
        { url: '/images/lac-rose-00.webp', caption: 'Dunes et 4x4 au Lac Rose', isCover: true, order: 1 },
        { url: '/images/lac-rose-0.webp', caption: 'Récolte du sel au Lac Retba', isCover: false, order: 2 },
      ],
      itinerary: [
        { time: '08h00 / 13h00', title: 'Départ de Dakar', description: 'Route vers le Lac Retba.', order: 1 },
        { time: '09h30 / 14h30', title: 'Pirogue & Ramasseurs de sel', description: 'Navigation et rencontre avec les extracteurs.', order: 2 },
        { time: '10h30 / 15h30', title: 'Safari 4x4 sur les dunes', description: 'Pistes du Paris-Dakar et plage océane.', order: 3 },
        { time: '11h45 / 16h45', title: 'Baignade et flottaison', description: 'Expérience de flottaison et rinçage.', order: 4 },
        { time: '13h00 / 18h00', title: 'Retour à Dakar', description: 'Arrivée à l’hôtel.', order: 5 },
      ],
    },
    {
      name: 'Village des Tortues de Noflaye',
      slug: 'noflaye',
      subtitle: 'Sanctuaire de préservation des tortues géantes au cœur de la forêt classée',
      description: 'Visite guidée du centre de protection et de repeuplement des tortues géantes d’Afrique (Geochelone Sulcata).',
      fullContent: 'Au cœur de la forêt classée de Noflaye, découvrez le sanctuaire de sauvegarde des tortues géantes sillonnées centenaires et participez à la protection de la biodiversité.',
      duration: '½ Journée',
      durationCategory: 'half_day',
      departTime: '09h00 ou 14h00',
      returnTime: '13h00 ou 18h00',
      departureCity: 'Dakar',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify(['Transport privatisé', 'Droits d’entrée au sanctuaire', 'Guide naturaliste']),
      exclusions: JSON.stringify(['Dépenses personnelles']),
      practicalInfo: JSON.stringify({ 'Famille': 'Idéal pour enfants et amoureux de la faune' }),
      category: 'Nature',
      status: 'PUBLISHED',
      isFeatured: false,
      isPopular: false,
      destinationId: createdPublishedDestinations['noflaye']?.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=85', caption: 'Tortues géantes de Noflaye', isCover: true, order: 1 },
      ],
      itinerary: [
        { time: '09h00 / 14h00', title: 'Départ vers Noflaye', description: 'Trajet vers la forêt classée.', order: 1 },
        { time: '10h00 / 15h00', title: 'Visite des enclos & Nursery', description: 'Nourrissement des spécimens centenaires.', order: 2 },
        { time: '12h30 / 17h30', title: 'Retour à Dakar', description: 'Arrivée à l’hôtel.', order: 3 },
      ],
    },
    {
      name: 'Joal-Fadiouth — L’Île aux Coquillages',
      slug: 'joal-fadiouth',
      subtitle: '« Une journée pour s’évader. » — Greniers sur pilotis et concorde des religions',
      description: 'Une journée d’évasion complète à la découverte de l’île aux coquillages de Fadiouth, de son pont de bois et de son cimetière mixte unique.',
      fullContent: 'Pont en bois de 800m, ruelles tapissées de coquillages, balade en pirogue à la perche pour approcher les greniers sur pilotis et cimetière marin mixte sous les baobabs.',
      duration: 'Journée',
      durationCategory: 'full_day',
      departTime: '07h30',
      returnTime: '18h30',
      departureCity: 'Dakar ou Saly',
      priceType: 'on_demand',
      currency: 'EUR',
      priceNote: 'Prix sur demande',
      inclusions: JSON.stringify([
        'Transport privatisé climatisé aller-retour',
        'Balade en pirogue dans la mangrove',
        'Droits de visite municipale de l’île',
        'Guide officiel assermenté',
      ]),
      exclusions: JSON.stringify(['Déjeuner et boissons (optionnel sur place)']),
      practicalInfo: JSON.stringify({ 'Chaussures': 'Chaussures de marche confortables fermées' }),
      category: 'Patrimoine',
      status: 'PUBLISHED',
      isFeatured: true,
      isPopular: true,
      destinationId: createdPublishedDestinations['joal-fadiouth']?.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=85', caption: 'Pont en bois de Joal-Fadiouth', isCover: true, order: 1 },
      ],
      itinerary: [
        { time: '07h30', title: 'Départ de Dakar', description: 'Route vers la Petite Côte.', order: 1 },
        { time: '09h45', title: 'Grand pont en bois de 800m', description: 'Traversée à pied vers l’île.', order: 2 },
        { time: '11h30', title: 'Greniers à mil en pirogue', description: 'Navigation à la perche dans la mangrove.', order: 3 },
        { time: '12h15', title: 'Cimetière marin mixte', description: 'Colline de coquillages et concorde religieuse.', order: 4 },
        { time: '13h15', title: 'Déjeuner de fruits de mer', description: 'Dégustation face à la lagune.', order: 5 },
        { time: '18h30', title: 'Retour à Dakar', description: 'Fin d’une journée inoubliable.', order: 6 },
      ],
    },
  ];

  for (const exc of excursionsData) {
    const { images, itinerary, ...excData } = exc;
    const created = await prisma.excursion.create({
      data: {
        ...excData,
        images: {
          create: images.map((img) => ({
            url: img.url,
            caption: img.caption,
            isCover: img.isCover,
            order: img.order,
          })),
        },
        itinerary: {
          create: itinerary.map((step) => ({
            time: step.time,
            title: step.title,
            description: step.description,
            order: step.order,
          })),
        },
      },
    });
  }
  console.log(`✅ Seeded 7 PUBLISHED excursions with itineraries and images.`);

  // 6. SEED THEME EXPERIENCES
  const experiencesData = [
    {
      title: 'Cooking Class de la Teranga',
      slug: 'cooking-class',
      category: 'Gastronomie',
      description: 'Immersion au marché traditionnel, sélection des épices et préparation du Thiéboudienne avec dégustation partagée.',
      shortDescription: 'Du marché traditionnel à la dégustation du bol familial de la Teranga.',
      highlights: JSON.stringify(['Marché local', 'Sélection des ingrédients', 'Cuisson traditionnelle', 'Dégustation collective']),
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=85',
      ctaText: 'Découvrir la Cooking Class →',
      ctaLink: '/voyages-a-themes/cooking-class',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Rencontres entre homologues',
      slug: 'rencontres-homologues',
      category: 'Échange Professionnel',
      description: 'Dialogue d’égal à égal entre enseignants, éleveurs, artisans et acteurs de l’écoconstruction de différents pays.',
      shortDescription: 'Rencontrer, échanger, apprendre et collaborer avec vos pairs au Sénégal.',
      highlights: JSON.stringify(['Enseignants', 'Éleveurs', 'Maîtres Artisans', 'Bâtisseurs en terre']),
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=85',
      ctaText: 'Explorer les échanges →',
      ctaLink: '/voyages-a-themes#rencontres-homologues',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Recyclage & Upcycling Créatif',
      slug: 'recyclage',
      category: 'Écologie & Artisanat',
      description: 'Transformation de l’aluminium en marmites, bois de pirogues marines en mobilier, peaux et cuir à Dakar.',
      shortDescription: 'L’ingéniosité sans pareille des maîtres artisans du recyclage à Dakar.',
      highlights: JSON.stringify(['Fonderies d’aluminium', 'Bois de pirogues', 'Peaux & cuir', 'Économie circulaire']),
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
      ctaText: 'Découvrir les ateliers →',
      ctaLink: '/voyages-a-themes/recyclage',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Écoconstruction & Banco',
      slug: 'ecoconstruction',
      category: 'Habitat Durable',
      description: 'Architecture en terre crue, argile, banco et briques compressées adaptées au climat sahélien.',
      shortDescription: 'Bâtir avec la terre, le soleil et le vent pour un habitat sain et durable.',
      highlights: JSON.stringify(['Inertie de l’argile', 'Banco traditionnel', 'Briques BTC', 'Climat bioclimatique']),
      imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
      ctaText: 'Explorer l’écoconstruction →',
      ctaLink: '/voyages-a-themes/ecoconstruction',
      isFeatured: true,
      order: 4,
    },
  ];

  for (const exp of experiencesData) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ Seeded 4 Theme Experiences.`);

  // 7. SEED GALLERY & TESTIMONIALS
  const galleryImagesData = [
    { title: 'Monument de la Renaissance', category: 'Dakar', imageUrl: '/images/dakar.png', location: 'Dakar', order: 1 },
    { title: 'Maison des Esclaves', category: 'Gorée', imageUrl: '/images/goree0.jpg', location: 'Île de Gorée', order: 2 },
    { title: 'Extraction du sel', category: 'Lac Rose', imageUrl: '/images/lac-rose-00.webp', location: 'Lac Retba', order: 3 },
    { title: 'Pirogues multicolores', category: 'Kayar', imageUrl: '/images/dakar4.png', location: 'Kayar', order: 4 },
    { title: 'Pont de bois de Fadiouth', category: 'Patrimoine', imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=85', location: 'Joal-Fadiouth', order: 5 },
  ];

  for (const g of galleryImagesData) {
    await prisma.galleryImage.create({ data: g });
  }

  const testimonialsData = [
    {
      fullName: 'Sophie & Marc Delattre',
      country: 'France',
      rating: 5,
      comment: 'Notre journée Gorée et Dakar a été un émerveillement absolu. Organisation parfaite et guide officiel d’une culture remarquable.',
      tourName: 'Dakar + Gorée',
      isPublished: true,
    },
    {
      fullName: 'Jean-Pierre Meyer',
      country: 'Suisse',
      rating: 5,
      comment: 'L’immersion à Joal-Fadiouth restera gravée dans notre mémoire. Senegal Top Tour sait transmettre l’authenticité avec élégance.',
      tourName: 'Joal-Fadiouth',
      isPublished: true,
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ Seeded Gallery & Testimonials.`);

  console.log('🎉 SENEGAL TOP TOUR Database seeding completed successfully!');
};

// Auto-execute if run directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv.includes('--run')) {
  seedDatabase()
    .catch((e) => {
      console.error('❌ Error during seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
