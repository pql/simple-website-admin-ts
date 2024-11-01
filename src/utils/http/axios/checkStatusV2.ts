import type { ErrorMessageMode } from '#/axios';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';
import projectSetting from '@/settings/projectSetting';
import { SessionTimeoutProcessingEnum } from '@/enums/appEnum';
import { UserStore } from '@/store/modules/user';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  // const { t } = useI18n();
  // const userStore = UserStore.useStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined);
      // // errMessage = msg || t('Unified.texts.sys:api:errMsg401');
      // errMessage = msg || '用户没有权限（令牌、用户名、密码错误）！';
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true);
      // } else {
      //   // 被动登出，带redirect地址
      //   userStore.logout(false);
      // }
      errMessage = msg || 'User has no permissions (wrong token, username, password)!';
      setTimeout(() => {
        window.location.href = `${location.protocol}//${location.host}/signout-callback`;
      }, 1000);
      break;
    case 403:
      // errMessage = t('Unified.texts.sys:api:errMsg403');
      errMessage = 'The user is authorized, but access is forbidden!';
      break;
    // 404请求不存在
    case 404:
      // errMessage = t('Unified.texts.sys:api:errMsg404');
      errMessage = 'Network request error, the resource could not be found!';
      break;
    case 405:
      // errMessage = t('Unified.texts.sys:api:errMsg405');
      errMessage = 'Network request error, request method not allowed!';
      break;
    case 408:
      // errMessage = t('Unified.texts.sys:api:errMsg408');
      errMessage = 'Network request timed out!';
      break;
    case 500:
      // errMessage = t('Unified.texts.sys:api:errMsg500');
      errMessage = 'Server error, please contact administrator!';
      break;
    case 501:
      // errMessage = t('Unified.texts.sys:api:errMsg501');
      errMessage = 'Network not implemented!';
      break;
    case 502:
      // errMessage = t('Unified.texts.sys:api:errMsg502');
      errMessage = 'Network error!';
      break;
    case 503:
      // errMessage = t('Unified.texts.sys:api:errMsg503');
      errMessage = 'Service unavailable, server temporarily overloaded or maintenance!';
      break;
    case 504:
      // errMessage = t('Unified.texts.sys:api:errMsg504');
      errMessage = 'Network timeout!';
      break;
    case 505:
      // errMessage = t('Unified.texts.sys:api:errMsg505');
      errMessage = 'The http version does not support this request!';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // createErrorModal({ title: t('Unified.texts.sys:api:errorTip'), content: errMessage });
      createErrorModal({ title: 'Error message', content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
