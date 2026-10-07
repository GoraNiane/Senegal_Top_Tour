import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FounderAndPlanner: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [duration, setDuration] = useState('all');
  const [theme, setTheme] = useState('all');
  const [groupSize, setGroupSize] = useState('1');
  const [budget, setBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/reservation?duration=${encodeURIComponent(duration)}&theme=${encodeURIComponent(theme)}&group=${encodeURIComponent(groupSize)}&budget=${encodeURIComponent(budget)}`);
  };

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Founder Story (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#C7A77A]/20 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          {/* Founder Photo */}
          <div className="w-full sm:w-48 h-64 sm:h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85"
              alt="Fondateur Senegal Top Tour"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Founder Text */}
          <div className="flex-1 space-y-3 text-left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A85D3A] block">
              {language === 'de' ? 'ÜBER UNS' : language === 'en' ? 'ABOUT US' : 'À PROPOS DE NOUS'}
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#151515] leading-snug">
              {language === 'de' ? 'Eine Vision, ein Engagement' : language === 'en' ? 'A Vision, A Commitment' : 'Une vision, un engagement'}
            </h3>

            <p className="text-xs sm:text-[13px] text-[#151515]/70 font-light leading-relaxed">
              {language === 'de'
                ? 'Aus Leidenschaft für den Senegal und sein reiches Erbe habe ich SENEGAL TOP TOUR gegründet, um eine menschlichere, nachhaltige und solidarische Reisekultur zu teilen.'
                : language === 'en'
                ? 'Passionate about Senegal and its rich cultural heritage, I founded SENEGAL TOP TOUR to share a more humane, sustainable, and solidarity-driven approach to travel.'
                : 'Passionné par le Sénégal et son potentiel, j’ai créé SENEGAL TOP TOUR pour partager une vision du tourisme plus humaine, plus solidaire et plus durable.'}
            </p>

            <div className="pt-1">
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-neutral-300 hover:border-[#151515] text-[#151515] transition-colors"
              >
                <span>{language === 'de' ? 'Unsere Geschichte entdecken' : language === 'en' ? 'Discover our story' : 'Découvrir notre histoire'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Handwritten Signature representation */}
            <div className="pt-2 flex items-center gap-2 text-neutral-500">
              <span className="text-[10px] uppercase tracking-wider">{language === 'de' ? 'Unser Gründer' : language === 'en' ? 'Our Founder' : 'Notre fondateur'}</span>
              <svg className="w-24 h-8 text-[#A85D3A]" viewBox="0 0 120 40" fill="none">
                <path d="M10 28 C30 10 40 35 60 18 C75 5 85 30 110 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M45 22 C65 24 95 18 105 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Travel Planner Card with Baobab Illustration (6 Cols) */}
        <div className="lg:col-span-6 bg-[#EBE7DF] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm flex flex-col justify-between">
          {/* Baobab Silhouette on right */}
          <div className="absolute right-0 bottom-0 w-36 h-48 opacity-25 pointer-events-none">
            <svg viewBox="0 0 100 120" fill="none">
              <path d="M35 120 C35 80 20 60 25 40 C30 20 45 10 50 10 C55 10 70 20 75 40 C80 60 65 80 65 120 Z" fill="#8C7A65" />
              <path d="M25 40 C15 35 10 25 15 15 C20 5 35 10 40 20" stroke="#8C7A65" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M75 40 C85 35 90 25 85 15 C80 5 65 10 60 20" stroke="#8C7A65" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M50 30 C50 15 50 5 50 5" stroke="#8C7A65" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#151515]">
                {language === 'de' ? 'Planen Sie Ihre Reise' : language === 'en' ? 'Plan Your Journey' : 'Planifiez votre voyage'}
              </h3>
              <p className="text-xs text-[#151515]/70 font-light mt-1">
                {language === 'de' ? 'Wählen Sie Ihre Vorlieben und finden Sie das passende Reiseerlebnis.' : language === 'en' ? 'Select your preferences and find the ideal experience for you.' : 'Choisissez vos préférences et trouvez l’expérience qui vous correspond.'}
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Durée */}
                <div className="bg-white rounded-xl px-3.5 py-2 border border-neutral-200 shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">{language === 'de' ? 'Dauer' : language === 'en' ? 'Duration' : 'Durée'}</span>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#151515] font-medium focus:outline-none cursor-pointer py-0.5"
                  >
                    <option value="all">{language === 'de' ? 'Alle Dauer' : language === 'en' ? 'All durations' : 'Toutes les durées'}</option>
                    <option value="half_day">{language === 'de' ? '½ Tag' : language === 'en' ? '½ Day' : '½ journée'}</option>
                    <option value="full_day">{language === 'de' ? '1 ganzer Tag' : language === 'en' ? '1 Full Day' : '1 journée complète'}</option>
                    <option value="multi_day">{language === 'de' ? '2 bis 3 Tage' : language === 'en' ? '2 to 3 Days' : '2 à 3 jours'}</option>
                    <option value="custom">{language === 'de' ? 'Nach Maß' : language === 'en' ? 'Custom Tailored' : 'Sur mesure'}</option>
                  </select>
                </div>

                {/* Thème */}
                <div className="bg-white rounded-xl px-3.5 py-2 border border-neutral-200 shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">{language === 'de' ? 'Thema' : language === 'en' ? 'Theme' : 'Thème'}</span>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#151515] font-medium focus:outline-none cursor-pointer py-0.5"
                  >
                    <option value="all">{language === 'de' ? 'Alle Themen' : language === 'en' ? 'All themes' : 'Tous les thèmes'}</option>
                    <option value="Culture">{language === 'de' ? 'Kultur & Geschichte' : language === 'en' ? 'Culture & History' : 'Culture & Histoire'}</option>
                    <option value="Nature">{language === 'de' ? 'Natur & Tierwelt' : language === 'en' ? 'Nature & Wildlife' : 'Nature & Faune'}</option>
                    <option value="Aventure">{language === 'de' ? 'Abenteuer & Wüste' : language === 'en' ? 'Adventure & Desert' : 'Aventure & Désert'}</option>
                    <option value="Solidaire">{language === 'de' ? 'Solidarischer Tourismus' : language === 'en' ? 'Solidarity Tourism' : 'Tourisme Solidaire'}</option>
                    <option value="Cooking Class">{language === 'de' ? 'Gastronomie' : language === 'en' ? 'Gastronomy' : 'Gastronomie'}</option>
                  </select>
                </div>

                {/* Nombre de personnes */}
                <div className="bg-white rounded-xl px-3.5 py-2 border border-neutral-200 shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">{language === 'de' ? 'Personenanzahl' : language === 'en' ? 'Group Size' : 'Nombre de personnes'}</span>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#151515] font-medium focus:outline-none cursor-pointer py-0.5"
                  >
                    <option value="1">{language === 'de' ? '1 Person' : language === 'en' ? '1 Guest' : '1 personne'}</option>
                    <option value="2">{language === 'de' ? '2 Personen' : language === 'en' ? '2 Guests' : '2 personnes'}</option>
                    <option value="3-5">{language === 'de' ? '3 bis 5 Personen' : language === 'en' ? '3 to 5 Guests' : '3 à 5 personnes'}</option>
                    <option value="6-10">{language === 'de' ? '6 bis 10 Personen' : language === 'en' ? '6 to 10 Guests' : '6 à 10 personnes'}</option>
                    <option value="10+">{language === 'de' ? 'Gruppe 10+' : language === 'en' ? 'Group 10+' : 'Groupe 10+'}</option>
                  </select>
                </div>

                {/* Budget approximatif */}
                <div className="bg-white rounded-xl px-3.5 py-2 border border-neutral-200 shadow-xs">
                  <span className="text-[9px] uppercase font-bold text-neutral-400 block">{language === 'de' ? 'Budget' : language === 'en' ? 'Budget' : 'Budget approximatif'}</span>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#151515] font-medium focus:outline-none cursor-pointer py-0.5"
                  >
                    <option value="all">{language === 'de' ? 'Alle Budgets' : language === 'en' ? 'All budgets' : 'Tous les budgets'}</option>
                    <option value="essentiel">{language === 'de' ? 'Essential / Entdeckung' : language === 'en' ? 'Essential / Discovery' : 'Essentiel / Découverte'}</option>
                    <option value="confort">{language === 'de' ? 'Komfort & Charme' : language === 'en' ? 'Comfort & Charm' : 'Confort & Charme'}</option>
                    <option value="prestige">{language === 'de' ? 'Prestige & Maßgeschneidert' : language === 'en' ? 'Prestige & Bespoke' : 'Prestige & Sur Mesure'}</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full bg-[#173C32] hover:bg-[#132c25] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'de' ? 'Erlebnis suchen' : language === 'en' ? 'Find an Experience' : 'Rechercher une expérience'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
