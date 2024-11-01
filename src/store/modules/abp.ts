import {
  AbpApplicationConfigurationService,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto as ApplicationConfigurationDto,
} from '@/apis';
import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { createLocalStorage } from '@/utils/cache';
import { ABP_APP_KEY } from '@/enums/cacheEnum';
import { PermissionStore } from '@/store/modules/permission';

interface AbpState {
  application: ApplicationConfigurationDto;
}

const ls = createLocalStorage();
const defaultApp = {};
const lsApplication = (ls.get(ABP_APP_KEY) || defaultApp) as ApplicationConfigurationDto;

export class AbpStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'abp',
      state: (): AbpState => ({
        application: lsApplication,
      }),
      getters: {
        getApplication(state) {
          return state.application ?? defaultApp;
        },
      },
      actions: {
        resetSession() {
          // 清除与用户相关的信息
          this.application.auth = {};
          this.application.currentUser = {};
        },
        setApplication(application: ApplicationConfigurationDto) {
          this.application = application;
          ls.set(ABP_APP_KEY, application);
        },
        async initlizeAbpApplication() {
          // if (Object.keys(this.application).length > 0) {
          //   return;
          // }
          const permissionStore = PermissionStore.useStoreWithOut();
          const application =
            await AbpApplicationConfigurationService.getApiAbpApplicationConfiguration({
              includeLocalizationResources: false,
            });
          this.setApplication(application);
          const permiss = Object.keys(application.auth?.grantedPolicies as object);
          await permissionStore.setPermCodeList(permiss);
          await permissionStore.buildRoutesAction();
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
