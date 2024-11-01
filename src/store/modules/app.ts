import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { ThemeEnum } from '@/enums/appEnum';
import {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  TransitionSetting,
} from '#/config';
import { ApiAddress, BeforeMiniState } from '#/store';
import { Persistent } from '@/utils/cache/persistent';
import { API_ADDRESS, APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { darkMode } from '@/settings/designSetting';
import { deepMerge } from '@/utils';
import { resetRouter } from '@/router';

interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: Nullable<ProjectConfig>;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export class AppStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app',
      state: (): AppState => ({
        darkMode: undefined,
        pageLoading: false,
        projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
        beforeMiniInfo: {},
      }),
      getters: {
        getDarkMode(state): 'light' | 'dark' | string {
          return state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode;
        },
        getPageLoading(state): boolean {
          return state.pageLoading;
        },
        getProjectConfig(state): ProjectConfig {
          return state.projectConfig || ({} as ProjectConfig);
        },
        getBeforeMiniInfo(state): BeforeMiniState {
          return state.beforeMiniInfo;
        },
        getHeaderSetting(): HeaderSetting {
          return this.getProjectConfig.headerSetting;
        },
        getMenuSetting(): MenuSetting {
          return this.getProjectConfig.menuSetting;
        },
        getTransitionSetting(): TransitionSetting {
          return this.getProjectConfig.transitionSetting;
        },
        getMultiTabsSetting(): MultiTabsSetting {
          return this.getProjectConfig.multiTabsSetting;
        },
        getApiAddress() {
          return JSON.parse(localStorage.getItem(API_ADDRESS) || '{}');
        },
      },
      actions: {
        setDarkMode(mode: ThemeEnum): void {
          this.darkMode = mode;
          localStorage.setItem(APP_DARK_MODE_KEY, mode);
        },
        setPageLoading(loading: boolean): void {
          this.pageLoading = loading;
        },
        setProjectConfig(config: DeepPartial<ProjectConfig>): void {
          this.projectConfig = deepMerge(this.projectConfig || {}, config) as ProjectConfig;
          Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },
        setBeforeMiniInfo(state: BeforeMiniState): void {
          this.beforeMiniInfo = state;
        },
        setMenuSetting(setting: Partial<MenuSetting>): void {
          this.projectConfig!.menuSetting = deepMerge(this.projectConfig!.menuSetting, setting);
          Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
        },
        async resetAllState() {
          resetRouter();
          Persistent.clearAll();
        },
        async setPageLoadingAction(loading: boolean): Promise<void> {
          if (loading) {
            clearTimeout(timeId);
            // Prevent flicker
            timeId = setTimeout(() => {
              this.setPageLoading(loading);
            }, 50);
          } else {
            this.setPageLoading(loading);
            clearTimeout(timeId);
          }
        },
        setApiAddress(config: ApiAddress): void {
          localStorage.setItem(API_ADDRESS, JSON.stringify(config));
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
