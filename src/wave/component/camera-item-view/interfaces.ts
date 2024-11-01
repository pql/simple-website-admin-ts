import { DateTime } from 'luxon';

export interface ICameraPlayOptions {
  /** 唯一标识 */
  id: string;
  /** 设备 id */
  deviceId: string;
  /** 播放通道 */
  channel: string;
  /** 设备名称 */
  deviceName: string;
  /** 是否为ssl */
  isSSL?: boolean;
  /** 服务ip */
  serviceIp?: string;
  /** 服务端口 */
  servicePort?: number;
  /** 服务账号 */
  serviceId?: string;
  /** 服务密码 */
  servicePassword?: string;
  /** 回放时间范围 */
  dateRange?: DateTime[];
  /** 播放模式 */
  mode: 'live' | 'playback' | 'stitching' | 'rtsp';
}
