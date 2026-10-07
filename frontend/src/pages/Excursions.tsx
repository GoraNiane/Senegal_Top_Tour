import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, Filter, Search, Sparkles, X, MapPin } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { ExcursionCard } from '../components/ExcursionCard';
import { PageTransition } from '../components/PageTransition';
import { detailedExcursions, DetailedExcursion, FILTER_OPTIONS, FilterOption } from '../data/excursionsData';

export const Excursions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = (searchParams.get('filter') || searchParams.get('category') || 'Toutes') as string;

  const [activeFilter, setActiveFilter] = useState<string>(() => {
    const valid = FILTER_OPTIONS.find((f) => f.toLowerCase() === filterFromUrl.toLowerCase());
    return valid || 'Toutes';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize state if URL query param changes
  useEffect(() => {
    const param = searchParams.get('filter') || searchParams.get('category');
    if (param) {
      const match = FILTER_OPTIONS.find((f) => f.toLowerCase() === param.toLowerCase());
      if (match) {
        setActiveFilter(match);
      }
    }
  }, [searchParams]);

  // Set page SEO title and meta description
  useEffect(() => {
    document.title = 'EXCURSIONS & CIRCUITS | Senegal Top Tour';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Découvrez les incontournables du Sénégal depuis Dakar : Île de Gorée, Lac Rose, Tour de ville, Kayar, Noflaye et Joal-Fadiouth avec guides officiels certifiés.'
      );
    }
  }, []);

  const handleSelectFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'Toutes') {
      searchParams.delete('filter');
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ filter });
    }
  };

  const handleResetFilters = () => {
    setActiveFilter('Toutes');
    setSearchQuery('');
    setSearchParams({});
  };

  // Real, comprehensive filtering logic
  const filteredExcursions = useMemo(() => {
    return detailedExcursions.filter((exc: DetailedExcursion) => {
      // 1. Tag & Category filter matching
      if (activeFilter !== 'Toutes') {
        const filterLower = activeFilter.toLowerCase();
        
        let matchFilter = false;

        // Direct tag match in filterTags
        if (exc.filterTags.some((tag) => tag.toLowerCase() === filterLower)) {
          matchFilter = true;
        }
        // Direct category match
        else if (exc.category.toLowerCase() === filterLower) {
          matchFilter = true;
        }
        // Duration specific matches
        else if (activeFilter === 'Demi-journée' && exc.durationCategory === 'half_day') {
          matchFilter = true;
        } else if (activeFilter === 'Journée' && exc.durationCategory === 'full_day') {
          matchFilter = true;
        }
        // Destination specific matches
        else if (exc.name.toLowerCase().includes(filterLower) || exc.departureCity.toLowerCase().includes(filterLower)) {
          matchFilter = true;
        }

        if (!matchFilter) return false;
      }

      // 2. Keyword Search Query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = exc.name.toLowerCase().includes(q);
        const matchSubtitle = exc.subtitle.toLowerCase().includes(q);
        const matchDesc = exc.description.toLowerCase().includes(q);
        const matchTags = exc.filterTags.some((t) => t.toLowerCase().includes(q));
        const matchSchedule = exc.schedule.toLowerCase().includes(q);

        if (!matchName && !matchSubtitle && !matchDesc && !matchTags && !matchSchedule) {
          return false;
        }
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <PageTransition>
      <div className="pt-28 sm:pt-36 pb-28 bg-[#F7F4EE] min-h-screen text-[#151515]">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionTitle
            badge="Catalogue Officiel"
            title="EXCURSIONS & CIRCUITS"
            subtitle="« Découvrez les incontournables du Sénégal depuis Dakar. »"
            align="center"
          />

          {/* Search & Filter Control Bar */}
          <div className="bg-white rounded-[28px] p-5 sm:p-7 border border-[#C7A77A]/30 shadow-md mt-8 space-y-5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#C7A77A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par destination, mot-clé (Gorée, Lac Rose, Pêche, Tortues, 4x4)..."
                className="w-full bg-[#F7F4EE]/70 border border-[#C7A77A]/35 rounded-full pl-11 sm:pl-12 pr-10 py-3 text-xs sm:text-sm text-[#151515] placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#173C32]/20 focus:border-[#173C32] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills Bar */}
            <div className="space-y-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#173C32] flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#C99A4A]" />
                  <span>Filtrer les excursions :</span>
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {filteredExcursions.length} résultat{filteredExcursions.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Scrollable / Wrap Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {FILTER_OPTIONS.map((filter) => {
                  const isSelected = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => handleSelectFilter(filter)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#173C32] text-white font-semibold shadow-md ring-2 ring-[#C99A4A]/50 scale-[1.02]'
                          : 'bg-[#F7F4EE] text-neutral-700 hover:bg-[#C7A77A]/25 hover:text-[#173C32]'
                      }`}
                    >
                      {filter === 'Toutes' && <Sparkles className="w-3 h-3 text-[#C99A4A]" />}
                      <span>{filter}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Grid Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Badges & Reset Link */}
          <div className="mb-6 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#A85D3A]" />
              <span>
                Affichage de <strong className="text-[#173C32]">{filteredExcursions.length}</strong> excursion{filteredExcursions.length > 1 ? 's' : ''} disponible{filteredExcursions.length > 1 ? 's' : ''}
              </span>
            </div>

            {(activeFilter !== 'Toutes' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[#A85D3A] hover:text-[#884323] hover:underline font-semibold cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredExcursions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExcursions.map((exc) => (
                <ExcursionCard key={exc.id} excursion={exc} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-[28px] border border-[#C7A77A]/20 p-8 shadow-sm">
              <Compass className="w-14 h-14 text-[#C7A77A] mx-auto mb-4 opacity-60" />
              <h3 className="text-2xl font-serif text-[#173C32] mb-2">
                Aucune excursion ne correspond à ce filtre
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                Nous pouvons composer un itinéraire privatisé et sur mesure selon vos envies et vos dates.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary text-xs cursor-pointer shadow-md"
              >
                Réinitialiser les critères de recherche
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
export default Excursions;
