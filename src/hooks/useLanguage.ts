import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (lang: string) => set({ currentLanguage: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return {
    currentLanguage,
    changeLanguage,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
    ],
  };
};