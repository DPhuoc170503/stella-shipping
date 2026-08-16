import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vi from './locales/vi.json';
import en from './locales/en.json';

const resources = {
  vi: {
    translation: vi
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // Mặc định là tiếng Việt
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false // React tự động xử lý chống XSS
    }
  });

export default i18n;
