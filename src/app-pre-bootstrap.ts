import { AppConfigService } from '@/shared/abp/appconfig.service';

/** 应用启动预加载器 */
export class AppPreBootstrap {
  public static async run(callback: () => void) {
    // 获取客户端基础配置
    await AppPreBootstrap.getApplicationConfig();
    await AppPreBootstrap.getUserConfiguration();
    callback();
  }
  /**
   * 初始化前端基本配置
   * @param callback
   */
  public static async getApplicationConfig() {
    AppConfigService.getAppConfig();
  }
  /**
   * 获取后端配置
   * @param callback 回调函数
   */
  public static async getUserConfiguration() {}
}
