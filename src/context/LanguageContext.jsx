import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('tamken-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('tamken-lang', lang);
    const root = document.documentElement;
    if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      root.classList.add('font-arabic');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
      root.classList.remove('font-arabic');
    }
  }, [lang]);

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en');
  const isAr = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
