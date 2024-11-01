import { AppConsts } from '@/abpPro/AppConsts';
import { CustomFileDescriptorService } from '@/apis';
import { useMessage } from '@/hooks/web/useMessage';
import httpClient from '@/shared/utils/http-client';
import { downloadByData } from './download';
import { l } from '@/shared/i18n';
import { AxiosProgressEvent } from 'axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

import { getToken } from '../auth';

const { notification } = useMessage();

/**
 * 获取下载该文件的令牌
 * @param params
 * @returns string
 */
export const getDownloadToken = async (fileDescriptorId: string) => {
  try {
    const res = await CustomFileDescriptorService.getApiAppCustomFileDescriptorDownloadToken({
      id: fileDescriptorId,
    });
    return res?.token;
  } catch (error) {
    notification.error({ message: error });
  }
};

export const getFileDescriptorDownload = async (fileDescriptorId: string, token: string) => {
  let url = '/api/app/custom-file-descriptor/download/{id}';
  url = url.replace('{id}', fileDescriptorId);

  const res = await httpClient.get(url, {
    baseURL: AppConsts.remoteServiceBaseUrl,
    params: { token },
    responseType: 'blob',
  });

  return res.status === 200 && res.data;
};

export const downloadFile = async (fileDescriptorId: string, filename: string, mime?: string) => {
  const token = await getDownloadToken(fileDescriptorId);
  if (!token) return;
  try {
    const data = await getFileDescriptorDownload(fileDescriptorId, token);
    downloadByData(data, filename, mime);
    notification.success({ message: l('DownloadSuccessfully') });
  } catch (error) {
    const errorBlob = error?.response?.data;
    const reader = new FileReader();
    // 设置FileReader的onload事件处理函数，当读取操作完成时会调用这个函数
    reader.onload = (event: any) => {
      // 使用event.target.result获取转换后的字符串
      const result = event?.target?.result;
      const reason = JSON.parse(result);
      notification.error({ message: reason?.error?.message });
    };
    reader.readAsText(errorBlob, 'UTF-8');
  }
};

/**
 * @description: Upload interface
 */
export const fileDescriptorUpload = async (
  uploadParams = {} as {
    name?: string;
    directoryId?: string;
    overrideExisting?: boolean;
    extraProperties?: Record<string, any>;
    formData: {
      File?: Blob;
    };
  },
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  return httpClient.request({
    method: 'POST',
    baseURL: AppConsts.remoteServiceBaseUrl,
    url: '/api/app/custom-file-descriptor/upload',
    params: {
      name: uploadParams?.name,
      directoryId: uploadParams?.directoryId,
      overrideExisting: uploadParams?.overrideExisting,
      extraProperties: uploadParams?.extraProperties,
    },
    data: uploadParams.formData,
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
      Authorization: 'Bearer ' + getToken(),
      // @ts-ignore
      ignoreCancelToken: true,
    },
    onUploadProgress,
  });
};
