import React, { useState } from 'react';
import { X, Sparkles, Save, Tag, Plus, Trash2 } from 'lucide-react';
import { Experience } from '../../../types';
import { ImageUploadInput } from './ImageUploadInput';

interface ThemeModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  titlePrefix?: string;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  experience,
  isOpen,
  onClose,
  onSave,
  titlePrefix = 'Expérience Thématique',
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(experience?.title || '');
  const [slug, setSlug] = useState(experience?.slug || '');
  const [category, setCategory] = useState(experience?.category || 'Échange Professionnel');
  const [shortDescription, setShortDescription] = useState(experience?.shortDescription || '');
  const [description, setDescription] = useState(experience?.description || '');
  const [imageUrl, setImageUrl] = useState(experience?.imageUrl || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=85');
  const [ctaText, setCtaText] = useState(experience?.ctaText || 'Découvrir →');
  const [ctaLink, setCtaLink] = useState(experience?.ctaLink || '/voyages-a-themes');
  const [isFeatured, setIsFeatured] = useState(experience?.isFeatured ?? true);
  const [order, setOrder] = useState(experience?.order ?? 0);

  // Highlights array
  const [highlights, setHighlights] = useState<string[]>(() => {
    if (!experience?.highlights) return ['Partage d’expérience', 'Immersion culturelle'];
    if (Array.isArray(experience.highlights)) return experience.highlights;
    try {
      return JSON.parse(experience.highlights);
    } catch {
      return [experience.highlights];
    }
  });
  const [newHighlight, setNewHighlight] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (val: string) => {
    setTitle(val);
    if (!experience) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await onSave({
        title,
        slug,
        category,
        shortDescription,
        description,
        highlights,
        imageUrl,
        ctaText,
        ctaLink,
        isFeatured,
        order: Number(order) || 0,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l’enregistrement');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#182320] border border-white/15 max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 relative my-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {experience ? `Modifier : ${experience.title}` : `Nouvelle ${titlePrefix}`}
            </h3>
            <p className="text-xs text-white/60">
              Paramètres et contenus de l'expérience
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Titre de l'expérience *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Cooking Class de la Teranga"
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
                placeholder="ex: cooking-class"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Catégorie *</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Gastronomie, Échange Professionnel, Écologie"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>

            <div>
              <label className="block text-white/80 font-bold mb-1">Accroche courte</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Ex: Du marché traditionnel au bol familial de la Teranga."
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Description complète</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentation immersive de l'expérience..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
            />
          </div>

          <div>
            <ImageUploadInput
              label="URL ou Téléversement Image *"
              value={imageUrl}
              onChange={setImageUrl}
              folder="themes"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-white/80 font-bold mb-1.5">Points forts & Acteurs</label>
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
                    onClick={() => setHighlights(highlights.filter((_, i) => i !== idx))}
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
                placeholder="Ajouter un élément..."
                className="flex-1 bg-white/5 border border-white/15 rounded-xl p-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold"
              >
                + Ajouter
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
