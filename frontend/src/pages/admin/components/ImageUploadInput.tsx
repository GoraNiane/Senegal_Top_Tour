import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { api } from '../../../services/api';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  folder?: string;
  className?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = 'Image (URL ou Téléversement Cloudinary)',
  value,
  onChange,
  placeholder = 'https://res.cloudinary.com/... ou /images/...',
  folder = 'senegal_top_tour',
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('L\'image dépasse la taille maximale autorisée (10 Mo).');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadSuccess(false);

    try {
      const result = await api.admin.uploadFile(file, folder);
      if (result.success && result.url) {
        onChange(result.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      } else {
        setErrorMessage(result.message || 'Échec du téléversement vers Cloudinary');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erreur réseau lors du téléversement');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A39B8B]">
          <span>{label}</span>
          <span className="text-[10px] text-[#C99A4A] font-mono lowercase">Cloudinary CDN ready</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Thumbnail Preview */}
        <div className="relative w-14 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 group">
          {value ? (
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-white/30" />
          )}
        </div>

        {/* URL Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#F7F4EE] placeholder:text-white/20 focus:outline-none focus:border-[#C99A4A] transition-colors"
        />

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp, image/gif, image/avif"
          className="hidden"
        />

        {/* Upload Button */}
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#C99A4A]/15 hover:bg-[#C99A4A]/25 border border-[#C99A4A]/40 hover:border-[#C99A4A] text-[#C99A4A] hover:text-white rounded-xl text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
          title="Sélectionner une photo depuis votre appareil pour l'envoyer sur Cloudinary"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#C99A4A]" />
              <span className="hidden sm:inline">Envoi...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Choisir photo</span>
            </>
          )}
        </button>
      </div>

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Image téléversée avec succès sur Cloudinary !</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
