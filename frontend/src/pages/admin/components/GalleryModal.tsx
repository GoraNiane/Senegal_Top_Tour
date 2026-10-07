import React, { useState } from 'react';
import { X, Image, Save } from 'lucide-react';
import { GalleryImage } from '../../../types';

interface GalleryModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  image,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(image?.title || '');
  const [category, setCategory] = useState(image?.category || 'Dakar');
  const [imageUrl, setImageUrl] = useState(image?.imageUrl || '');
  const [location, setLocation] = useState(image?.location || '');
  const [order, setOrder] = useState(image?.order ?? 0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Dakar',
    'Gorée',
    'Kayar',
    'Lac Rose',
    'Culture',
    'Nature',
    'Gastronomie',
    'Villages',
    'Tourisme solidaire',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await onSave({
        title,
        category,
        imageUrl,
        location,
        order: Number(order) || 0,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l’enregistrement de la photo');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#182320] border border-white/15 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30 flex items-center justify-center flex-shrink-0">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {image ? 'Modifier la photo' : 'Ajouter une photo à la Galerie'}
            </h3>
            <p className="text-xs text-white/60">
              Photothèque d'excellence de Senegal Top Tour
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-white/80 font-bold mb-1">Titre de la photo *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reflets féeriques sur les pirogues de Kayar"
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Catégorie *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#182320] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/80 font-bold mb-1">Lieu / Emplacement</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Île de Gorée, Sine Saloum"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">URL de l'image *</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/... ou https://"
                className="flex-1 bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#C99A4A]"
              />
              {imageUrl && (
                <img src={imageUrl} alt="preview" className="w-12 h-11 rounded-lg object-cover border border-white/20" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Ordre d'affichage</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-24 bg-white/5 border border-white/15 rounded-xl p-2 text-xs text-white"
            />
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
