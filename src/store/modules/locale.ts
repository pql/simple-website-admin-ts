import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import type { LocaleSetting, LocaleType } from '#/config';
import { createLocalStorage } from '@/utils/cache';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import { localeSetting } from '@/settings/localeSetting';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export class LocaleStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-locale',
      state: (): LocaleState => ({
        localInfo: lsLocaleSetting,
      }),
      getters: {
        getShowPicker(state): boolean {
          return !!state.localInfo?.showPicker;
        },
        getLocale(state): LocaleType {
          return state.localInfo?.locale ?? 'en';
        },
      },
      actions: {
        /**
         * Set up multilingual information and cache
         * @param info multilingual info
         */
        setLocaleInfo(info: Partial<LocaleSetting>) {
          this.localInfo = { ...this.localInfo, ...info };
          ls.set(LOCALE_KEY, this.localInfo);
        },
        initLocale() {
          this.setLocaleInfo({
            ...localeSetting,
            ...this.localInfo,
          });
        },
      },
    });
    return storeDefinition(pinia);
  }
  // Need to be used outside the setup
  public static useStoreWithOut() {
    return this.useStore(store);
  }
}
