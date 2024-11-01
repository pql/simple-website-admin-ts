import type { RouteRecordRaw } from 'vue-router';

import { useTabs } from './useTabs';

import { router, resetRouter } from '@/router';
// import { RootRoute } from '@/router/routes';

import projectSetting from '@/settings/projectSetting';
import { PermissionModeEnum } from '@/enums/appEnum';
import { RoleEnum } from '@/enums/roleEnum';

import { intersection } from 'lodash-es';
import { isArray } from '@/utils/is';
import { UserStore } from '@/store/modules/user';
import { AppStore } from '@/store/modules/app';
import { MultipleTabStore } from '@/store/modules/multipleTab';
import { PermissionStore } from '@/store/modules/permission';

// User permissions related operations
export function usePermission() {
  const userStore = UserStore.useStore();
  const appStore = AppStore.useStore();
  const permissionStore = PermissionStore.useStore();
  const { closeAll } = useTabs(router);

  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        appStore.projectConfig?.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * 重置和重新获得权限资源信息
   */
  async function resume() {
    resumeMax();
    closeAll();
  }
  async function resumeMax() {
    const tabStore = MultipleTabStore.useStore();
    tabStore.clearCacheTabs();
    resetRouter();

    // 动态加载路由（再次）
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    permissionStore.setLastBuildMenuTime();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    // Visible by default
    if (!value) {
      return def;
    }

    const permMode = appStore.getProjectConfig.permissionMode;

    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return permissionStore.getPermCodeList?.includes(value as RoleEnum);
      }
      return (intersection(value, permissionStore.getPermCodeList) as RoleEnum[]).length > 0;
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList as string[];
      if (!isArray(value)) {
        const splits = ['||', '&&'];
        const splitName = splits.find((item) => value.includes(item));
        if (splitName) {
          const splitCodes = value.split(splitName);
          return splitName === splits[0]
            ? intersection(splitCodes, allCodeList).length > 0
            : intersection(splitCodes, allCodeList).length === splitCodes.length;
        }
        return allCodeList.includes(value);
      }
      return (intersection(value, allCodeList) as string[]).length > 0;
    }
    return true;
  }

  /**
   * Change roles
   * @param roles
   */
  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
      throw new Error(
        'Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!',
      );
    }

    if (!isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    await resume();
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  async function refreshMenuMax() {
    resumeMax();
  }

  return {
    changeRole,
    hasPermission,
    togglePermissionMode,
    refreshMenu,
    refreshMenuMax,
  };
}
