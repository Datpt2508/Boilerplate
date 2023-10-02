import { initReactI18next } from 'react-i18next';

import en_English from '~/resources/locales/en_English.json';
import es_Spanish from '~/resources/locales/es_Spanish.json';
import hi_Hindi from '~/resources/locales/hi_Hindi.json';
import id_Indonesian from '~/resources/locales/id_Indonesian.json';
import ko_Korean from '~/resources/locales/ko_Korean.json';
import pt_Portuguese from '~/resources/locales/pt_Portuguese.json';

import i18n from 'i18next';

const defaultLanguage = 'en_English';

export const defaultNamespace = 'default';

export const resources = {
  en_English: {
    [defaultNamespace]: en_English,
  },
  es_Spanish: {
    [defaultNamespace]: es_Spanish,
  },
  hi_Hindi: {
    [defaultNamespace]: hi_Hindi,
  },
  id_Indonesian: {
    [defaultNamespace]: id_Indonesian,
  },
  ko_Korean: {
    [defaultNamespace]: ko_Korean,
  },
  pt_Portuguese: {
    [defaultNamespace]: pt_Portuguese,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  keySeparator: false,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});
