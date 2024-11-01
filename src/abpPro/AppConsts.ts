/**
 * 应用使用的常量
 */
export class AppConsts {
  /**
   * 远程服务器地址
   */
  public static remoteServiceBaseUrl: string;

  /**
   * 单点登录远程服务器地址
   */
  public static authorityServiceBaseUrl: string;

  /**
   * 单点登录 ClientId
   */
  public static oidcClientId: string;

  /**
   * 当前应用地址
   */
  public static appBaseUrl: string;

  /**
   * 上传文件api路径
   */
  public static uploadApiUrl = '/api/file-management/file-descriptor/upload';

  /** 卡片设计器服务器路径 */
  public static cardLabelBaseUrl = 'http://localhost:44355';
  /**
   * Avue地址
   */
  public static avueUrl: string;
}
