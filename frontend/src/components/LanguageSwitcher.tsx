import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'dropdown' | 'minimal';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-wider ${className}`}>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
            language === 'fr'
              ? 'text-[#C99A4A] font-bold underline underline-offset-4'
              : 'text-white/70 hover:text-white'
          }`}
          title="Français"
        >
          FR
        </button>
        <span className="text-white/30">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
            language === 'en'
              ? 'text-[#C99A4A] font-bold underline underline-offset-4'
              : 'text-white/70 hover:text-white'
          }`}
          title="English"
        >
          EN
        </button>
        <span className="text-white/30">|</span>
        <button
          onClick={() => setLanguage('de')}
          className={`px-1.5 py-1 rounded transition-colors cursor-pointer ${
            language === 'de'
              ? 'text-[#C99A4A] font-bold underline underline-offset-4'
              : 'text-white/70 hover:text-white'
          }`}
          title="Deutsch"
        >
          DE
        </button>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-sans shadow-sm select-none ${className}`}
      role="group"
      aria-label="Sélection de langue : FR / EN / DE"
    >
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 text-[11px] font-bold tracking-wider cursor-pointer ${
          language === 'fr'
            ? 'bg-[#C99A4A] text-[#151515] shadow-sm'
            : 'text-white/75 hover:text-white hover:bg-white/5'
        }`}
        aria-pressed={language === 'fr'}
        title="Français"
      >
        FR
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 text-[11px] font-bold tracking-wider cursor-pointer ${
          language === 'en'
            ? 'bg-[#C99A4A] text-[#151515] shadow-sm'
            : 'text-white/75 hover:text-white hover:bg-white/5'
        }`}
        aria-pressed={language === 'en'}
        title="English"
      >
        EN
      </button>

      <button
        onClick={() => setLanguage('de')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 text-[11px] font-bold tracking-wider cursor-pointer ${
          language === 'de'
            ? 'bg-[#C99A4A] text-[#151515] shadow-sm'
            : 'text-white/75 hover:text-white hover:bg-white/5'
        }`}
        aria-pressed={language === 'de'}
        title="Deutsch"
      >
        DE
      </button>
    </div>
  );
};

