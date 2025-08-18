import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationTH from './locales/th.json';
import translationEN from './locales/en.json';

i18n
  .use(initReactI18next) // บอกให้ react-i18next ใช้งาน instance นี้
  .init({
    resources: {
      th: { translation: translationTH },
      en: { translation: translationEN },
    },
    lng: 'th', // ภาษาเริ่มต้น
    fallbackLng: 'en', // ถ้าไม่มีภาษานั้น จะ fallback มาภาษาอังกฤษ

    interpolation: {
      escapeValue: false, // ไม่ต้อง escape เพราะ React จัดการให้แล้ว
    },
  });

export default i18n;
