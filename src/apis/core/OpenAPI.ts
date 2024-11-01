/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';
// import { OidcUserStore } from '@/store/modules/oidcUser';
// import { getToken } from '@/utils/auth';
// import { AppConfigService } from '@/shared/abp/appconfig.service';
// import { AppConsts } from '@/abpPro/AppConsts';
// if (!AppConfigService.appConfig) {
//   await AppConfigService.getAppConfig();
// }
// const { remoteServiceBaseUrl } = AppConsts;

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: 'include' | 'omit' | 'same-origin';
  TOKEN?: string | Resolver<string> | undefined;
  USERNAME?: string | Resolver<string> | undefined;
  PASSWORD?: string | Resolver<string> | undefined;
  HEADERS?: Headers | Resolver<Headers> | undefined;
  ENCODE_PATH?: ((path: string) => string) | undefined;
};

// const oidcUserStore = OidcUserStore.useStoreWithOut();
export const OpenAPI: OpenAPIConfig = {
  // BASE: remoteServiceBaseUrl,
  BASE: '',
  VERSION: '1',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  // HEADERS: {
  //   Authorization: oidcUserStore.getUser.token_type + ' ' + getToken(),
  // },
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
