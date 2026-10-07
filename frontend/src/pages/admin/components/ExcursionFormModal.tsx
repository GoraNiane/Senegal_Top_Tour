import React, { useState } from 'react';
import { X, Compass, Save, Plus, Trash2, Image, ListChecks, Clock, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Excursion, Destination, PublicationStatus } from '../../../types';

interface ExcursionFormModalProps {
  excursion: Excursion | null; // null for creation or prefilled if duplicating
  destinations: Destination[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  isDuplicate?: boolean;
}

export const ExcursionFormModal: React.FC<ExcursionFormModalProps> = ({
  excursion,
  destinations,
  isOpen,
  onClose,
  onSave,
  isDuplicate = false,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(
    isDuplicate && excursion ? `${excursion.name} (Copie)` : excursion?.name || ''
  );
  const [slug, setSlug] = useState(
    isDuplicate && excursion
      ? `${excursion.slug}-copie-${Date.now().toString().slice(-4)}`
      : excursion?.slug || ''
  );
  const [destinationId, setDestinationId] = useState(excursion?.destinationId || '');
  const [subtitle, setSubtitle] = useState(excursion?.subtitle || excursion?.shortDescription || '');
  const [description, setDescription] = useState(excursion?.description || '');
  const [fullContent, setFullContent] = useState(excursion?.fullContent || excursion?.description || '');
  const [duration, setDuration] = useState(excursion?.duration || '½ Journée (09h00 – 13h00)');
  const [durationCategory, setDurationCategory] = useState(excursion?.durationCategory || 'half_day');
  const [schedule, setSchedule] = useState(excursion?.schedule || excursion?.departTime || '08h30 ou 13h00');
  const [departureLocation, setDepartureLocation] = useState(
    excursion?.departureLocation || excursion?.departureCity || 'Dakar'
  );
  const [price, setPrice] = useState<number | string>(excursion?.price || excursion?.priceAmount || '');
  const [currency, setCurrency] = useState(excursion?.currency || 'EUR');
  const [category, setCategory] = useState(excursion?.category || 'Culture');
  const [status, setStatus] = useState<PublicationStatus>(
    isDuplicate ? 'DRAFT' : excursion?.status || 'PUBLISHED'
  );
  const [isFeatured, setIsFeatured] = useState(excursion?.isFeatured ?? false);
  const [order, setOrder] = useState(excursion?.order ?? 0);

  // Inclusions array
  const [inclusions, setInclusions] = useState<string[]>(() => {
    if (!excursion?.inclusions) return ['Transport climatisé privatisé', 'Guide officiel assermenté'];
    if (Array.isArray(excursion.inclusions)) return excursion.inclusions;
    try {
      return JSON.parse(excursion.inclusions as any);
    } catch {
      return [excursion.inclusions as any];
    }
  });
  const [newInclusion, setNewInclusion] = useState('');

  // Exclusions array
  const [exclusions, setExclusions] = useState<string[]>(() => {
    if (!excursion?.exclusions) return ['Dépenses personnelles et souvenirs', 'Pourboires discrétionnaires'];
    if (Array.isArray(excursion.exclusions)) return excursion.exclusions;
    try {
      return JSON.parse(excursion.exclusions as any);
    } catch {
      return [excursion.exclusions as any];
    }
  });
  const [newExclusion, setNewExclusion] = useState('');

  // Images
  const [coverImageUrl, setCoverImageUrl] = useState(
    excursion?.images?.[0]?.url || '/images/dakar.png'
  );
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    excursion?.images?.slice(1).map((img) => img.url) || []
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Itinerary Steps
  const [itinerary, setItinerary] = useState<any[]>(
    excursion?.itinerary?.length
      ? excursion.itinerary
      : [
          { time: '08h30', title: 'Prise en charge à votre hébergement', description: 'Accueil chaleureux par votre chauffeur-guide privé.' },
          { time: '10h00', title: 'Visite guidée et immersion locale', description: 'Découverte des sites emblématiques avec explications historiques.' },
          { time: '13h00', title: 'Retour', description: 'Arrivée à votre hôtel.' },
        ]
  );

  const [activeTab, setActiveTab] = useState<'general' | 'details' | 'media' | 'itinerary'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug when name changes for new items
  const handleNameChange = (val: string) => {
    setName(val);
    if (!excursion || isDuplicate) {
      setSlug(
        val
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion('');
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryUrls([...galleryUrls, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleAddItineraryStep = () => {
    setItinerary([
      ...itinerary,
      { time: '11h30', title: 'Nouvelle étape', description: 'Description de l’étape.' },
    ]);
  };

  const handleRemoveItineraryStep = (idx: number) => {
    setItinerary(itinerary.filter((_, i) => i !== idx));
  };

  const handleUpdateItinerary = (idx: number, field: string, val: string) => {
    setItinerary(
      itinerary.map((step, i) => (i === idx ? { ...step, [field]: val } : step))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const allImages = [
        { url: coverImageUrl, isCover: true, order: 0 },
        ...galleryUrls.map((url, idx) => ({ url, isCover: false, order: idx + 1 })),
      ];

      const payload = {
        name,
        slug,
        destinationId: destinationId || null,
        shortDescription: subtitle || name,
        subtitle: subtitle || name,
        description,
        fullContent: fullContent || description,
        duration,
        durationCategory,
        schedule,
        departTime: schedule,
        departureLocation,
        departureCity: departureLocation,
        price: price ? Number(price) : null,
        currency,
        category,
        status,
        featured: isFeatured,
        isFeatured,
        displayOrder: Number(order) || 0,
        included: inclusions,
        inclusions,
        excluded: exclusions,
        exclusions,
        practicalInfo: {
          'Lieu de départ': departureLocation,
          'Horaires': schedule,
          'Langues': 'Français, Anglais, Wolof',
        },
        images: allImages,
        itinerary: itinerary.map((step, idx) => ({
          time: step.time || '',
          title: step.title || '',
          description: step.description || '',
          order: idx + 1,
        })),
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l’enregistrement');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#182320] border border-white/15 max-w-4xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 relative my-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30 flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {isDuplicate
                ? `Dupliquer : ${excursion?.name}`
                : excursion
                ? `Modifier : ${excursion.name}`
                : 'Nouvelle Excursion'}
            </h3>
            <p className="text-xs text-white/60">
              Formulaire de gestion intégrale du circuit touristique
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Tabs within Form */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs">
          {[
            { id: 'general', label: '1. Informations Générales' },
            { id: 'details', label: '2. Inclusions & Tarifs' },
            { id: 'media', label: '3. Photos & Galerie' },
            { id: 'itinerary', label: '4. Itinéraire par étapes' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === t.id
                  ? 'bg-[#C99A4A] text-black font-bold'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Nom de l'excursion *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ex: Île de Gorée — Mémoire & Sérénité"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ex: ile-de-goree"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Destination rattachée</label>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-[#182320] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  >
                    <option value="">-- Aucune / Multi-destinations --</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#182320] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  >
                    <option value="Culture">Culture</option>
                    <option value="Patrimoine">Patrimoine</option>
                    <option value="Histoire">Histoire</option>
                    <option value="Nature">Nature</option>
                    <option value="Aventure">Aventure</option>
                    <option value="Solidaire">Solidaire</option>
                    <option value="Gastronomie">Gastronomie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Statut de Publication</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PublicationStatus)}
                    className="w-full bg-[#182320] border border-[#C99A4A]/40 rounded-xl p-3 text-sm text-[#C99A4A] font-bold focus:outline-none focus:border-[#C99A4A]"
                  >
                    <option value="PUBLISHED">🟢 PUBLIÉ (Actif et visible)</option>
                    <option value="UPCOMING">🟡 À VENIR (« Bientôt disponible »)</option>
                    <option value="DRAFT">⚪ BROUILLON (Invisible)</option>
                    <option value="ARCHIVED">🔴 ARCHIVÉ (Retiré)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">Description courte (Sous-titre)</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ex: Sanctuaire de mémoire universelle et joyau d’architecture coloniale"
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                />
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">Description complète de l'expérience</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Présentation détaillée, points forts et déroulement du circuit..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DETAILS & PRICING */}
          {activeTab === 'details' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Durée affichée *</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: ½ Journée, 1 Journée, 3 Jours"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Catégorie de durée</label>
                  <select
                    value={durationCategory}
                    onChange={(e) => setDurationCategory(e.target.value as any)}
                    className="w-full bg-[#182320] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  >
                    <option value="half_day">½ Journée</option>
                    <option value="full_day">Journée complète</option>
                    <option value="multi_day">Circuit de plusieurs jours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Horaires indicatifs</label>
                  <input
                    type="text"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="Ex: 08h30 ou 13h00"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/80 font-bold mb-1">Lieu de départ</label>
                  <input
                    type="text"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    placeholder="Ex: Dakar, Embarcadère, Saly"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Tarif (€ / participant)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Laisser vide pour Sur demande"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">Devise</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#182320] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="XOF">XOF (FCFA)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              {/* Inclusions / Exclusions Editor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                  <h4 className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>Inclus dans le tarif</span>
                  </h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] bg-white/5 px-2.5 py-1 rounded-lg">
                        <span>✓ {item}</span>
                        <button
                          type="button"
                          onClick={() => setInclusions(inclusions.filter((_, i) => i !== idx))}
                          className="text-white/40 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      placeholder="Ajouter une inclusion..."
                      className="flex-1 bg-white/5 border border-white/15 rounded-lg p-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddInclusion}
                      className="px-3 py-1 bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                  <h4 className="text-red-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" />
                    <span>Non inclus</span>
                  </h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {exclusions.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] bg-white/5 px-2.5 py-1 rounded-lg">
                        <span>✕ {item}</span>
                        <button
                          type="button"
                          onClick={() => setExclusions(exclusions.filter((_, i) => i !== idx))}
                          className="text-white/40 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      placeholder="Ajouter une exclusion..."
                      className="flex-1 bg-white/5 border border-white/15 rounded-lg p-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddExclusion}
                      className="px-3 py-1 bg-red-900/40 border border-red-500/30 text-red-300 rounded-lg text-xs font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-white/80 font-bold mb-1">Image principale (Couverture) *</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="/images/... ou URL https://"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono"
                  />
                  {coverImageUrl && (
                    <img src={coverImageUrl} alt="cover" className="w-14 h-12 rounded-xl object-cover border border-[#C99A4A]" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">Galerie d'images complémentaires</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {galleryUrls.map((url, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10 h-24">
                      <img src={url} alt={`gal-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryUrls(galleryUrls.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Ajouter une URL d'image pour la galerie..."
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter photo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  Étapes chronologiques du circuit
                </h4>
                <button
                  type="button"
                  onClick={handleAddItineraryStep}
                  className="px-3 py-1.5 rounded-lg bg-[#C99A4A]/20 border border-[#C99A4A]/40 text-[#C99A4A] text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une étape</span>
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {itinerary.map((step, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Heure (ex: 09h30)"
                        value={step.time}
                        onChange={(e) => handleUpdateItinerary(idx, 'time', e.target.value)}
                        className="w-28 bg-white/10 border border-white/15 rounded-lg p-1.5 text-xs text-white font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Titre de l'étape"
                        value={step.title}
                        onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/15 rounded-lg p-1.5 text-xs text-white font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryStep(idx)}
                        className="p-1.5 text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Description détaillée de l'étape..."
                      value={step.description}
                      onChange={(e) => handleUpdateItinerary(idx, 'description', e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-lg p-2 text-xs text-white/90"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured & Order controls (always visible) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#C99A4A] rounded focus:ring-0"
              />
              <span className="text-xs font-bold text-white">Mettre en avant dans les coups de cœur</span>
            </label>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-white/80">Ordre d'affichage :</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-20 bg-white/10 border border-white/20 rounded-lg p-1.5 text-center text-xs text-white"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-gold px-7 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSaving
                  ? 'Enregistrement...'
                  : isDuplicate
                  ? 'Enregistrer la copie'
                  : excursion
                  ? 'Mettre à jour le circuit'
                  : 'Créer l’excursion'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
