import moment from 'moment';

import videojs from 'video.js';
import { useTimezone } from '@/timezones/useTimezone';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat, isISO8601Date } = useTimezone();
export class VideoPlaybackHelper {
  constructor() {}

  private player: any;

  /**
   * 连接到回放服务器
   * @param connectionName 链接名称
   * @param videoElement 视频元素
   * @param isSSL 是否ssl
   * @param serviceIp 视频服务器ip
   * @param servicePort 视频服务器端口
   * @param serviceId 视频服务器账号
   * @param servicePassword 视频服务器密码
   * @param channel 连接的通道
   * @param dateRange 回放的时间范围
   */
  connect(
    videoElement: HTMLVideoElement,
    connectionName: string,
    isSSL: boolean,
    serviceIp: string,
    servicePort: number,
    serviceId: string,
    servicePassword: string,
    channel: string,
    dateRange: [],
  ): void {
    const url = this.getConnectionUrl(
      isSSL,
      serviceIp,
      servicePort,
      serviceId,
      servicePassword,
      channel,
      dateRange,
    );

    this.player = videojs(videoElement, {
      title: connectionName,
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [{ type: 'application/x-mpegURL', src: url }],
      userActions: {
        doubleClick: false,
      },
    });

    // 同步尺寸
    this.player.dimensions();
    this.player.ready((e) => {
      this.player.off('dblclick');
    });
  }

  /** 断开连接 */
  disconnect() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  /** 刷新尺寸 */
  resize() {
    if (!this.player) {
      return;
    }
    this.player.dimensions();
  }

  /** 获取连接地址 */
  protected getConnectionUrl(
    isSSL: boolean,
    serviceIp: string,
    servicePort: number,
    serviceId: string,
    servicePassword: string,
    channel: string,
    dateRange: any[],
  ) {
    // 协议
    let protocol = 'http';
    if (isSSL) {
      protocol = 'https';
    }
    // http://' + service + '/hls/
    // 地址
    let url = `${protocol}://${serviceIp}:${servicePort}/hls`;

    // 设备信息
    url += `/${channel}`.replace('-playback', '-vod');

    // 时间
    const dateRangeStr = this.getDateRangeValueString(dateRange);
    const startDate = dateRangeStr[0];
    const endDate = dateRangeStr[1];
    url += `?isplayback=true&starttime=${startDate}&endtime=${endDate}`;

    // 账号
    if (!!serviceId && serviceId.trim() !== '') {
      url += `&username=${serviceId}`;
    }
    // 密码
    if (!!servicePassword && servicePassword.trim() !== '') {
      url += `&password=${servicePassword}`;
    }

    return url;
  }

  /** 获取时间范围回调字符串 */
  getDateRangeValueString(dateRange: any[] = []): string[] {
    if (!Array.isArray(dateRange) || dateRange.length !== 2) {
      dateRange = this.getDefaultDateRange();
    }
    // 处理时间范围为utc
    const dateArr = [] as any;
    for (let i = 0; i < dateRange.length; i++) {
      const item = dateRange[i];
      if (!isISO8601Date(item)) {
        dateArr[i] = fromLocalDateToUTCDateFormat(item);
      } else {
        dateArr[i] = item;
      }
      dateArr[i] = dateArr[i].replace('.000', '').replace(/-/g, '').replace(/:/g, '');
    }
    console.log('dateArr', dateArr);
    return dateArr;
  }
  getDefaultDateRange(): any[] {
    const timestamp = Date.now();
    const rangeStart = moment(timestamp - 60 * 65 * 1000).format('YYYY-MM-DD HH:mm:ss');
    const rangeEnd = moment(timestamp - 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
    return [rangeStart, rangeEnd];
  }
}
