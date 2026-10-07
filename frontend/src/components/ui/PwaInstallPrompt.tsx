import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check, Share2, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed / standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently in localStorage
    const dismissedAt = localStorage.getItem('stt_pwa_dismissed');
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < 5) return; // Don't show again for 5 days
    }

    // iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIos(isIosDevice);

    if (isIosDevice) {
      // Delay showing prompt on iOS for smooth entrance
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => clearTimeout(timer);
    }

    // Chrome / Android / Edge / Desktop beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // When app is installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosGuide(false);
    localStorage.setItem('stt_pwa_dismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <>
      {/* Floating Install Prompt Banner */}
      <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slideUp">
        <div className="bg-[#151515]/95 backdrop-blur-xl border border-[#C99A4A]/40 rounded-2xl p-4 shadow-2xl text-white flex items-center justify-between gap-3.5">
          {/* Logo / App Icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#173C32] to-[#0A1A15] border border-[#C99A4A]/50 flex items-center justify-center flex-shrink-0 shadow-md">
            <Smartphone className="w-5 h-5 text-[#C99A4A]" />
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0 text-left">
            <h4 className="text-xs font-bold text-[#F7F4EE] flex items-center gap-1.5 truncate">
              <span>Installer l'application</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#C99A4A]/20 text-[#C99A4A] font-mono">PWA</span>
            </h4>
            <p className="text-[11px] text-[#A39B8B] truncate mt-0.5">
              Accès rapide et consultation hors-ligne fluide
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-2 rounded-xl bg-[#C99A4A] hover:bg-[#b0843a] text-[#151515] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>

            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Installation Modal Instructions */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#151515] border border-[#C99A4A]/40 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#173C32] border border-[#C99A4A]/50 flex items-center justify-center mb-4 text-[#C99A4A]">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-base font-serif font-bold text-[#F7F4EE] mb-2">
              Installer Senegal Top Tour sur iPhone / iPad
            </h3>
            <p className="text-xs text-[#A39B8B] mb-5 leading-relaxed">
              Pour ajouter l'application sur votre écran d'accueil sans passer par l'App Store :
            </p>

            <div className="space-y-3 text-xs text-left bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  Appuyez sur le bouton de <strong>Partage</strong> (<Share2 className="w-3.5 h-3.5 inline mx-1 text-[#C99A4A]" /> en bas de Safari).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  Faites défiler vers le bas et sélectionnez <strong>« Sur l'écran d'accueil »</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-1 text-[#C99A4A]" />).
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C99A4A]/20 text-[#C99A4A] flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  Cliquez sur <strong>« Ajouter »</strong> en haut à droite.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full mt-5 py-3 rounded-xl bg-[#C99A4A] text-[#151515] text-xs font-bold hover:bg-[#b0843a] transition-all"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
};
