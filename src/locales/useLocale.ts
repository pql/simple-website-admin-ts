/**
 * Multi-language related operations
 */
import type { LocaleType } from '#/config';

import { i18n } from './setupI18n';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { Locale } from 'ant-design-vue/es/locale';
import { AbpApplicationLocalizationService } from '@/apis';
import { LocaleStore } from '@/store/modules/locale';

import { default as antd_zh_cn } from 'ant-design-vue/es/locale/zh_CN';
import { default as antd_en_us } from 'ant-design-vue/es/locale/en_US';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = LocaleStore.useStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = LocaleStore.useStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  const getAntdLocale = computed((): any => {
    const localeMessage = i18n.global.getLocaleMessage<{ antdLocale: Locale }>(unref(getLocale));
    if (unref(getLocale) === 'zh-Hans') {
      return localeMessage?.antdLocale ?? antd_zh_cn ?? {};
    } else {
      return localeMessage?.antdLocale ?? antd_en_us ?? {};
    }
  });

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    const { resources } = await AbpApplicationLocalizationService.getApiAbpApplicationLocalization({
      cultureName: locale,
      onlyDynamics: false,
    });
    // const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    // if (!langModule) return;
    // const { message } = langModule;
    if (!resources) return;
    globalI18n.setLocaleMessage(locale, { ...resources });
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getAntdLocale,
  };
}
