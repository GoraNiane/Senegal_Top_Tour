import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t, language } = useLanguage();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await api.subscribeNewsletter(email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#173C32] text-white pt-16 pb-10 border-t border-white/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Col 1: Brand Story & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-sm">
              {t.footer.description || 'Agence touristique d’exception dédiée à la découverte authentique, culturelle et solidaire du Sénégal.'}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C99A4A] block">
                Lettre d’inspiration
              </span>
              <p className="text-[11px] text-white/75 font-light">
                Recevez nos nouveaux itinéraires d'exception et récits de voyage.
              </p>
              {subscribed ? (
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Merci pour votre inscription.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    aria-label="Votre email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 text-white placeholder-white/50 text-xs px-4 py-2.5 rounded-full border border-white/20 focus:outline-none focus:border-[#C99A4A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-[#B8864E] hover:bg-[#a77640] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                  >
                    S'inscrire
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Principale (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A4A] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li>
                <Link to="/" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/excursions" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.excursions}
                </Link>
              </li>
              <li>
                <Link to="/voyages-a-themes" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.themes}
                </Link>
              </li>
              <li>
                <Link to="/tourisme-solidaire" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.solidarity}
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="hover:text-[#C99A4A] transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Excursions Phares (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A4A] block">
              Circuits Phares
            </span>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li>
                <Link to="/excursions/dakar-goree" className="hover:text-[#C99A4A] transition-colors">
                  Dakar & Île de Gorée
                </Link>
              </li>
              <li>
                <Link to="/excursions/lac-rose-retba" className="hover:text-[#C99A4A] transition-colors">
                  Lac Rose & Dunes 4x4
                </Link>
              </li>
              <li>
                <Link to="/excursions/saint-louis-djoudj-3-jours" className="hover:text-[#C99A4A] transition-colors">
                  Saint-Louis & Réserve du Djoudj (3J)
                </Link>
              </li>
              <li>
                <Link to="/excursions/kayar-village-tortues" className="hover:text-[#C99A4A] transition-colors">
                  Kayar & Tortues Géantes
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-[#C99A4A] hover:underline font-medium block pt-1">
                  Créer un voyage sur mesure →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C99A4A] block">
              Contact & Conciergerie
            </span>
            <div className="space-y-2 text-xs text-white/80 font-light leading-relaxed">
              <p className="text-white font-medium">SENEGAL TOP TOUR</p>
              <p>Presqu'île du Cap-Vert, Dakar · Sénégal</p>
              <p>Ligne Directe : <span className="text-[#C99A4A] font-mono">+221 77 884 80 29</span></p>
              <p>E-mail : contact@senegaltoptour.com</p>
              <p className="text-[11px] text-white/60">Ouvert 7j/7 de 8h00 à 20h00 (GMT)</p>
            </div>

            {/* Language Switcher & Social Links */}
            <div className="pt-3 flex items-center gap-4">
              <LanguageSwitcher />

              <div className="flex items-center gap-2.5 text-white/80">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C99A4A] hover:text-[#151515] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C99A4A] hover:text-[#151515] flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Row: Legal Mentions, Copyright & Slogan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-3.5 text-[11px]">
            <p>© 2026 SENEGAL TOP TOUR. {t.common.allRightsReserved}</p>
            <span className="hidden sm:inline text-white/30">•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
            <Link to="/contact" className="hover:text-white transition-colors">CGV</Link>
            <span className="hidden sm:inline text-white/30">•</span>
            <button
              onClick={() => {
                sessionStorage.removeItem('senegal-top-tour-intro-seen');
                window.location.href = '/?intro=true';
              }}
              className="text-[#C99A4A] hover:underline transition-colors cursor-pointer"
              title="Rejouer l'introduction cinématique"
            >
              ✦ Rejouer l'intro
            </button>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#C99A4A]">
            {t.intro.slogan || 'Le Sénégal ne se visite pas. Il se vit.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
