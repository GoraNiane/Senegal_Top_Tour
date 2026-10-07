import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Check, ArrowRight, Calendar, Users, Wallet, Layers } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Excursion } from '../types';

interface TravelPlannerProps {
  excursions: Excursion[];
}

export const TravelPlanner: React.FC<TravelPlannerProps> = ({ excursions }) => {
  const navigate = useNavigate();

  const [duration, setDuration] = useState<string>('all');
  const [theme, setTheme] = useState<string>('all');
  const [groupSize, setGroupSize] = useState<string>('2');
  const [budget, setBudget] = useState<string>('confort');

  const [filteredResults, setFilteredResults] = useState<Excursion[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const durationOptions = [
    { label: 'Toutes durées', value: 'all' },
    { label: '½ journée', value: 'half_day' },
    { label: '1 journée', value: 'full_day' },
    { label: '2-3 jours', value: 'multi_day' },
    { label: 'Sur mesure', value: 'custom' },
  ];

  const themeOptions = [
    { label: 'Tous thèmes', value: 'all' },
    { label: 'Culture & Histoire', value: 'Culture' },
    { label: 'Nature & Faune', value: 'Nature' },
    { label: 'Aventure & Désert', value: 'Aventure' },
    { label: 'Solidaire & Rencontre', value: 'Solidaire' },
  ];

  const groupOptions = ['1 voyageur', '2 personnes', '3 à 5 personnes', '6 à 10 personnes', 'Groupe 10+'];
  const budgetOptions = ['À définir', 'Essentiel / Découverte', 'Confort & Charme', 'Prestige & Sur Mesure'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    if (duration === 'custom') {
      navigate(`/reservation?duration=Sur%20mesure&theme=${encodeURIComponent(theme)}&group=${encodeURIComponent(groupSize)}&budget=${encodeURIComponent(budget)}`);
      return;
    }

    let results = [...excursions];

    if (duration !== 'all') {
      results = results.filter((e) => e.durationCategory === duration);
    }

    if (theme !== 'all') {
      results = results.filter((e) => e.category.toLowerCase().includes(theme.toLowerCase()));
    }

    setFilteredResults(results);
  };

  const handleCustomTrip = () => {
    navigate(`/reservation?duration=${encodeURIComponent(duration)}&theme=${encodeURIComponent(theme)}&group=${encodeURIComponent(groupSize)}&budget=${encodeURIComponent(budget)}`);
  };

  return (
    <section id="planner" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#173C32] text-white rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        {/* Decorative Golden Ambient Elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C99A4A]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#A85D3A]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionTitle
            badge="Planificateur Sur Mesure"
            title="Quel Sénégal voulez-vous découvrir ?"
            subtitle="Personnalisez vos préférences et trouvez en quelques clics l'expérience qui correspond parfaitement à vos envies de voyage."
            align="center"
            theme="dark"
          />

          {/* Interactive Generator Form */}
          <form onSubmit={handleSearch} className="space-y-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* 1. Durée */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-semibold mb-4">
                  <Calendar className="w-4 h-4 text-[#C99A4A]" />
                  <span>1. Durée du séjour / excursion</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDuration(opt.value)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        duration === opt.value
                          ? 'bg-[#C99A4A] text-[#151515] font-semibold shadow-md'
                          : 'bg-white/10 text-white/85 hover:bg-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Thème */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-semibold mb-4">
                  <Layers className="w-4 h-4 text-[#C99A4A]" />
                  <span>2. Thématique souhaitée</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTheme(opt.value)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        theme === opt.value
                          ? 'bg-[#C99A4A] text-[#151515] font-semibold shadow-md'
                          : 'bg-white/10 text-white/85 hover:bg-white/20'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Nombre de voyageurs */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-semibold mb-4">
                  <Users className="w-4 h-4 text-[#C99A4A]" />
                  <span>3. Nombre de voyageurs</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {groupOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGroupSize(opt)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                        groupSize === opt
                          ? 'bg-[#C99A4A] text-[#151515] font-semibold shadow-md'
                          : 'bg-white/10 text-white/85 hover:bg-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Gamme de budget */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C7A77A] font-semibold mb-4">
                  <Wallet className="w-4 h-4 text-[#C99A4A]" />
                  <span>4. Confort & Budget</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBudget(opt)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                        budget === opt
                          ? 'bg-[#C99A4A] text-[#151515] font-semibold shadow-md'
                          : 'bg-white/10 text-white/85 hover:bg-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto btn-gold px-10 py-4 text-sm uppercase tracking-wider font-semibold rounded-full flex items-center justify-center gap-3 shadow-xl"
              >
                <Compass className="w-4 h-4 text-[#151515]" />
                <span>Rechercher une expérience</span>
              </button>

              <button
                type="button"
                onClick={handleCustomTrip}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C7A77A] text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                Demander un itinéraire 100% sur mesure →
              </button>
            </div>
          </form>

          {/* Results Display */}
          {hasSearched && filteredResults && (
            <div className="mt-12 pt-10 border-t border-white/15 animate-fadeIn">
              <h3 className="text-xl font-serif text-[#C99A4A] mb-6 text-center">
                {filteredResults.length > 0
                  ? `${filteredResults.length} excursion(s) correspondant à vos critères`
                  : 'Aucune excursion standard ne correspond exactement à cette combinaison.'}
              </h3>

              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((exc) => (
                    <div
                      key={exc.id}
                      onClick={() => navigate(`/excursions/${exc.slug}`)}
                      className="bg-white text-[#151515] rounded-2xl overflow-hidden p-4 cursor-pointer hover:scale-103 transition-transform shadow-lg"
                    >
                      <img
                        src={exc.images?.[0]?.url || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80'}
                        alt={exc.name}
                        className="w-full h-36 object-cover rounded-xl mb-3"
                      />
                      <span className="text-[10px] uppercase font-bold text-[#A85D3A]">
                        {exc.category} · {exc.duration}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#173C32] mt-1 mb-2 line-clamp-1">
                        {exc.name}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                        {exc.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs font-semibold text-[#173C32]">
                        <span>Consulter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-white/10 rounded-2xl max-w-xl mx-auto">
                  <p className="text-sm text-white/90 mb-4">
                    Pas d'inquiétude ! Nous concevons votre séjour personnalisé selon vos dates et vos envies précises.
                  </p>
                  <button
                    onClick={handleCustomTrip}
                    className="btn-gold text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-full"
                  >
                    Créer mon voyage sur mesure
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
