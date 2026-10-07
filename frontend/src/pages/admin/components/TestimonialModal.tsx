import React, { useState } from 'react';
import { X, Star, Save, MessageSquare } from 'lucide-react';
import { Testimonial } from '../../../types';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  testimonial,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState(testimonial?.fullName || '');
  const [country, setCountry] = useState(testimonial?.country || '');
  const [rating, setRating] = useState(testimonial?.rating || 5);
  const [comment, setComment] = useState(testimonial?.comment || '');
  const [tourName, setTourName] = useState(testimonial?.tourName || 'Dakar + Gorée');
  const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatarUrl || '');
  const [isPublished, setIsPublished] = useState(testimonial?.isPublished ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await onSave({
        fullName,
        country,
        rating: Number(rating),
        comment,
        tourName,
        avatarUrl: avatarUrl || undefined,
        isPublished,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l’enregistrement du témoignage');
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
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              {testimonial ? 'Modifier le Témoignage' : 'Enregistrer un Témoignage Client'}
            </h3>
            <p className="text-xs text-white/60">
              Retour d'expérience certifié de voyageurs
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
              <label className="block text-white/80 font-bold mb-1">Nom du client *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Sophie & Marc Delattre"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>

            <div>
              <label className="block text-white/80 font-bold mb-1">Pays / Ville</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ex: France (Lyon)"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 font-bold mb-1">Circuit / Excursion effectuée</label>
              <input
                type="text"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                placeholder="Ex: Grand Circuit Saint-Louis & Djoudj"
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
              />
            </div>

            <div>
              <label className="block text-white/80 font-bold mb-1">Note (1 à 5 étoiles)</label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/15">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-white/40 hover:text-[#C99A4A] transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'text-[#C99A4A] fill-[#C99A4A]' : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#C99A4A] ml-2 font-mono">
                  {rating}/5
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-bold mb-1">Commentaire authentique *</label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Récit de voyage ou commentaire du client..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#C99A4A]"
            />
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-[#C99A4A] rounded focus:ring-0"
            />
            <span className="text-xs font-bold text-white">Publier publiquement sur le site</span>
          </label>

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
              <span>{isSaving ? 'Enregistrement...' : 'Enregistrer le témoignage'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
