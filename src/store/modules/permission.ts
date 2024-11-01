import type { AppRouteRecordRaw, Menu } from '@/router/types';

import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { useI18n } from '@/hooks/web/useI18n';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper';
import { transformRouteToMenu } from '@/router/helper/menuHelper';

import projectSetting from '@/settings/projectSetting';

import { PermissionModeEnum } from '@/enums/appEnum';

import { asyncRoutes } from '@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

import { filter } from '@/utils/helper/treeHelper';

import { getMenuList } from '@/api/sys/menu';
import { getPermCode } from '@/api/sys/user';

import { useMessage } from '@/hooks/web/useMessage';
import { PageEnum } from '@/enums/pageEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { AUTH_KEY } from '@/enums/cacheEnum';
import { UserStore } from '@/store/modules/user';
import { AppStore } from '@/store/modules/app';

interface PermissionState {
  // Permission code list
  // 权限代码列表
  permCodeList: string[];
  // Whether the route has been dynamically added
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  // 触发菜单更新
  lastBuildMenuTime: number;
  // Backstage menu list
  // 后台菜单列表
  backMenuList: Menu[];
  // 菜单列表
  frontMenuList: Menu[];
}

export class PermissionStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-permission',
      state: (): PermissionState => ({
        // 权限代码列表
        permCodeList: [],
        // Whether the route has been dynamically added
        // 路由是否动态添加
        isDynamicAddedRoute: false,
        // To trigger a menu update
        // 触发菜单更新
        lastBuildMenuTime: 0,
        // Backstage menu list
        // 后台菜单列表
        backMenuList: [],
        // menu List
        // 菜单列表
        frontMenuList: [],
      }),
      getters: {
        getPermCodeList(state): string[] {
          return state.permCodeList.length > 0
            ? state.permCodeList
            : getAuthCache<string[]>(AUTH_KEY);
        },
        getIsDynamicAddedRoute(state): boolean {
          return state.isDynamicAddedRoute;
        },
        getLastBuildMenuTime(state): number {
          return state.lastBuildMenuTime;
        },
        getBackMenuList(state): Menu[] {
          return state.backMenuList;
        },
        getFrontMenuList(state): Menu[] {
          return state.frontMenuList;
        },
      },
      actions: {
        setPermCodeList(codeList: string[]) {
          this.permCodeList = codeList;
          setAuthCache(AUTH_KEY, codeList);
        },
        setDynamicAddedRoute(added: boolean) {
          this.isDynamicAddedRoute = added;
        },
        setLastBuildMenuTime() {
          this.lastBuildMenuTime = new Date().getTime();
        },
        setBackMenuList(list: Menu[]) {
          this.backMenuList = list;
          list?.length > 0 && this.setLastBuildMenuTime();
        },
        setFrontMenuList(list: Menu[]) {
          this.frontMenuList = list;
        },
        resetState(): void {
          this.isDynamicAddedRoute = false;
          this.permCodeList = [];
          this.backMenuList = [];
          this.lastBuildMenuTime = 0;
        },
        async changePermissionCode() {
          const codeList = await getPermCode();
          this.setPermCodeList(codeList);
        },
        // 构建路由
        async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
          const { t } = useI18n();
          const userStore = UserStore.useStore();
          const appStore = AppStore.useStoreWithOut();

          let routes: AppRouteRecordRaw[] = [];
          const roleList = toRaw(userStore.getRoleList) || [];
          const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;

          // 路由过滤器 在 函数filter 作为回调传入遍历使用
          const routeFilter = (route: AppRouteRecordRaw) => {
            const { meta } = route;
            // 抽出角色
            const { roles } = meta || {};
            if (!roles) return true;
            // 进行角色权限判断
            return roleList.some((role) => roles.includes(role));
          };

          const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
            const { meta } = route;
            // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
            const { ignoreRoute } = meta || {};
            // arr.filter 返回 true 表示该元素通过测试
            return !ignoreRoute;
          };

          /**
           * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
           * */
          const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
            if (!routes || routes.length === 0) return;
            let homePath: string = PageEnum.BASE_HOME;

            function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
              if (parentPath) parentPath = parentPath + '/';
              routes.forEach((route: AppRouteRecordRaw) => {
                const { path, children, redirect } = route;
                const currentPath = path.startsWith('/') ? path : parentPath + path;
                if (currentPath === homePath) {
                  if (redirect) {
                    homePath = route.redirect! as string;
                  } else {
                    route.meta = Object.assign({}, route.meta, { affix: true });
                    throw new Error('end');
                  }
                }
                children && children.length > 0 && patcher(children, currentPath);
              });
            }

            try {
              patcher(routes);
            } catch (e) {
              // 已处理完毕跳出循环
            }
            return;
          };
          console.log('routes0000---------------', permissionMode);
          switch (permissionMode) {
            // 角色权限
            case PermissionModeEnum.ROLE:
              // 对非一级路由进行过滤
              routes = filter(asyncRoutes, routeFilter);
              // 对一级路由根据角色权限过滤
              routes = routes.filter(routeFilter);
              // Convert multi-level routing to level 2 routing
              // 将多级路由转换为 2 级路由
              routes = flatMultiLevelRoutes(routes);
              break;

            // 路由映射， 默认进入该case
            case PermissionModeEnum.ROUTE_MAPPING:
              const permissions = this.getPermCodeList;
              const roleRouteFilter = (route: AppRouteRecordRaw) => {
                const { meta } = route;
                const { policy } = meta || {};
                if (!policy) return true;
                return permissions == undefined || permissions.length <= 0
                  ? false //设置为true可获取全部菜单权限
                  : permissions.includes(policy as string);
              };

              // 对非一级路由进行过滤
              routes = filter(asyncRoutes, roleRouteFilter);
              // 对一级路由再次根据角色权限过滤
              routes = routes.filter(roleRouteFilter);
              routes = routes.filter(
                (e) =>
                  e.path.startsWith('/device-configuration/deviceMessagePanel') ||
                  e.children?.length != 0,
              );
              // 递归过滤空子菜单
              const filterEmptyMenus = (menus) => {
                return menus
                  .map((menu) => {
                    // 如果有子菜单，则递归过滤
                    if (menu.children && menu.children.length) {
                      menu.children = filterEmptyMenus(menu.children);
                    }
                    // 如果子菜单为空数组，则返回null
                    if (menu.children && menu.children.length === 0) {
                      return null;
                    }
                    // 如果子菜单非空或者没有子菜单，则返回原菜单
                    return menu;
                  })
                  .filter((menu) => menu !== null); // 过滤掉返回为null的菜单项
              };
              // 使用filterEmptyMenus函数过滤菜单
              routes = filterEmptyMenus(routes);
              // 将路由转换成菜单
              const menuList = transformRouteToMenu(routes, true);

              // 移除掉 ignoreRoute: true 的路由 非一级路由
              routes = filter(routes, routeRemoveIgnoreFilter);

              // 移除掉 ignoreRoute: true 的路由 一级路由；
              routes = routes.filter(routeRemoveIgnoreFilter);

              // 对菜单进行排序
              menuList.sort((a, b) => {
                return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
              });

              // 设置菜单列表
              this.setFrontMenuList(menuList);

              // Convert multi-level routing to level 2 routing
              // 将多级路由转换为 2 级路由
              routes = flatMultiLevelRoutes(routes);
              break;

            //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
            //  如果确定不需要做后台动态权限，请在下方注释整个判断
            case PermissionModeEnum.BACK:
              const { createMessage } = useMessage();

              createMessage.loading({
                content: t('Unified.texts.sys:app:menuLoading'),
                duration: 1,
              });

              // !Simulate to obtain permission codes from the background,
              // 模拟从后台获取权限码，
              // this function may only need to be executed once, and the actual project can be put at the right time by itself
              // 这个功能可能只需要执行一次，实际项目可以自己放在合适的时间
              let routeList: AppRouteRecordRaw[] = [];
              try {
                await this.changePermissionCode();
                routeList = (await getMenuList()) as AppRouteRecordRaw[];
              } catch (error) {
                console.error(error);
              }

              // Dynamically introduce components
              // 动态引入组件
              routeList = transformObjToRoute(routeList);

              //  Background routing to menu structure
              //  后台路由到菜单结构
              const backMenuList = transformRouteToMenu(routeList);
              this.setBackMenuList(backMenuList);

              // remove meta.ignoreRoute item
              // 删除 meta.ignoreRoute 项
              routeList = filter(routeList, routeRemoveIgnoreFilter);
              routeList = routeList.filter(routeRemoveIgnoreFilter);

              routeList = flatMultiLevelRoutes(routeList);
              routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
              break;
          }

          routes.push(ERROR_LOG_ROUTE);
          patchHomeAffix(routes);
          return routes;
        },
      },
    });
    return storeDefinition(pinia);
  }
  // Need to be used outside the setup
  // 需要在设置之外使用
  public static useStoreWithOut() {
    return this.useStore(store);
  }
}
