import { UserManager, SigninRedirectArgs, SignoutSilentArgs } from 'oidc-client-ts';
import { AppConfigService } from '@/shared/abp/appconfig.service';
import { AppConsts } from '@/abpPro/AppConsts';
import { UserStore } from '/@/store/modules/user';
import httpClient from '@/shared/utils/http-client';
import { getToken } from '../auth';

import axios from 'axios';
import qs from 'qs';
import { request as __request } from '@/apis/core/request';
import type { CancelablePromise } from '@/apis/core/CancelablePromise';
import { OpenAPI } from '@/apis/core/OpenAPI';
import {
  QueryAccount_Security_Logs_Dto,
  QueryAccount_Profile_Picture_Dto,
  QueryAccount_Change_Password_Dto,
  PostConnect_Token_Dto,
  QueryAccount_MyProfile_Dto,
  QueryDelegated_Users_Dto,
  QueryMyDelegated_Users_Dto,
  QueryAssociation_Account_Dto,
} from '@/apis/customModels/Account_Security_Logs_Dto';

const { authorityServiceBaseUrl, appBaseUrl, oidcClientId, remoteServiceBaseUrl } = AppConsts;

// 设置日志级别为 DEBUG，并将日志输出到控制台
// Log.level = Log.DEBUG;
// Log.logger = console;

// 预留oidc接口
// 用于可能的SSO
// yarn add oidc-client

export const getOidcSettings = async () => {
  if (!AppConfigService.appConfig) {
    await AppConfigService.getAppConfig();
  }
  return {
    authority: authorityServiceBaseUrl,
    client_id: oidcClientId,
    client_secret: '',
    response_type: 'code',
    scope: 'offline_access openid profile email phone Unified',
    redirect_uri: appBaseUrl,
    disablePKCE: true,
    requestTimeoutInSeconds: 60,
    post_logout_redirect_uri: `${location.protocol}//${location.host}/signout-callback`,
    automaticSilentRenew: true,
    silent_redirect_uri: `${location.protocol}//${location.host}/silent-renew`,
  };
};

export const mgr = new UserManager(await getOidcSettings());

export class OidcClient {
  public static signinRedirect(args?: SigninRedirectArgs) {
    return mgr.signinRedirect(args);
  }
  public static signinCallback(url?: string) {
    return mgr.signinCallback(url);
  }
  // public static signoutSilent(args?: SignoutSilentArgs) {
  //   return mgr.signoutSilent(args);
  // }

  public static signinSilentCallback() {
    return mgr.signinSilentCallback();
  }

  public static signoutRedirect() {
    const userStore = UserStore.useStore();
    mgr.revokeTokens(['access_token', 'refresh_token']);
    return mgr.signoutRedirect({ id_token_hint: userStore.getToken });
  }

  public static connectToken(param: PostConnect_Token_Dto) {
    const userStore = UserStore.useStore();
    return mgr.metadataService.getTokenEndpoint().then(async (item) => {
      if (item) {
        const formData: any = {
          grant_type: 'Impersonation',
          scope: mgr.settings.scope,
          client_id: mgr.settings.client_id,
          access_token: userStore.getToken,
        };

        if (param.userId) {
          formData.UserId = param.userId;
        } else if (param.tenantId) {
          formData.TenantId = param.tenantId;
          formData.TenantUserName = param.userName;
        } else if (param.userDelegationId) {
          formData.UserDelegationId = param.userDelegationId;
        } else if (param.linkUserId) {
          formData.grant_type = 'LinkLogin';
          formData.LinkUserId = param.linkUserId;
        }

        const response = await axios.post(item, qs.stringify(formData), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.status == 200) {
          return response.data.access_token;
        }
        return null;
      }
    });
  }

  // 获取用户审计日志
  public static getApiAccountSecurityLogs({
    startTime,
    endTime,
    applicationName,
    identity,
    action,
    userName,
    clientId,
    correlationId,
    skipCount,
    maxResultCount,
    extraProperties,
  }: {
    startTime?: string;
    endTime?: string;
    applicationName?: string;
    identity?: string;
    action?: string;
    userName?: string;
    clientId?: string;
    correlationId?: string;
    skipCount?: number;
    maxResultCount?: number;
    extraProperties?: Record<string, any>;
  }): CancelablePromise<QueryAccount_Security_Logs_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/security-logs',
      query: {
        StartTime: startTime,
        EndTime: endTime,
        ApplicationName: applicationName,
        Identity: identity,
        Action: action,
        UserName: userName,
        ClientId: clientId,
        CorrelationId: correlationId,
        SkipCount: skipCount,
        MaxResultCount: maxResultCount,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 委托用户
  public static getDelegatedUsers(): CancelablePromise<QueryDelegated_Users_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/user-delegation/delegated-users',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 委托用户新增
  public static postDelegatedUsers(datas: {
    targetUserId: string;
    startTime: string;
    endTime: string;
  }): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: `/api/account/user-delegation/delegate-new-user`,
      body: datas,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 委托用户删除
  public static deleteDelegatedUsers({
    id,
  }: {
    id: string;
  }): CancelablePromise<QueryDelegated_Users_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: `/api/account/user-delegation/delete-delegation?id=${id}`,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 我的委托用户
  public static getMyDelegatedUsers(): CancelablePromise<QueryMyDelegated_Users_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/user-delegation/my-delegated-users',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 关联账户
  public static getAssociationAccount(): CancelablePromise<QueryAssociation_Account_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/link-user',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 关联账户删除
  public static deleteAssociationAccount(datas: {
    userId?: string;
    tenantId?: string;
  }): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: `/api/account/link-user/unlink`,
      body: datas,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  // 关联账户Token
  public static generateLinkToken(): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: `/api/account/link-user/generate-link-token`,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  /* 获取头像 */
  public static getApiAccountProfilePicture({
    useId,
  }: {
    useId: string;
  }): CancelablePromise<QueryAccount_Profile_Picture_Dto> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: `/api/account/profile-picture/${useId}`,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  /* 更换头像 */
  public static postApiAccountProfilePicture(file: any): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      headers: {
        'Content-Type': 'multipart/form-data', // 必须设置为 multipart/form-data
      },
      method: 'POST',
      url: '/api/account/profile-picture',
      body: file,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  /* 修改密码 */
  public static postApiAccountChangePassword(
    requestBody: QueryAccount_Change_Password_Dto,
  ): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: '/api/account/my-profile/change-password',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  public static putApiAccountMyProfile(
    requestBody: QueryAccount_MyProfile_Dto,
  ): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'PUT',
      url: '/api/account/my-profile',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  public static pgetApiAccountMyProfile(): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/my-profile',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  /* 获取时区 */
  public static getApiAccountTimezones(): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/my-profile/timezones',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  /* 获取验证码 */
  public static getApiAuthenticatorInfo(): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'GET',
      url: '/api/account/authenticator-info',
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  /* 获取验证码 */
  public static postApiVerifyAuthenticatorCode(requestBody: any): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: '/api/account/verify-authenticator-code',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  public static postSendPhoneNumberConfirmationToken(requestBody: any): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: '/api/account/send-phone-number-confirmation-token',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  public static postConfirmPhoneNumber(requestBody: any): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: '/api/account/confirm-phone-number',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }

  public static postSendEmailConfirmationToken(requestBody: any): CancelablePromise<any> {
    const _openAPI = JSON.parse(JSON.stringify(OpenAPI));
    _openAPI.BASE = mgr.settings.authority;
    return __request(_openAPI, {
      method: 'POST',
      url: '/api/account/send-email-confirmation-token',
      body: requestBody,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Server Error`,
        501: `Not Implemented`,
      },
    });
  }
  /* 用户列表-声明保存*/
  public static putApiIdentityUsersClaims({
    id,
    requestBody,
  }: {
    id: string;
    requestBody?: any[];
  }): any {
    let url = '/api/identity/users/{id}/claims';
    url = url.replace('{id}', id);

    return httpClient.request({
      baseURL: remoteServiceBaseUrl,
      method: 'PUT',
      url,
      data: requestBody,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  }
}
