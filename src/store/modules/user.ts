import {
  OpenAPI,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto as CurrentUserDto,
  AbpApplicationConfigurationService,
} from '@/apis';
import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { BEFORE_TOKEN_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { User } from 'oidc-client-ts';
import { AbpStore } from '@/store/modules/abp';
import { isArray } from '@/utils/is';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { router } from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
import { h } from 'vue';
import { OidcClient } from '@/utils/auth/oidc';
import { OidcUserStore } from '@/store/modules/oidcUser';
import { PermissionStore } from '@/store/modules/permission';
import { message } from 'ant-design-vue';
import { PostConnect_Token_Dto } from '@/apis/customModels/Account_Security_Logs_Dto';

interface UserState {
  userInfo: Nullable<CurrentUserDto>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  /** sso标记，用于后台退出 */
  sso?: boolean;
  /** 切换用户之前的Token,存在则可选择返回上一个用户 */
  beforeToken?: string;
}

export class UserStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-user',
      state: (): UserState => ({
        // user info
        userInfo: null,
        // token
        token: undefined,
        // roleList
        roleList: [],
        // Whether the login expired
        sessionTimeout: false,
        // Last fetch time
        lastUpdateTime: 0,
        // sso
        sso: false,
        // beforeToken
        beforeToken: undefined,
      }),
      getters: {
        getSso(state): boolean {
          return state.sso === true;
        },
        getUserInfo(state): CurrentUserDto {
          return state.userInfo || getAuthCache<CurrentUserDto>(USER_INFO_KEY) || {};
        },
        getToken(state): string {
          return state.token || getAuthCache<string>(TOKEN_KEY);
        },
        getRoleList(state): RoleEnum[] {
          return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
        },
        getSessionTimeout(state): boolean {
          return !!state.sessionTimeout;
        },
        getLastUpdateTime(state): number {
          return state.lastUpdateTime;
        },
        getBeforeToken(state): string {
          return state.beforeToken || getAuthCache<string>(BEFORE_TOKEN_KEY);
        },
      },
      actions: {
        setSso(sso: boolean) {
          this.sso = sso;
        },
        setBeforeToken(token: string | undefined) {
          this.beforeToken = token ? token : '';
          setAuthCache(BEFORE_TOKEN_KEY, token);
        },
        setUserInfo(info: CurrentUserDto | null) {
          this.userInfo = info;
          this.setLastUpdateTime(new Date().getTime());
          setAuthCache(USER_INFO_KEY, info);
        },
        setToken(token: string | undefined) {
          this.token = token ? token : '';
          setAuthCache(TOKEN_KEY, token);
        },
        setRoleList(roleList: RoleEnum[]) {
          this.roleList = roleList;
          setAuthCache(ROLES_KEY, roleList);
        },
        setSessionTimeout(bool: boolean) {
          this.sessionTimeout = bool;
        },
        setLastUpdateTime(time: number) {
          this.lastUpdateTime = time;
        },
        resetState() {
          this.userInfo = null;
          this.token = '';
          this.roleList = [];
          this.sessionTimeout = false;
        },
        /**
         * @description: login
         */
        async login() // params: LoginParams & {
        //     goHome?: boolean;
        //     mode?: ErrorMessageMode;
        // },
        : Promise<CurrentUserDto | null> {
          try {
            // const { goHome = true, mode, ...loginParams } = params;
            // const data = await loginApi(loginParams, mode);
            // const { token } = data;

            // // save token
            // this.setToken(token);
            return this.afterLoginAction(true);
          } catch (error) {
            return Promise.reject(error);
          }
        },
        /**
         * @description oidc login
         */
        async oidcLogin(user: User) {
          const oidcUserStore = OidcUserStore.useStoreWithOut();
          oidcUserStore.setUser(user);
          const { access_token, token_type } = oidcUserStore.user;
          this.setToken(access_token);
          OpenAPI.TOKEN = access_token;
          // OpenAPI.HEADERS = {
          //   Authorization: `${token_type} ${access_token}`,
          // };
          return this.afterLoginAction(true);
        },
        /**
         *
         * @param goHome 是否返回首页
         * @returns
         */
        async afterLoginAction(goHome?: boolean): Promise<CurrentUserDto | null> {
          if (!this.getToken) return null;
          // get user info
          const userInfo = await this.getUserInfoAction();
          const sessionTimeout = this.sessionTimeout;
          if (sessionTimeout) {
            this.setSessionTimeout(false);
          } else {
            const permissionStore = PermissionStore.useStore();

            // 动态路由加载（首次）
            if (!permissionStore.isDynamicAddedRoute) {
              const routes = await permissionStore.buildRoutesAction();
              [...routes, PAGE_NOT_FOUND_ROUTE].forEach((route) => {
                router.addRoute(route as unknown as RouteRecordRaw);
              });
              // 记录动态路由加载完成
              permissionStore.setDynamicAddedRoute(true);
            }
            goHome && (await router.replace(PageEnum.BASE_HOME));
          }
          return userInfo;
        },
        async getUserInfoAction(): Promise<CurrentUserDto | null> {
          if (!this.getToken) return null;

          const abpStore = AbpStore.useStore();
          const permissionStore = PermissionStore.useStoreWithOut();

          let currentUser = abpStore.getApplication.currentUser;

          // 没有用户信息时，重新获取一次配置信息
          if (currentUser?.id == null || currentUser?.id == undefined) {
            const application =
              await AbpApplicationConfigurationService.getApiAbpApplicationConfiguration({
                includeLocalizationResources: false,
              });
            abpStore.setApplication(application);
            currentUser = application.currentUser;
            const permiss = Object.keys(abpStore.getApplication.auth?.grantedPolicies as object);
            await permissionStore.setPermCodeList(permiss);
            await permissionStore.buildRoutesAction();
          }

          if (isArray(currentUser?.roles)) {
            const roleList = currentUser?.roles.map((item) => item) as RoleEnum[];
            this.setRoleList(roleList);
          } else {
            currentUser!.roles = [];
            this.setRoleList([]);
          }

          this.setUserInfo(currentUser ?? null);

          return this.userInfo;
        },
        async logout(goLogin: boolean = false) {
          if (this.getToken) {
            try {
              // Todo
              // 此处进行调用后台接口进行登出操作
              OidcClient.signoutRedirect();
            } catch {
              console.log('注销Token失败');
            }
            this.setToken(undefined);
            this.setSessionTimeout(false);
            this.setUserInfo(null);

            const abpStore = AbpStore.useStoreWithOut();
            abpStore.resetSession();
            abpStore.setApplication(abpStore.application);
          } else {
            if (goLogin) {
              // 直接回登陆页
              router.replace(PageEnum.BASE_LOGIN);
            } else {
              // 回登录页带上当前路由地址
              router.replace({
                path: PageEnum.BASE_LOGIN,
                query: {
                  redirect: encodeURIComponent(router.currentRoute.value.fullPath),
                },
              });
            }
          }
        },
        async connectToken(param: PostConnect_Token_Dto) {
          try {
            // Todo
            // 此处进行调用后台接口进行登出操作
            let key = 'connectToken';
            const { t } = useI18n();
            message.loading({ content: t('Unified.texts.SwitchAccountAwait'), key });

            let token = '';
            await OidcClient.connectToken(param)
              .then((res) => {
                token = res;
                // 关联账号登录不需要返回
                if (!param.linkUserId) this.setBeforeToken(this.getToken);
              })
              .catch((err) => {
                message.error({ content: t(err.response.data.error_description), key });
              })
              .finally(() => {});

            if (!token) return;

            this.setToken(undefined);
            this.setSessionTimeout(false);
            this.setUserInfo(null);

            const abpStore = AbpStore.useStoreWithOut();
            abpStore.resetSession();
            abpStore.setApplication(abpStore.application);

            this.setToken(token);
            this.getUserInfoAction();

            message.success({ content: t('Unified.texts.SwitchAccountSession'), key, duration: 2 });
            location.reload();
          } catch {
            console.log('connectToken');
          }
        },
        async returnMyAccount() {
          try {
            // Todo
            // 此处进行返回我的账号
            if (!this.getBeforeToken) return;

            let key = 'returnMyAccount';
            const { t } = useI18n();
            message.loading({ content: t('Unified.texts.ReturnAccountAwait'), key });

            this.setToken(undefined);
            this.setSessionTimeout(false);
            this.setUserInfo(null);

            const abpStore = AbpStore.useStoreWithOut();
            abpStore.resetSession();
            abpStore.setApplication(abpStore.application);

            this.setToken(this.getBeforeToken);
            this.getUserInfoAction();

            this.setBeforeToken(undefined);

            message.success({ content: t('Unified.texts.ReturnAccountSession'), key, duration: 2 });
            location.reload();
          } catch {
            console.log('returnMyAccount');
          }
        },
        generateLinkToken(linkUserId: string) {
          const { t } = useI18n();
          let key = 'generateLinkToken';

          message.loading({ content: t('Unified.texts.ReturnAccountAwait'), key });
          OidcClient.generateLinkToken()
            .then((res) => {})
            .catch((err) => {
              message.error({ content: t(err.response.data.error_description), key });
            })
            .finally(() => {});

          message.success({ content: t('Unified.texts.ReturnAccountSession'), key, duration: 2 });
        },
        /**
         * @description: Confirm before logging out
         */
        confirmLoginOut() {
          const { createConfirm } = useMessage();
          const { t } = useI18n();
          createConfirm({
            iconType: 'warning',
            title: () => h('span', t('Unified.texts.LogoutTip')),
            content: () => h('span', t('Unified.texts.LogoutMessage')),
            onOk: async () => {
              // 主动登出，不带redirect地址
              await this.logout(true);
              const abpStore = AbpStore.useStoreWithOut();
              abpStore.resetSession();
              abpStore.setApplication(abpStore.application);
            },
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
