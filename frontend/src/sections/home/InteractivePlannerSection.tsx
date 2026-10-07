import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Compass, ArrowRight, Check } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Badge } from '../../components/ui/Badge';

export const InteractivePlannerSection: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('Culture');
  const [selectedDuration, setSelectedDuration] = useState<string>('Demi-journée');

  const themes = [
    { id: 'Culture', label: 'Culture & Coutumes', desc: 'Marchés, musique, artisanat et traditions' },
    { id: 'Nature', label: 'Nature & Biodiversité', desc: 'Réserves d’oiseaux, mangroves et tortues géantes' },
    { id: 'Aventure', label: 'Aventure & Désert', desc: 'Dunes en 4x4, bivouacs et pistes côtières' },
    { id: 'Gastronomie', label: 'Gastronomie & Teranga', desc: 'Cooking class et saveurs du Thiéboudienne' },
    { id: 'Patrimoine', label: 'Patrimoine & Mémoire', desc: 'Île de Gorée, Saint-Louis et histoire coloniale' },
    { id: 'Rencontre', label: 'Rencontres & Homologues', desc: 'Échanges confraternels et immersion solidaire' },
  ];

  const durations = [
    { id: 'Demi-journée', label: 'Demi-journée', time: '3h à 5h' },
    { id: 'Journée', label: 'Journée complète', time: '8h à 10h' },
    { id: '2–3 jours', label: '2 à 3 jours', time: 'Circuit immersif' },
    { id: 'Sur mesure', label: 'Sur mesure', time: '1 semaine +' },
  ];

  // Dynamic recommendations mapping
  const getRecommendation = () => {
    if (selectedTheme === 'Culture') {
      if (selectedDuration === 'Demi-journée') return { title: 'Tour de Ville de Dakar & Marchés Authentiques', link: '/excursions/tour-de-ville-dakar', desc: 'Immersion dans les marchés Kermel et Soumbédioune et découverte de la Corniche.' };
      if (selectedDuration === 'Journée') return { title: 'Dakar & Île de Gorée (Circuit Intégral)', link: '/excursions/dakar-goree', desc: 'La capitale vivante combinée à la visite émouvante de la Maison des Esclaves.' };
      return { title: 'Grande Traversée Culturelle : Dakar, Saint-Louis & Joal', link: '/reservation?theme=Culture', desc: 'Riche itinéraire à travers l’artisanat dakarois, la mémoire de Gorée et l’histoire fluviale.' };
    }
    if (selectedTheme === 'Nature') {
      if (selectedDuration === 'Demi-journée') return { title: 'Village des Tortues de Noflaye & Forêt classée', link: '/excursions/kayar-village-tortues', desc: 'Rencontre avec les tortues centenaires Sulcata dans un sanctuaire préservé.' };
      if (selectedDuration === 'Journée') return { title: 'Lac Rose & Réserve Naturelle des Niayes', link: '/excursions/lac-rose-retba', desc: 'Flottaison minérale et safari dans les dunes bordant l’océan.' };
      return { title: 'Safari Ornithologique au Djoudj & Delta du Saloum', link: '/reservation?theme=Nature', desc: 'Pélicans, flamants roses et navigation en pirogue au cœur des bolongs.' };
    }
    if (selectedTheme === 'Aventure') {
      if (selectedDuration === 'Demi-journée') return { title: 'Safari 4x4 sur les Dunes du Paris-Dakar', link: '/excursions/lac-rose-retba', desc: 'Sensations fortes sur les pistes de sable du mythique rallye.' };
      return { title: 'Bivouac sous les Étoiles au Désert de Lompoul', link: '/reservation?theme=Aventure', desc: 'Tentes mauritaniennes de charme, méharée à dos de dromadaire et veillée au coin du feu.' };
    }
    if (selectedTheme === 'Gastronomie') {
      return { title: 'Cooking Class de la Teranga & Marché aux Épices', link: '/voyages-a-themes', desc: 'De l’achat des ingrédients frais jusqu’au partage du bol familial traditionnel.' };
    }
    if (selectedTheme === 'Patrimoine') {
      if (selectedDuration === 'Demi-journée') return { title: 'Île de Gorée & Maison des Esclaves', link: '/excursions/dakar-goree', desc: 'Visite guidée par un historien officiel assermenté.' };
      return { title: 'Saint-Louis d’Afrique en Calèche & Gorée', link: '/excursions/saint-louis-djoudj-3-jours', desc: 'Les deux joyaux classés au Patrimoine Mondial de l’UNESCO réunis.' };
    }
    // Rencontre / Solidaire
    return { title: 'Séjour en Tourisme Rural Intégré & Échanges d’Homologues', link: '/tourisme-solidaire', desc: 'Partage du quotidien villageois et soutien aux projets communautaires.' };
  };

  const currentRec = getRecommendation();

  return (
    <section className="py-20 md:py-28 bg-white text-[#151515] border-b border-[#C7A77A]/20 text-left">
      <Container size="xl">
        <SectionTitle
          badge="ORIENTATION INTELLIGENTE"
          title="Quel Sénégal voulez-vous découvrir ?"
          subtitle="Sélectionnez vos envies et votre temps disponible pour révéler votre itinéraire idéal."
          align="center"
          className="mb-12"
        />

        <div className="bg-[#F7F4EE] rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#C7A77A]/30 shadow-sm space-y-10">
          {/* Question 1: Thème */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#173C32] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173C32]">
                Quelle ambiance de voyage recherchez-vous ?
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {themes.map((th) => {
                const isSelected = selectedTheme === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => setSelectedTheme(th.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#173C32] text-white border-[#173C32] shadow-md scale-102'
                        : 'bg-white text-neutral-700 hover:bg-[#C7A77A]/15 border-[#C7A77A]/30'
                    }`}
                  >
                    <span className={`text-xs font-bold block ${isSelected ? 'text-[#C99A4A]' : 'text-[#151515]'}`}>
                      {th.label}
                    </span>
                    <p className={`text-[10px] font-light mt-1 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                      {th.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Durée */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#173C32] text-white text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173C32]">
                Combien de temps avez-vous ?
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {durations.map((dur) => {
                const isSelected = selectedDuration === dur.id;
                return (
                  <button
                    key={dur.id}
                    onClick={() => setSelectedDuration(dur.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#C99A4A] text-[#151515] border-[#C99A4A] shadow-md font-bold'
                        : 'bg-white text-neutral-700 hover:bg-[#C7A77A]/15 border-[#C7A77A]/30'
                    }`}
                  >
                    <span className="text-xs font-bold block">{dur.label}</span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">{dur.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Suggestion Box */}
          <div className="pt-6 border-t border-[#C7A77A]/30 bg-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#A85D3A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C99A4A]" />
                EXPÉRIENCE RECOMMANDÉE POUR VOUS
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#173C32]">
                {currentRec.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-light">
                {currentRec.desc}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to={`/reservation?theme=${encodeURIComponent(selectedTheme)}&duration=${encodeURIComponent(selectedDuration)}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full bg-[#173C32] hover:bg-[#132c25] text-white shadow-md transition-all"
              >
                <span>Personnaliser ce choix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
