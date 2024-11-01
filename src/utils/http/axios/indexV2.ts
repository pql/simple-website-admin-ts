// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import { deepMerge, setObjToUrlParams } from '@/utils';
import { unref } from 'vue';
import { VAxios } from './Axios';
import { clone } from 'lodash-es';
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { RequestOptions, Result } from '#/axios';
import { RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { isString, isUndefined, isNull, isEmpty } from '@/utils/is';
import { joinTimestamp, formatRequestDate, formatResponseDate } from './helper';
import { useI18n } from '@/hooks/web/useI18n';
import { getToken } from '@/utils/auth';
import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from '@/hooks/web/useMessage';
import { checkStatus } from './checkStatusV2';
import { ErrorLogStore } from '@/store/modules/errorLog';
import { useLocale } from '@/locales/useLocale';
import { AxiosRetry } from './axiosRetry';

import { AppConfigService } from '@/shared/abp/appconfig.service';
import { AppConsts } from '@/abpPro/AppConsts';

if (!AppConfigService.appConfig) {
  await AppConfigService.getAppConfig();
}

const { remoteServiceBaseUrl } = AppConsts;

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal, createSuccessModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    // const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse, formatDate } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    const { data, status } = res;
    if (!data && (status < 200 || status >= 300)) {
      // return '[HTTP] Request has no return value';
      // throw new Error(t('Unified.texts.sys:api:apiRequestFailed'));
      throw new Error('The request failed. Please try again later');
    }

    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data != null && status >= 200 && status < 300;
    if (hasSuccess) {
      let successMsg = message;
      if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
        // successMsg = t(`Unified.texts.sys:api:operationSuccess`);
        successMsg = 'Successful operation';
      }

      if (options.successMessageMode === 'modal') {
        // createSuccessModal({ title: t('Unified.texts.sys:api:successTip'), content: successMsg });
        createSuccessModal({ title: 'Success tip', content: successMsg });
      } else if (options.successMessageMode === 'message') {
        createMessage.success(successMsg);
      }

      /**
       * 格式化相应数据日期类型当前时区的时间
       */
      // formatDate && formatResponseDate(data);

      return data;
    }

    // 在此处根据自己项目的实际情况对不同的status执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (status) {
      case ResultEnum.TIMEOUT:
        // timeoutMsg = t('Unified.texts.sys:api:timeoutMessage');
        timeoutMsg = 'Login timeout, please login again!';
        setTimeout(() => {
          window.location.href = `${location.protocol}//${location.host}/signout-callback`;
        }, 1000);
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({
        // title: t('Unified.texts.sys:api:errorTip'),
        title: 'Error prompt',
        content: timeoutMsg,
      });
    } else if (options.errorMessageMode === 'message') {
      // createMessage.error(timeoutMsg || t('Unified.texts.sys:api:apiRequestFailed'));
      createMessage.error(timeoutMsg);
    }

    // throw new Error(timeoutMsg || t('Unified.texts.sys:api:apiRequestFailed'));
    throw new Error(timeoutMsg || 'The request failed. Please try again later');
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    // if (apiUrl && isString(apiUrl)) {
    //   config.url = `${apiUrl}${config.url}`;
    // }

    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    formatDate && params && !isString(params) && formatRequestDate(params);
    if (
      config.method?.toUpperCase() === RequestEnum.GET ||
      config.method?.toUpperCase() === RequestEnum.DELETE
    ) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    const flag = {
      en: 'en-US',
      fr: 'fr-FR',
      'zh-Hant': 'zh-Hant',
      'zh-Hans': 'zh-CN',
      es: 'es-ES',
      ar: 'ar-SA',
    } as object;
    // 设置语言
    const { getLocale } = useLocale();
    const lang = unref(getLocale);
    (config as Recordable).headers['Accept-Language'] = flag[lang];
    return config;
  },

  /**x
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch(axiosInstance: AxiosInstance, error: any) {
    const { t } = useI18n();
    const errorLogStore = ErrorLogStore.useStoreWithOut();
    errorLogStore.addAjaxErrorInfo(error);
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.statusText ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        // errMessage = t('Unified.texts.sys:api:apiTimeoutMessage');
        errMessage = 'Interface request timed out, please refresh the page and try again!';
      }
      if (err?.includes('Network Error')) {
        // errMessage = t('Unified.texts.sys:api:networkExceptionMsg');
        errMessage =
          'The network is abnormal, please check whether your network connection is normal!';
      }

      if (response?.data?.error?.message) {
        console.log('error', error);
        errMessage = response?.data?.error?.message;
      }
      //为了anglar接口的错误信息做单独处理
      if (response && response.status == 403) {
        const code = response?.data?.error?.code?.replace('.', ':').replace('.', ':');
        let valuesArray = [];
        if (response?.data?.error.data) {
          valuesArray = Object.values(response?.data?.error.data);
        }
        errMessage = t(`Unified.texts.${code}`, valuesArray);
      }
      if (errMessage) {
        if (errorMessageMode === 'modal') {
          // createErrorModal({ title: t('Unified.texts.sys:api:errorTip'), content: errMessage });
          createErrorModal({ title: 'Error message', content: errMessage });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);

    // 添加自动重试机制，保险起见，只针对 GET 请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      error?.response?.status !== 401 &&
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: 'Bearer',
        timeout: 20 * 1000,
        // 基础接口地址
        baseURL: remoteServiceBaseUrl,
        transform: clone(transform),
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}

export const defHttp = createAxios();
