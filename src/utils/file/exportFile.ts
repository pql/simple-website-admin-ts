import {
  CancelablePromise,
  UserService,
  EnumService,
  FireBytes_Unified_SysTem_WaveEnumCommon_EnumMap,
  ExcelCommonService,
} from '@/apis';
import { useMessage } from '@/hooks/web/useMessage';
import { downloadByData } from './download';
import httpClient from '@/shared/utils/http-client';
import { AppConsts } from '@/abpPro/AppConsts';
import { l } from '@/shared/i18n';
import { getToken } from '../auth';
import { AxiosRequestConfig } from 'axios';

const { notification } = useMessage();

/** 用户导出文件token请求 */
const getApiIdentityUsersDownloadToken = UserService.getApiIdentityUsersDownloadToken;

export type ExportFileOption = {
  /** 获取导出文件的token请求 */
  getOutputStreamToken: CancelablePromise<any>;
  /** 【导出，下载】配置 */
  config: AxiosRequestConfig;
};
/**
 * 【导出,下载】文件 公共函数
 * @param config axios配置
 * @param filename 文件名
 */
export const exportFile = async (options: ExportFileOption, filename: string = 'FileName') => {
  const { getOutputStreamToken, config } = options;
  // url 【导出，下载】接口路径
  // method 请求方法
  // params 【导出，下载】参数
  const { url, method, params, ...o } = config;
  try {
    const { token } = await getOutputStreamToken;
    // const { token } = await UserService.getApiIdentityUsersDownloadToken();
    if (!token) return;

    const response = await httpClient[method ?? 'get'](url, {
      baseURL: AppConsts.remoteServiceBaseUrl,
      params: { ...(params ?? {}), token },
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      responseType: 'blob',
      ...o,
    });

    const data = response.data;
    downloadByData(data, filename);
    notification.success({ message: l('ExportSuccessfully') });
  } catch (error) {
    console.log(error);
    notification.error({ message: error });
  }
};

/**
 * 导出excel
 * @param filename 导出excel文件名
 * @param params 导出excel所需参数
 * @param config 导出excel按钮配置信息
 */

export const exportAsExcel = async (
  filename: string = 'Data.xlsx',
  params?: Recordable,
  config?: any,
) => {
  const excelEnum =
    (await EnumService.getApiEnumGetEnumMapsByName({
      name: 'ImportExportType',
    })) ?? [];
  const key = config?.args?.importExportType || 'Users';
  const foundObject = Object.values(excelEnum).find((item) => item['value'] === key);
  if (!foundObject) return;
  const options: ExportFileOption = {
    getOutputStreamToken: getApiIdentityUsersDownloadToken(),
    config: {
      url: '/api/ExcelCommon/ExportDataAsync',
      params: {
        type: foundObject['key'],
        FileName: filename,
        ...(params ?? {}),
      },
    },
  };
  await exportFile(options, filename);
};

/**
 * 导出csv
 * @param filename 导出csv文件名
 * @param params 导出csv所需参数
 */
export const exportAsCsv = async (filename: string = 'Import-Data.csv', params?: Recordable) => {
  const options: ExportFileOption = {
    getOutputStreamToken: getApiIdentityUsersDownloadToken(),
    config: {
      url: '/api/identity/users/export-as-csv',
      params: {
        filename,
        ...(params ?? {}),
      },
    },
  };
  await exportFile(options, filename);
};
