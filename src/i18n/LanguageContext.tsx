import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'moroccan_chef_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (saved === 'ar' || saved === 'fr' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read language from localStorage:', e);
    }
    return 'ar'; // Default to Moroccan Arabic
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Could not save language to localStorage:', e);
    }
  };

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    dir,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
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
