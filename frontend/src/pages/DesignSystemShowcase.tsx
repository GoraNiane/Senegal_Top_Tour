import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  Palette,
  Type,
  Layers,
  Layout,
  MousePointer,
  CheckCircle2,
  Search,
  Eye,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Maximize2,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';

// Design System Components
import { Display, H1, H2, H3, H4, Body, Small, Caption } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';

// Cards
import { ExperienceCard } from '../components/cards/ExperienceCard';
import { LargeExperienceCard } from '../components/cards/LargeExperienceCard';
import { DestinationCard } from '../components/cards/DestinationCard';
import { ArticleCard } from '../components/cards/ArticleCard';
import { GalleryCard } from '../components/cards/GalleryCard';

// Tokens & Data
import { colors, typography, borderRadius, shadows } from '../lib/theme';
import {
  mockExperiences,
  mockLargeCircuit,
  mockDestinations,
  mockArticles,
  mockGalleryItems,
} from '../data/designSystemData';
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'colors' | 'typography' | 'buttons' | 'cards' | 'forms' | 'motion' | 'guidelines'
  >('overview');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: '1. Vision & Directives', icon: Compass },
    { id: 'colors', label: '2. Palette & Tokens', icon: Palette },
    { id: 'typography', label: '3. Typographie', icon: Type },
    { id: 'buttons', label: '4. Boutons & Badges', icon: MousePointer },
    { id: 'cards', label: '5. Cartes UI', icon: Layers },
    { id: 'forms', label: '6. Formulaires & Modale', icon: Layout },
    { id: 'motion', label: '7. Motion & Animations', icon: Sparkles },
    { id: 'guidelines', label: '8. Images & Responsive', icon: Smartphone },
  ];

  return (
    <div className="bg-[#F7F4EE] min-h-screen text-[#151515] pt-28 sm:pt-36 pb-28 text-left">
      {/* Top Banner */}
      <Container size="xl" className="mb-12">
        <div className="bg-[#173C32] text-white rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C99A4A]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5" />}>
              MODULE 1/8 — DESIGN SYSTEM OFFICIEL
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              SENEGAL TOP TOUR
            </h1>

            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              Direction Artistique & Système de composants UI de prestige. Conçu pour inspirer l'élégance, l'aventure, l'authenticité et la richesse culturelle du Sénégal à travers une architecture modulaire et réutilisable.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                React 19 + TypeScript + Vite
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                Tailwind CSS + Framer Motion
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A4A]" />
                Lucide React Icons + a11y
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-8 border-b border-[#C7A77A]/25 select-none scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#173C32] text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-[#C7A77A]/15 border border-[#C7A77A]/25'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C99A4A]' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Container>

      {/* Main Tab Content */}
      <Container size="xl">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
            <SectionTitle
              badge="Principes Fondateurs"
              title="Direction Artistique & Identité de Marque"
              subtitle="Une immersion chaleureuse, contemporaine et raffinée dans l'art de vivre sénégalais."
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="white" className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] flex items-center justify-center">
                  <Compass className="w-6 h-6 text-[#C99A4A]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  1. Élégance Éditoriale
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Inspiré des plus beaux magazines de voyage internationaux. Typographie serif majestueuse (Cormorant / Playfair), généreux espaces négatifs et mise en page épurée.
                </p>
              </Card>

              <Card variant="white" className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#A85D3A]/10 text-[#A85D3A] flex items-center justify-center">
                  <Palette className="w-6 h-6 text-[#A85D3A]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  2. Couleurs de la Terre & Océan
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  L'ivoire doux dominant, le vert profond de la mangrove, le sable doré des dunes de Lompoul, la terracotta d'argile et l'or subtil des couchers de soleil sur l'Atlantique.
                </p>
              </Card>

              <Card variant="white" className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#173C32]/10 text-[#173C32] flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-[#C99A4A]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  3. Teranga & Authenticité
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Mise en valeur sincère de l'hospitalité légendaire (Teranga), du tourisme rural intégré, de l'artisanat d'artisan et de l'architecture traditionnelle sans clichés.
                </p>
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 2: COLORS */}
        {activeTab === 'colors' && (
          <div className="space-y-10">
            <SectionTitle
              badge="Palette Chromatique"
              title="Couleurs & Tokens de Design"
              subtitle="Règle d'or : Le blanc cassé / ivoire est la couleur dominante. Le vert profond et l'or sont utilisés avec parcimonie pour préserver un équilibre haut de gamme."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Ivoire */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#F7F4EE] border border-neutral-300 flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-[#151515]">#F7F4EE</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#151515]">Ivoire / Blanc Cassé</h4>
                  <p className="text-xs text-neutral-500 font-light">Fond principal dominant (80% de l'interface)</p>
                </div>
              </div>

              {/* Vert Profond */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#173C32] flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-white">#173C32</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#173C32]">Vert Profond</h4>
                  <p className="text-xs text-neutral-500 font-light">Élégance, nature, navigation & boutons primaires</p>
                </div>
              </div>

              {/* Sable */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#C7A77A] flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-[#151515]">#C7A77A</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#151515]">Sable Doré</h4>
                  <p className="text-xs text-neutral-500 font-light">Bordures délicates, icônes & séparateurs</p>
                </div>
              </div>

              {/* Terracotta */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#A85D3A] flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-white">#A85D3A</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#A85D3A]">Terracotta</h4>
                  <p className="text-xs text-neutral-500 font-light">Terre de latérite, accents chaleureux & sous-titres</p>
                </div>
              </div>

              {/* Or Doux */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#C99A4A] flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-[#151515]">#C99A4A</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#151515]">Or Doux</h4>
                  <p className="text-xs text-neutral-500 font-light">Subtil éclat, badges de prestige & reflets de lumière</p>
                </div>
              </div>

              {/* Noir */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#151515] flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-white">#151515</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#151515]">Noir Intense</h4>
                  <p className="text-xs text-neutral-500 font-light">Typographie contrastée, socles sombres & menus</p>
                </div>
              </div>

              {/* Blanc */}
              <div className="bg-white rounded-2xl p-5 border border-[#C7A77A]/30 shadow-xs space-y-3">
                <div className="h-28 rounded-xl bg-[#FFFFFF] border border-neutral-200 flex items-end p-3">
                  <span className="text-xs font-mono font-bold text-[#151515]">#FFFFFF</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#151515]">Blanc Pur</h4>
                  <p className="text-xs text-neutral-500 font-light">Cartes en élévation & contrastes nets</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-10">
            <SectionTitle
              badge="Typographie Éditoriale"
              title="Hiérarchie & Polices de Caractères"
              subtitle="Alliance raffinée entre la tradition typographique des grands récits de voyage (Cormorant / Playfair) et la clarté moderne (Inter / Plus Jakarta Sans)."
              align="left"
            />

            <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#C7A77A]/30 space-y-8 divide-y divide-neutral-100">
              {/* Display */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Display Serif (clamp: 40px - 72px)</span>
                  <span>font-serif font-bold</span>
                </div>
                <Display>Le Sénégal ne se visite pas. Il se vit.</Display>
              </div>

              {/* H1 */}
              <div className="space-y-2 pt-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>H1 (clamp: 32px - 56px)</span>
                  <span>font-serif font-bold</span>
                </div>
                <H1>Circuits d'Exception & Immersion Culturelle</H1>
              </div>

              {/* H2 */}
              <div className="space-y-2 pt-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>H2 (clamp: 28px - 44px)</span>
                  <span>font-serif text-[#173C32]</span>
                </div>
                <H2>L'Île de Gorée & La Grande Côte Sauvage</H2>
              </div>

              {/* H3 */}
              <div className="space-y-2 pt-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>H3 (clamp: 22px - 32px)</span>
                  <span>font-serif text-[#151515]</span>
                </div>
                <H3>Voyage Solidaire & Tourisme Rural Intégré</H3>
              </div>

              {/* H4 */}
              <div className="space-y-2 pt-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>H4 (clamp: 18px - 24px)</span>
                  <span>font-serif text-[#173C32]</span>
                </div>
                <H4>Atelier Culinaire de la Teranga & Marché aux Épices</H4>
              </div>

              {/* Body */}
              <div className="space-y-2 pt-6">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Body (16px)</span>
                  <span>font-sans font-light leading-relaxed</span>
                </div>
                <Body>
                  SENEGAL TOP TOUR conçoit des itinéraires privatifs et sur mesure pour les voyageurs en quête d'authenticité, de confort et d'échanges humains profonds. Chaque étape est minutieusement orchestrée par des guides officiels passionnés par l'histoire et les patrimoines de notre terre.
                </Body>
              </div>

              {/* Small & Caption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <span className="text-xs text-neutral-400 font-mono block">Small (14px)</span>
                  <Small>
                    Inclus : Véhicule climatisé privatisé, guide officiel assermenté, droits d'entrée et traversées en chaloupe.
                  </Small>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-neutral-400 font-mono block">Caption / Surtitre (11px uppercase)</span>
                  <Caption>EXPÉRIENCE SIGNATURE DU SÉNÉGAL</Caption>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUTTONS & BADGES */}
        {activeTab === 'buttons' && (
          <div className="space-y-12">
            <SectionTitle
              badge="Système Interactif"
              title="Boutons & Badges Réutilisables"
              subtitle="Des boutons aux arrondis soignés avec micro-interactions fluides, icônes intégrées et états accessibles."
              align="left"
            />

            {/* Buttons Showcase */}
            <div className="bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                1. Variantes de Boutons
              </h3>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Découvrir l'expérience
                </Button>

                <Button variant="gold" iconRight={<Sparkles className="w-4 h-4" />}>
                  Planifier mon voyage
                </Button>

                <Button variant="secondary" iconRight={<ArrowRight className="w-4 h-4" />}>
                  En savoir plus
                </Button>

                <Button variant="outline">
                  Consulter les tarifs
                </Button>

                <Button variant="ghost">
                  Retour à l'accueil
                </Button>
              </div>

              {/* Button Sizes & Loading */}
              <h4 className="font-serif text-lg font-bold text-[#173C32] pt-4">
                2. Tailles & États Interactifs
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Taille Petite (sm)
                </Button>
                <Button variant="primary" size="md">
                  Taille Standard (md)
                </Button>
                <Button variant="primary" size="lg">
                  Taille Grande (lg)
                </Button>
                <Button
                  variant="gold"
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 1500);
                  }}
                >
                  {buttonLoading ? 'Chargement...' : 'Tester le Loading'}
                </Button>
              </div>
            </div>

            {/* Badges Showcase */}
            <div className="bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                3. Système de Badges & Étiquettes
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="gold">Patrimoine UNESCO</Badge>
                <Badge variant="green">Écotourisme Solidaire</Badge>
                <Badge variant="terracotta">Artisanat Local</Badge>
                <Badge variant="sand">Désert & Dunes</Badge>
                <Badge variant="dark">Circuit 3 Jours</Badge>
                <Badge variant="glass">Vue Panoramique</Badge>
                <Badge variant="outline">Sur Mesure</Badge>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CARDS */}
        {activeTab === 'cards' && (
          <div className="space-y-16">
            <SectionTitle
              badge="Composants de Cartes"
              title="Cartes UI & Présentation Visuelle"
              subtitle="5 types de cartes spécialisées : ExperienceCard, LargeExperienceCard, DestinationCard, ArticleCard, et GalleryCard."
              align="left"
            />

            {/* 1. Large Experience Card */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#A85D3A] block">
                Type A : LargeExperienceCard (Itinéraire d'envergure)
              </span>
              <LargeExperienceCard
                imageUrl={mockLargeCircuit.imageUrl}
                category={mockLargeCircuit.category}
                title={mockLargeCircuit.title}
                subtitle={mockLargeCircuit.subtitle}
                description={mockLargeCircuit.description}
                duration={mockLargeCircuit.duration}
                departureCity={mockLargeCircuit.departureCity}
                highlights={mockLargeCircuit.highlights}
                priceNote={mockLargeCircuit.priceNote}
                rating={mockLargeCircuit.rating}
                reviewCount={mockLargeCircuit.reviewCount}
                href="/excursions/saint-louis-djoudj-3-jours"
                onBookClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* 2. Standard Experience Cards */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#A85D3A] block">
                Type B : ExperienceCard (Excursions standard 3-colonnes)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockExperiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    imageUrl={exp.imageUrl}
                    category={exp.category}
                    title={exp.title}
                    description={exp.description}
                    duration={exp.duration}
                    destination={exp.destination}
                    price={exp.price}
                    rating={exp.rating}
                    isPopular={exp.isPopular}
                    href={exp.href}
                  />
                ))}
              </div>
            </div>

            {/* 3. Destination Cards */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#A85D3A] block">
                Type C : DestinationCard (Aperçu immersif des régions)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockDestinations.map((dest, i) => (
                  <DestinationCard
                    key={i}
                    name={dest.name}
                    subtitle={dest.tagline}
                    imageUrl={dest.imageUrl}
                    excursionCount={dest.excursionCount}
                    highlightPill={dest.highlightPill}
                    href="/excursions"
                  />
                ))}
              </div>
            </div>

            {/* 4. Article Cards */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#A85D3A] block">
                Type D : ArticleCard (Carnets de voyage & Magazine)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockArticles.map((art, i) => (
                  <ArticleCard
                    key={i}
                    title={art.title}
                    excerpt={art.excerpt}
                    imageUrl={art.imageUrl}
                    category={art.category}
                    date={art.date}
                    readTime={art.readTime}
                    author={art.author}
                    href="/voyages-a-themes"
                  />
                ))}
              </div>
            </div>

            {/* 5. Gallery Cards */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#A85D3A] block">
                Type E : GalleryCard (Photographies & Visionneuse tactile)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {mockGalleryItems.map((item) => (
                  <GalleryCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    category={item.category}
                    location={item.location}
                    onClick={() => setSelectedGalleryImg(item.imageUrl)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FORMS & MODAL */}
        {activeTab === 'forms' && (
          <div className="space-y-12">
            <SectionTitle
              badge="Champs & Dialogues"
              title="Formulaires & Composant Modale"
              subtitle="Contrôles de saisie élégants avec labels flottants, icônes, états de validation et modale accessible."
              align="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form elements */}
              <div className="lg:col-span-8 bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  Formulaire Exemple
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nom complet"
                    required
                    placeholder="ex: Jean & Sophie Dupont"
                    icon={<Search className="w-4 h-4" />}
                  />
                  <Input
                    label="Adresse e-mail"
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Destination souhaitée"
                    options={[
                      { value: 'dakar', label: 'Dakar & Almadies' },
                      { value: 'goree', label: 'Île de Gorée' },
                      { value: 'lac-rose', label: 'Lac Rose / Retba' },
                      { value: 'saint-louis', label: 'Saint-Louis & Djoudj' },
                    ]}
                  />
                  <Input
                    label="Date de voyage"
                    type="date"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button variant="primary">
                    Soumettre la demande
                  </Button>
                  <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                    Ouvrir la Modale Démo
                  </Button>
                </div>
              </div>

              {/* Quality & Security Card */}
              <div className="lg:col-span-4 bg-[#173C32] text-white rounded-[28px] p-8 space-y-4">
                <ShieldCheck className="w-8 h-8 text-[#C99A4A]" />
                <h4 className="font-serif text-lg font-bold text-white">
                  Garanties Officielles
                </h4>
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  Tous les formulaires sont dotés d'un assainissement strict, de conformité RGPD et d'un couplage instantané avec la conciergerie WhatsApp.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: MOTION */}
        {activeTab === 'motion' && (
          <div className="space-y-10">
            <SectionTitle
              badge="Animations Framer Motion"
              title="Système de Mouvements & Transitions"
              subtitle="Des transitions fluides et luxueuses créant du rythme sans jamais surcharger l'œil de l'utilisateur."
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="white" className="p-8 space-y-3">
                <span className="text-xs font-mono text-[#A85D3A] font-bold">1. Fade In Up</span>
                <p className="text-xs text-neutral-600 font-light">
                  Apparition progressive avec translation verticale de 28px pour donner de la profondeur à l'arrivée des titres et sections.
                </p>
              </Card>

              <Card variant="white" className="p-8 space-y-3">
                <span className="text-xs font-mono text-[#A85D3A] font-bold">2. Stagger Children</span>
                <p className="text-xs text-neutral-600 font-light">
                  Effet en cascade cadencé à 0.1s entre chaque élément d'une grille de cartes pour une entrée vivante.
                </p>
              </Card>

              <Card variant="white" className="p-8 space-y-3">
                <span className="text-xs font-mono text-[#A85D3A] font-bold">3. Image Zoom Hover</span>
                <p className="text-xs text-neutral-600 font-light">
                  Agrandissement subtil de l'image (scale: 1.07) avec courbe cubique de luxe [0.16, 1, 0.3, 1].
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 8: GUIDELINES & RESPONSIVE */}
        {activeTab === 'guidelines' && (
          <div className="space-y-12">
            <SectionTitle
              badge="Normes Techniques"
              title="Photographies & Ratios Responsifs"
              subtitle="Règles strictes de cadrage, de ratios d'aspect et d'optimisation mobile-first."
              align="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Aspect ratios */}
              <div className="lg:col-span-6 bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  1. Ratios Photographiques Recommandés
                </h3>
                <ul className="space-y-2.5 text-xs text-neutral-700 font-light">
                  <li className="flex items-center justify-between p-2.5 bg-[#F7F4EE] rounded-xl">
                    <span className="font-bold text-[#173C32]">16:9 / 16:11</span>
                    <span className="text-neutral-500">Cartes d'excursions & Circuits</span>
                  </li>
                  <li className="flex items-center justify-between p-2.5 bg-[#F7F4EE] rounded-xl">
                    <span className="font-bold text-[#173C32]">4:5 / 3:4</span>
                    <span className="text-neutral-500">Portraits fondateurs & scènes verticales</span>
                  </li>
                  <li className="flex items-center justify-between p-2.5 bg-[#F7F4EE] rounded-xl">
                    <span className="font-bold text-[#173C32]">1:1 (Carré)</span>
                    <span className="text-neutral-500">Galerie Instagram & Vignettes avis</span>
                  </li>
                </ul>
              </div>

              {/* Breakpoints */}
              <div className="lg:col-span-6 bg-white rounded-[28px] p-8 border border-[#C7A77A]/30 space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#173C32]">
                  2. Breakpoints de Résolution Testés
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F7F4EE] rounded-xl">
                    <div className="flex items-center gap-1.5 font-bold text-[#173C32]">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>320px - 414px</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Mobile First (ex: 390x844)</span>
                  </div>
                  <div className="p-3 bg-[#F7F4EE] rounded-xl">
                    <div className="flex items-center gap-1.5 font-bold text-[#173C32]">
                      <Tablet className="w-3.5 h-3.5" />
                      <span>768px - 1024px</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Tablettes & iPads</span>
                  </div>
                  <div className="p-3 bg-[#F7F4EE] rounded-xl col-span-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#173C32]">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>1280px - 1920px</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Desktops & Écrans Larges Haute Définition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Demo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails de l'Expérience"
      >
        <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
          <p>
            Ceci est un exemple de modale interactive faisant partie intégrante du Design System de <strong>SENEGAL TOP TOUR</strong>. Elle intègre le flou d'arrière-plan, la fermeture par touche Échap et une accessibilité complète.
          </p>
          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Fermer la vue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Lightbox for GalleryCard */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <img
            src={selectedGalleryImg}
            alt="Vue agrandie"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
