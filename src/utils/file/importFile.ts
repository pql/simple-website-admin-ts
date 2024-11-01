import { AppConsts } from '@/abpPro/AppConsts';
import { Volo_Abp_Identity_ImportUsersFromFileType } from '@/apis';
import httpClient from '@/shared/utils/http-client';

/**
 * 下载模板文件
 */
export const importUsersSampleFile = async (data: {
  token: string;
  fileType?: Volo_Abp_Identity_ImportUsersFromFileType;
}) => {
  const url = '/api/identity/users/import-users-sample-file';

  const res = await httpClient.request({
    method: 'GET',
    baseURL: AppConsts.remoteServiceBaseUrl,
    url,
    params: {
      Token: data.token,
      FileType: data.fileType,
    },
    responseType: 'blob',
  });

  return res.status === 200 && res.data;
};
