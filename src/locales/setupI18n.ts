import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '@/settings/localeSetting';
import { AbpApplicationLocalizationService } from '@/apis';
import { LocaleStore } from '@/store/modules/locale';

const { fallback, availableLocales } = localeSetting;

// 使用泛型创建一个函数，将属性和值转换为键值对
export function toKeyValueEnum<T>(data: T): { [K in keyof T]: T[K] } {
  return Object.keys(data as object).reduce(
    (acc, key) => {
      acc[key] = { ...data[key] };
      return acc;
    },
    {} as { [K in keyof T]: T[K] },
  );
}

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = LocaleStore.useStoreWithOut();
  const locale = localeStore.getLocale;
  // const defaultLocal = await import(`./lang/${locale}.ts`);
  // const message = defaultLocal.default?.message ?? {};
  const { resources } = await AbpApplicationLocalizationService.getApiAbpApplicationLocalization({
    cultureName: locale,
    onlyDynamics: false,
  });

  // 使用泛型创建一个函数，将接口的属性和值转换为键值对
  const transformedMessage = toKeyValueEnum(resources);
  console.log('I18n Json Map: ', transformedMessage);

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: { ...transformedMessage },
    },
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
const options = await createI18nOptions();
export const i18n: ReturnType<typeof createI18n> = createI18n(options);
export async function setupI18n(app: App) {
  app.use(i18n);
}
