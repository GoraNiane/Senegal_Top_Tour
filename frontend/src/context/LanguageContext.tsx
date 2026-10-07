import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../translations/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('stt_language');
    if (saved === 'fr' || saved === 'en' || saved === 'de') {
      return saved as Language;
    }
    // Détection navigateur si pas encore configuré
    const browserLang = navigator.language?.toLowerCase();
    if (browserLang && browserLang.startsWith('de')) {
      return 'de';
    }
    if (browserLang && browserLang.startsWith('en')) {
      return 'en';
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('stt_language', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'fr' ? 'en' : language === 'en' ? 'de' : 'fr';
    setLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
