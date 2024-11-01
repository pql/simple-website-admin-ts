import { AppConsts } from '@/abpPro/AppConsts';
import { environment } from '/@/environments/environment';
import httpClient from '@/shared/utils/http-client';
import BasicConfigInstance from '../config/basic-config';

export class AppConfigService {
  public static appConfig;
  public static async getAppConfig() {
    // 拼接appconfig.json
    let envName = '';
    if (environment.production) {
      envName = 'prod';
    } else {
      envName = 'dev';
    }
    const url = '/assets/appconfig.' + envName + '.json';
    try {
      if (this.appConfig) {
        return this.appConfig;
      }
      const { data } = await httpClient.get(url);
      AppConsts.appBaseUrl = window.location.protocol + '//' + window.location.host;
      AppConsts.remoteServiceBaseUrl = data.remoteServiceBaseUrl;
      AppConsts.authorityServiceBaseUrl = data.authorityServiceBaseUrl;
      AppConsts.oidcClientId = data.oidcClientId;
      AppConsts.uploadApiUrl = data.uploadApiUrl;
      AppConsts.cardLabelBaseUrl = data.cardLabelBaseUrl;
      AppConsts.avueUrl = data.avueUrl;
      BasicConfigInstance.remoteServiceBaseUrl = data.remoteServiceBaseUrl;
      this.appConfig = data;
      return data;
    } catch (error) {
      alert(`初始化配置信息出错,错误信息:\n\n${error.message}`);
    }
  }
}
const appConfigService = new AppConfigService();
export default appConfigService;
