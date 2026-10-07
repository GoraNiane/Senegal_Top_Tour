import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config';

interface WhatsAppButtonProps {
  customMessage?: string;
  excursionName?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  customMessage,
  excursionName,
  className = '',
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const location = useLocation();

  // Check if we are on an excursion detail page which has its own sticky mobile CTA
  const isExcursionDetail = location.pathname.startsWith('/excursions/');

  useEffect(() => {
    // Show polite concierge prompt after 4 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = buildWhatsAppUrl({
    excursionName: excursionName,
    customMessage: customMessage,
  });

  return (
    <aside
      aria-label="Conciergerie WhatsApp SENEGAL TOP TOUR"
      className={`fixed z-40 flex flex-col items-end transition-all duration-300 ${
        isExcursionDetail
          ? 'bottom-20 right-3.5 sm:bottom-6 sm:right-6'
          : 'bottom-4 right-3.5 sm:bottom-6 sm:right-6'
      } ${className}`}
    >
      {/* Floating Concierge Welcome Card */}
      {showPrompt && (
        <div className="mb-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white text-[#151515] p-4 rounded-2xl shadow-2xl border border-[#C7A77A]/35 animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          <button
            onClick={() => setShowPrompt(false)}
            aria-label="Fermer la notification WhatsApp"
            className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-neutral-700 p-1 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#173C32]">
              Conciergerie SENEGAL TOP TOUR
            </span>
          </div>

          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Besoin d’un conseil personnalisé pour votre voyage ou votre excursion ? Échangez directement avec notre équipe locale.
          </p>

          <div className="pt-2.5 flex items-center justify-between border-t border-neutral-100 mt-2">
            <span className="text-[10px] text-neutral-400 font-mono">
              Réponse rapide 7j/7
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1"
            >
              <span>Discuter</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Échanger directement avec la conciergerie SENEGAL TOP TOUR sur WhatsApp"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ring-4 ring-black/5"
      >
        <MessageCircle className="w-5 h-5 fill-current flex-shrink-0" />
        <span className="text-xs font-semibold tracking-wide hidden xs:inline sm:inline">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  );
};
export default WhatsAppButton;
