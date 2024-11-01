// import { BasicConfigInstance } from "../config";
//  import { AbpStore } from '@/store/modules/abp';
//  const abpStore = AbpStore.useStoreWithOut();
//  let currentUser = abpStore.application.currentUser;
export class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  public static readonly initialUrl = location.href;
  // /** 根据文件id获取文件url地址 */
  // public static getFileUrlById(fileId: string, download = false) {
  //   let tenantId = currentUser?.tenantId
  //   if (!!tenantId) {
  //     tenantId = ''
  //   }
  //   return BasicConfigInstance.remoteServiceBaseUrl + '/File/GetFileById?id=' + fileId + '&download=' + download + '&tenantId=' + tenantId;
  // }

  // /** 根据文件路径获取文件url地址 */
  // public static getFileUrlByPath(filePath: string, download = false) {
  //   let tenantId = currentUser?.tenantId
  //   if (!!tenantId) {
  //     tenantId = ''
  //   }
  //   return BasicConfigInstance.remoteServiceBaseUrl + '/File/GetFile?filePath=' + filePath + '&download=' + download + '&tenantId=' + tenantId;
  // }

  public static getQueryParameters(): any {
    return UrlHelper.getQueryParametersUsingParameters(document.location.search);
  }

  public static getQueryParametersUsingParameters(search: string): any {
    return search
      .replace(/(^\?)/, '')
      .split('&')
      .map(
        function (n) {
          return (n = n.split('=')), (this[n[0]] = n[1]), this;
        }.bind({}),
      )[0];
  }

  public static getQueryParametersUsingHash(): any {
    return document.location.hash
      .substr(1, document.location.hash.length - 1)
      .replace(/(^\?)/, '')
      .split('&')
      .map(
        function (n) {
          return (n = n.split('=')), (this[n[0]] = n[1]), this;
        }.bind({}),
      )[0];
  }

  public static getInitialUrlParameters(): any {
    const questionMarkIndex = UrlHelper.initialUrl.indexOf('?');
    if (questionMarkIndex >= 0) {
      return UrlHelper.initialUrl.substr(
        questionMarkIndex,
        UrlHelper.initialUrl.length - questionMarkIndex,
      );
    }

    return '';
  }

  public static getReturnUrl(): string {
    const queryStringObj = UrlHelper.getQueryParametersUsingParameters(
      UrlHelper.getInitialUrlParameters(),
    );
    if (queryStringObj.returnUrl) {
      return decodeURIComponent(queryStringObj.returnUrl);
    }

    return null as any;
  }
}
