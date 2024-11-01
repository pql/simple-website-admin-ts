import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import type { ErrorLogInfo } from '#/store';
import { formatToDateTime } from '@/utils/dateUtil';
import projectSetting from '@/settings/projectSetting';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export class ErrorLogStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-error-log',
      state: (): ErrorLogState => ({
        errorLogInfoList: null,
        errorLogListCount: 0,
      }),
      getters: {
        getErrorLogInfoList(state): ErrorLogInfo[] {
          return state.errorLogInfoList || [];
        },
        getErrorLogListCount(state): number {
          return state.errorLogListCount;
        },
      },
      actions: {
        addErrorLogInfo(info: ErrorLogInfo) {
          const item = {
            ...info,
            time: formatToDateTime(new Date()),
          };
          this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
          this.errorLogListCount += 1;
        },
        setErrorLogListCount(count: number): void {
          this.errorLogListCount = count;
        },
        /**
         * @description Triggered after ajax request error
         * @param error
         * @returns
         */
        addAjaxErrorInfo(error): void {
          const { useErrorHandle } = projectSetting;
          if (!useErrorHandle) {
            return;
          }
          const errInfo: Partial<ErrorLogInfo> = {
            message: error.message,
            type: ErrorTypeEnum.AJAX,
          };
          if (error.response) {
            const {
              config: { url = '', data: params = '', method = 'get', headers = {} } = {},
              data = {},
            } = error.response;
            errInfo.url = url;
            errInfo.name = 'Ajax Error!';
            errInfo.file = '-';
            errInfo.stack = JSON.stringify(data);
            errInfo.detail = JSON.stringify({ params, method, headers });
          }
          this.addErrorLogInfo(errInfo as ErrorLogInfo);
        },
      },
    });
    return storeDefinition(pinia);
  }
  // Need to be used outside the setup
  public static useStoreWithOut() {
    return this.useStore(store);
  }
}
