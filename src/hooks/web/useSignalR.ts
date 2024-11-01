import * as signalR from '@microsoft/signalr';
import { useMessage } from '@/hooks/web/useMessage';
import { UserStore } from '@/store/modules/user';
import { AppConfigService } from '@/shared/abp/appconfig.service';
import { AppConsts } from '@/abpPro/AppConsts';
import eventBus from '@/utils/eventBus';

if (!AppConfigService.appConfig) {
  await AppConfigService.getAppConfig();
}
const { remoteServiceBaseUrl } = AppConsts;

let connection: signalR.HubConnection;
export function useSignalR() {
  /**
   * 开始连接SignalR
   */
  async function startConnect() {
    try {
      connectionsignalR();
      await connection.start();
    } catch (err) {
      console.log(err);
      setTimeout(() => startConnect(), 5000);
    }
  }

  /**
   * 关闭SignalR连接
   */
  function closeConnect(): void {
    if (connection) {
      connection.stop();
    }
  }

  async function connectionsignalR() {
    const userStore = UserStore.useStoreWithOut();
    const token = userStore.getToken;
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${remoteServiceBaseUrl}/SignalR/Notification`, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          //重连规则：重连次数<300：间隔1s;重试次数<3000:间隔3s;重试次数>3000:间隔30s
          const count = retryContext.previousRetryCount / 300;
          if (count < 1) {
            //重试次数<300,间隔1s
            return 1000;
          } else if (count < 10) {
            //重试次数>300:间隔5s
            return 1000 * 5;
          } //重试次数>3000:间隔30s
          else {
            return 1000 * 30;
          }
        },
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    //接收普通文本消息
    connection.on('ReceiveTextMessageAsync', ReceiveTextMessageHandlerAsync);
    //接收广播消息
    connection.on('ReceiveBroadCastMessageAsync', ReceiveBroadCastMessageHandlerAsync);
    //刷新messagePanel contoel panel
    connection.on('RefreshMessagePanel', RefreshMessagePanel);
    //刷新设备状态
    connection.on('RefreshDeviceStatus', RefreshDeviceStatus);
    //接收设备人脸信息
    connection.on('RefreshPassportKioskMessage', RefreshPassportKioskMessage);
  }

  /**
   * 接收文本消息
   * @param message 消息体
   */
  function ReceiveTextMessageHandlerAsync(message: any) {
    console.log('接收文本消息');
    console.log(message);
    const { notification } = useMessage();
    if (message.messageLevel == 10) {
      notification.warn({
        message: message.title,
        description: message.content,
      });
    }
    if (message.messageLevel == 20) {
      notification.info({
        message: message.title,
        description: message.content,
      });
    }
    if (message.messageLevel == 30) {
      notification.error({
        message: message.title,
        description: message.content,
      });
    }
  }

  /**
   * 接收广播消息
   * @param message 消息体
   */
  function ReceiveBroadCastMessageHandlerAsync(message: any) {
    console.log('接收广播消息');
    console.log(message);
    const { notification } = useMessage();
    if (message.messageLevel == 10) {
      notification.warn({
        message: message.title,
        description: message.content,
      });
    }
    if (message.messageLevel == 20) {
      notification.info({
        message: message.title,
        description: message.content,
      });
    }
    if (message.messageLevel == 30) {
      notification.error({
        message: message.title,
        description: message.content,
      });
    }
  }

  function RefreshMessagePanel() {
    try {
      eventBus.emit('opsPane:RefreshMessagePanel', {});
      console.log('接收广播消息RefreshMessagePanel');
    } catch (error) {
      console.log('error', error);
    }
  }

  // { boundBuildingIdList:[],DeviceId:DeviceId }
  function RefreshDeviceStatus(message: any) {
    try {
      eventBus.emit('opsPane:RefreshDeviceStatus', message);
      console.log('接收广播消息RefreshDeviceStatus:' + message);
    } catch (error) {
      console.log('error', error);
    }
  }

  function RefreshPassportKioskMessage(message: any) {
    try {
      eventBus.emit('opsPane:RefreshPassportKioskMessage', message);
      // console.log('接收广播消息RefreshPassportKioskMessage:' + message);
    } catch (error) {
      console.log('error', error);
    }
  }

  return { startConnect, closeConnect };
}
