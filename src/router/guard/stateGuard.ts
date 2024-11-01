import type { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { removeTabChangeListener } from '@/logics/mitt/routeChange';
import { UserStore } from '@/store/modules/user';
import { AppStore } from '@/store/modules/app';
import { MultipleTabStore } from '@/store/modules/multipleTab';
import { PermissionStore } from '@/store/modules/permission';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const tabStore = MultipleTabStore.useStore();
      const userStore = UserStore.useStore();
      const appStore = AppStore.useStore();
      const permissionStore = PermissionStore.useStore();
      appStore.resetAllState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
