import React, { useState, useEffect } from 'react';
import { X, MapPin, Sparkles, Save, Image, Tag, Plus, Trash2 } from 'lucide-react';
import { Destination, PublicationStatus } from '../../../types';

interface DestinationModalProps {
  destination: Destination | null; // null for creation
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(destination?.name || '');
  const [slug, setSlug] = useState(destination?.slug || '');
  const [subtitle, setSubtitle] = useState(destination?.subtitle || '');
  const [region, setRegion] = useState(destination?.region || 'Sénégal');
  const [category, setCategory] = useState(destination?.category || 'Culture');
  const [description, setDescription] = useState(destination?.description || '');
  const [imageUrl, setImageUrl] = useState(destination?.imageUrl || '/images/dakar.png');
  const [status, setStatus] = useState<PublicationStatus>(destination?.status || 'PUBLISHED');
  const [isFeatured, setIsFeatured] = useState(destination?.isFeatured ?? false);
  const [order, setOrder] = useState(destination?.order ?? 0);
  
  // Highlights array
  const [highlights, setHighlights] = useState<string[]>(() => {
    if (!destination?.highlights) return ['Patrimoine culturel', 'Paysages remarquables'];
    if (Array.isArray(destination.highlights)) return destination.highlights;
    try {
      return JSON.parse(destination.highlights);
    } catch {
      return [destination.highlights];
    }
  });
  const [newHighlight, setNewHighlight] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug when name changes for new items
  const handleNameChange = (val: string) => {
    setName(val);
    if (!destination) {
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

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const payload = {
        name,
        slug,
        subtitle: subtitle || name,
        description,
        region,
        category,
        imageUrl,
        highlights,
        status,
        featured: isFeatured,
        displayOrder: Number(order) || 0,
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#182320] border border-white/15 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {destination ? `Modifier : ${destination.name}` : 'Nouvelle Destination'}
            </h3>
            <p className="text-xs text-white/60">
              Paramétrez les informations et le statut de publication
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Nom de la destination *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Île de Gorée, Saint-Louis..."
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
                placeholder="ex: saint-louis"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Région</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Ex: Baie de Dakar, Sine Saloum"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
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
                <option value="Nature">Nature</option>
                <option value="Aventure">Aventure</option>
                <option value="Solidaire">Solidaire</option>
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
                <option value="DRAFT">⚪ BROUILLON (Invisible du public)</option>
                <option value="ARCHIVED">🔴 ARCHIVÉ (Retiré)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Sous-titre / Accroche</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Mémoire universelle · Ruelles coloniales UNESCO"
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
            />
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Description détaillée</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentation immersive de la destination..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
            />
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/... ou URL https://"
                className="flex-1 bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#C99A4A]"
              />
              {imageUrl && (
                <img src={imageUrl} alt="preview" className="w-12 h-11 rounded-lg object-cover border border-white/20" />
              )}
            </div>
          </div>

          {/* Highlights editor */}
          <div>
            <label className="block text-white/80 font-bold mb-1.5">Points forts & Incontournables</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {highlights.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/10 text-white text-xs flex items-center gap-1.5 border border-white/10"
                >
                  <Tag className="w-3 h-3 text-[#C99A4A]" />
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="hover:text-red-400 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                placeholder="Ajouter un point fort et appuyer sur Entrée..."
                className="flex-1 bg-white/5 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#C99A4A]"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter</span>
              </button>
            </div>
          </div>

          {/* Featured & Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#C99A4A] rounded focus:ring-0"
              />
              <span className="text-xs font-bold text-white">Mettre en avant (Featured)</span>
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
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Enregistrement...' : destination ? 'Mettre à jour' : 'Créer la destination'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
