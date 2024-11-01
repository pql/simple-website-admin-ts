import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '#/config';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_HANS: 'zh-Hans',
  EN: 'en',
  AR: 'ar',
  CS: 'cs',
  FI: 'fi',
  HU: 'hu',
  EN_GB: 'en-GB',
  FR: 'fr',
  HI: 'hi',
  IT: 'it',
  PT_BR: 'pt-BR',
  RU: 'ru',
  SK: 'sk',
  TR: 'tr',
  ES: 'es',
  DE_DE: 'de-DE',
  ZH_HANT: 'zh-Hant',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.EN,
  // Default locale
  fallback: LOCALE.EN,
  // available Locales
  availableLocales: [LOCALE.ZH_HANS, LOCALE.EN],
};

// locale list
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
