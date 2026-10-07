import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  isDanger = true,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#182320] border border-white/15 max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDanger ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#C99A4A]/20 text-[#C99A4A] border border-[#C99A4A]/30'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white">
            {title}
          </h3>
        </div>

        <p className="text-xs text-white/75 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-[#C99A4A] hover:bg-[#D4AF37] text-black'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
