import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AnnouncementTicker } from './AnnouncementTicker';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isTransparent = isHomePage && !isScrolled;

  const dropdownsData: Record<string, any[]> = {
    excursions: language === 'de' ? [
      { name: 'Dakar Stadtrundfahrt', slug: 'tour-de-ville-dakar', duration: '½ Tag', desc: 'Kermel-Markt, Corniche & Monument' },
      { name: 'Dakar + Insel Gorée', slug: 'dakar-goree', duration: '1 Tag', desc: 'Koloniales Erbe & pulsierende Hauptstadt' },
      { name: 'Insel Gorée', slug: 'goree', duration: '½ Tag', desc: 'Sklavenhaus & malerische Gassen' },
      { name: 'Lac Rose / Retba', slug: 'lac-rose-retba', duration: '½ Tag', desc: '4x4 Dünen, Schweben & Salzgewinnung' },
      { name: 'Saint-Louis & Djoudj (3 Tage)', slug: 'saint-louis-djoudj-3-jours', duration: '3 Tage', desc: 'Pferdekutsche & Vogelsafari' },
      { name: 'Kayar & Noflaye Schildkröten', slug: 'kayar-village-tortues', duration: '½ Tag', desc: 'Traditioneller Fischfang & Riesenschildkröten' },
    ] : language === 'en' ? [
      { name: 'Dakar City Tour', slug: 'tour-de-ville-dakar', duration: '½ Day', desc: 'Kermel Market, Corniche & Monument' },
      { name: 'Dakar + Gorée Island', slug: 'dakar-goree', duration: '1 Day', desc: 'Colonial heritage & vibrant capital' },
      { name: 'Gorée Island', slug: 'goree', duration: '½ Day', desc: 'House of Slaves & picturesque streets' },
      { name: 'Pink Lake / Retba', slug: 'lac-rose-retba', duration: '½ Day', desc: '4x4 Dunes, floating & salt harvest' },
      { name: 'Saint-Louis & Djoudj (3 Days)', slug: 'saint-louis-djoudj-3-jours', duration: '3 Days', desc: 'Colonial carriage & bird safari' },
      { name: 'Kayar & Noflaye Turtles', slug: 'kayar-village-tortues', duration: '½ Day', desc: 'Traditional fishing & giant tortoises' },
    ] : [
      { name: 'Tour de Ville Dakar', slug: 'tour-de-ville-dakar', duration: '½ journée', desc: 'Marchés Kermel, Corniche & Monument' },
      { name: 'Dakar + Île de Gorée', slug: 'dakar-goree', duration: '1 journée', desc: 'Mémoire coloniale & capitale vibrante' },
      { name: 'Île de Gorée', slug: 'goree', duration: '½ journée', desc: 'Maison des Esclaves & ruelles fleuries' },
      { name: 'Lac Rose / Retba', slug: 'lac-rose-retba', duration: '½ journée', desc: 'Dunes 4x4, flottaison & ramasseurs de sel' },
      { name: 'Saint-Louis & Djoudj (3 Jours)', slug: 'saint-louis-djoudj-3-jours', duration: '3 jours', desc: 'Calèche coloniale & safari ornithologique' },
      { name: 'Kayar & Tortues Noflaye', slug: 'kayar-village-tortues', duration: '½ journée', desc: 'Grande pêche & tortues géantes' },
    ],
    themes: language === 'de' ? [
      { name: 'Teranga Kochkurs', link: '/voyages-a-themes/cooking-class', desc: 'Vom traditionellen Markt zur Verkostung' },
      { name: 'Austausch unter Kollegen', link: '/voyages-a-themes#rencontres-homologues', desc: 'Austausch zwischen Lehrern, Handwerkern, Bauern' },
      { name: 'Recycling & Upcycling in Dakar', link: '/voyages-a-themes/recyclage', desc: 'Aluminiumguss, Leder- & Holzhandwerk' },
      { name: 'Ökologischer Lehmbau (Banco)', link: '/voyages-a-themes/ecoconstruction', desc: 'Lehmarchitektur & nachhaltige Materialien' },
    ] : language === 'en' ? [
      { name: 'Teranga Cooking Class', link: '/voyages-a-themes/cooking-class', desc: 'From spice market to shared tasting' },
      { name: 'Peer-to-Peer Encounters', link: '/voyages-a-themes#rencontres-homologues', desc: 'Exchanges between teachers, artisans, farmers' },
      { name: 'Recycling & Upcycling Dakar', link: '/voyages-a-themes/recyclage', desc: 'Aluminum casting, leather & wood craft' },
      { name: 'Earth Building & Adobe', link: '/voyages-a-themes/ecoconstruction', desc: 'Sustainable earthen architecture' },
    ] : [
      { name: 'Cooking Class de la Teranga', link: '/voyages-a-themes/cooking-class', desc: 'Du marché traditionnel à la dégustation' },
      { name: 'Rencontres entre homologues', link: '/voyages-a-themes#rencontres-homologues', desc: 'Échanges entre enseignants, artisans, éleveurs' },
      { name: 'Recyclage & Upcycling à Dakar', link: '/voyages-a-themes/recyclage', desc: 'Transformation aluminium, peaux & bois' },
      { name: 'Écoconstruction & Banco', link: '/voyages-a-themes/ecoconstruction', desc: 'Architecture de terre & matériaux durables' },
    ],
    solidarite: language === 'de' ? [
      { name: 'Konzept des integrierten Dorftourismus', link: '/tourisme-solidaire', desc: 'Ein ethischer Ansatz gemeinsam mit den Dörfern' },
      { name: 'Bildung & Buschschulen', link: '/tourisme-solidaire', desc: 'Renovierung von Klassenräumen & Sanitäranlagen' },
      { name: 'Gesundheit & Hygiene', link: '/tourisme-solidaire', desc: 'Direkte Unterstützung ländlicher Krankenstationen' },
    ] : language === 'en' ? [
      { name: 'Integrated Rural Tourism Concept', link: '/tourisme-solidaire', desc: 'An ethical approach built with villages' },
      { name: 'Education & Bush Schools', link: '/tourisme-solidaire', desc: 'Renovating classrooms & sanitation' },
      { name: 'Healthcare & Sanitation', link: '/tourisme-solidaire', desc: 'Direct support to rural clinics' },
    ] : [
      { name: 'Concept du Tourisme Rural Intégré', link: '/tourisme-solidaire', desc: 'Une démarche éthique construite avec les villages' },
      { name: 'Éducation & Écoles de brousse', link: '/tourisme-solidaire', desc: 'Rénovation de classes & latrines' },
      { name: 'Santé & Assainissement', link: '/tourisme-solidaire', desc: 'Soutien aux dispensaires ruraux' },
    ],
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Dynamic Announcement Ticker on Top */}
      <AnnouncementTicker />

      {/* Main Navbar Bar */}
      <div
        className={`transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-3.5 sm:py-4'
            : 'bg-[#151515]/95 backdrop-blur-md text-white py-3 shadow-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo variant="light" size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
          {/* Accueil / Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-[13px] font-normal tracking-wide transition-all duration-200 relative py-1 hover:text-[#C99A4A] ${
                isActive ? 'text-white font-medium after:w-full' : 'text-white/85 hover:text-white after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C99A4A] after:transition-all after:duration-300 hover:after:w-full`
            }
          >
            {t.nav.home}
          </NavLink>

          {/* Excursions with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('excursions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink
              to="/excursions"
              className="text-[13px] font-normal tracking-wide py-1 flex items-center gap-1 text-white/85 hover:text-[#C99A4A] transition-colors"
            >
              <span>{t.nav.excursions}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </NavLink>

            {activeDropdown === 'excursions' && (
              <div className="absolute top-full left-0 w-80 bg-[#1c1c1c] rounded-2xl p-4 shadow-2xl border border-white/10 text-white animate-fadeIn space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99A4A] px-2 pb-1 border-b border-white/10 flex items-center justify-between">
                  <span>{t.nav.ourMainCircuits}</span>
                  <Link to="/excursions" className="text-white/70 hover:text-white">{t.nav.seeAllCircuits}</Link>
                </div>
                {dropdownsData.excursions.map((exc) => (
                  <Link
                    key={exc.slug}
                    to={`/excursions/${exc.slug}`}
                    className="block p-2 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-white group-hover:text-[#C99A4A]">
                        {exc.name}
                      </span>
                      <span className="text-[10px] text-[#C7A77A] font-mono">{exc.duration}</span>
                    </div>
                    <p className="text-[11px] text-white/60 truncate mt-0.5">{exc.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Voyages à thèmes / Themes with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('themes')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink
              to="/voyages-a-themes"
              className="text-[13px] font-normal tracking-wide py-1 flex items-center gap-1 text-white/85 hover:text-[#C99A4A] transition-colors"
            >
              <span>{t.nav.themes}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </NavLink>

            {activeDropdown === 'themes' && (
              <div className="absolute top-full left-0 w-72 bg-[#1c1c1c] rounded-2xl p-4 shadow-2xl border border-white/10 text-white animate-fadeIn space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99A4A] px-2 pb-1 border-b border-white/10">
                  {t.nav.ourThemes}
                </div>
                {dropdownsData.themes.map((th, i) => (
                  <Link
                    key={i}
                    to={th.link}
                    className="block p-2 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <span className="text-xs font-serif font-bold text-white group-hover:text-[#C99A4A] block">
                      {th.name}
                    </span>
                    <p className="text-[11px] text-white/60 truncate mt-0.5">{th.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tourisme solidaire with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('solidarite')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink
              to="/tourisme-solidaire"
              className="text-[13px] font-normal tracking-wide py-1 flex items-center gap-1 text-white/85 hover:text-[#C99A4A] transition-colors"
            >
              <span>{t.nav.solidarity}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </NavLink>

            {activeDropdown === 'solidarite' && (
              <div className="absolute top-full left-0 w-72 bg-[#1c1c1c] rounded-2xl p-4 shadow-2xl border border-white/10 text-white animate-fadeIn space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99A4A] px-2 pb-1 border-b border-white/10">
                  {t.nav.ourSolidarity}
                </div>
                {dropdownsData.solidarite.map((sol, i) => (
                  <Link
                    key={i}
                    to={sol.link}
                    className="block p-2 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <span className="text-xs font-serif font-bold text-white group-hover:text-[#C99A4A] block">
                      {sol.name}
                    </span>
                    <p className="text-[11px] text-white/60 truncate mt-0.5">{sol.desc}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* À propos / About */}
          <NavLink
            to="/a-propos"
            className={({ isActive }) =>
              `text-[13px] font-normal tracking-wide transition-all duration-200 relative py-1 hover:text-[#C99A4A] ${
                isActive ? 'text-white font-medium after:w-full' : 'text-white/85 hover:text-white after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C99A4A] after:transition-all after:duration-300 hover:after:w-full`
            }
          >
            {t.nav.about}
          </NavLink>

          {/* Galerie */}
          <NavLink
            to="/galerie"
            className={({ isActive }) =>
              `text-[13px] font-normal tracking-wide transition-all duration-200 relative py-1 hover:text-[#C99A4A] ${
                isActive ? 'text-white font-medium after:w-full' : 'text-white/85 hover:text-white after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C99A4A] after:transition-all after:duration-300 hover:after:w-full`
            }
          >
            {t.nav.gallery}
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-[13px] font-normal tracking-wide transition-all duration-200 relative py-1 hover:text-[#C99A4A] ${
                isActive ? 'text-white font-medium after:w-full' : 'text-white/85 hover:text-white after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C99A4A] after:transition-all after:duration-300 hover:after:w-full`
            }
          >
            {t.nav.contact}
          </NavLink>
        </nav>

        {/* Right Actions: Language Switcher & Booking CTA */}
        <div className="hidden lg:flex items-center gap-3.5">
          {/* FR / EN Switcher */}
          <LanguageSwitcher />

          {/* Booking CTA Button */}
          <Link
            to="/reservation"
            className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-[#B8864E] hover:bg-[#a77640] text-white shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Calendar className="w-3.5 h-3.5 text-white/90" />
            <span>{t.nav.bookStay}</span>
          </Link>
        </div>

        {/* Mobile Toggle & Language */}
        <div className="flex items-center space-x-2.5 lg:hidden">
          <LanguageSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-[92px] sm:top-[98px] bg-[#151515]/98 backdrop-blur-xl z-40 text-white px-6 py-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            {[
              { name: t.nav.home, path: '/' },
              { name: t.nav.excursions, path: '/excursions' },
              { name: t.nav.themes, path: '/voyages-a-themes' },
              { name: t.nav.solidarity, path: '/tourisme-solidaire' },
              { name: t.nav.about, path: '/a-propos' },
              { name: t.nav.gallery, path: '/galerie' },
              { name: t.nav.contact, path: '/contact' },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block text-lg font-serif py-2 border-b border-white/10 transition-colors ${
                    isActive ? 'text-[#C99A4A] pl-2 font-semibold' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-8 space-y-4">
            <Link
              to="/reservation"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#B8864E] text-white font-semibold text-xs shadow-md uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookStay}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
