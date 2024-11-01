import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';

// 配置
import { ICameraPlayOptions } from './interfaces';
import { VideoLiveHelper } from './video-live-helper';
import { VideoPlaybackHelper } from './video-playback-helper';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    /** 播放配置 */
    config: {
      type: Object as PropType<ICameraPlayOptions>,
      require: true,
    },
    /**是否双击放大缩小 */
    isToggleZoom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      connectionTitle: '',
      connectionMessage: '',
      myId: -1,
      liveHelper: new VideoLiveHelper(),
      playbackHelper: new VideoPlaybackHelper(),
      showVideo: true,
      isLive: true,
      playConfig: null as any,
      /** 是否全屏 */
      isFullscreen: false,
      /** 是否缩放 */
      isZoomed: false,
    };
  },
  watch: {
    config(newVal: ICameraPlayOptions, oldVal: ICameraPlayOptions) {
      this.setConfig(newVal);
    },
  },
  mounted() {
    this.setConfig(this.config);
  },
  beforeUnmount() {
    this.destroyAll();
  },
  methods: {
    /** 调整播放配置 */
    setConfig(config: ICameraPlayOptions) {
      if (!config) {
        return;
      }
      this.destroyAll(true).then(() => {
        this.playConfig = config;
        this.connectionTitle = config.deviceName;

        // 空资源不操作
        if (!this.playConfig.deviceId || this.playConfig.deviceId === '') {
          return;
        }
        switch (this.playConfig.mode) {
          case 'live':
          case 'stitching':
          case 'rtsp':
            this.isLive = true;
            this.loadLive();
            break;
          case 'playback':
            this.isLive = false;
            this.loadPlayback();
            break;
        }
      });
    },
    /** 实时数据 */
    loadLive() {
      this.$nextTick(() => {
        if (!this.liveHelper) {
          this.liveHelper = new VideoLiveHelper();
        }

        const remoteVideoElement = this.getLiveVideoRef();

        const {
          mode,
          deviceName,
          deviceId,
          channel,
          isSSL,
          serviceIp,
          servicePort,
          serviceId,
          servicePassword,
        } = this.playConfig;

        this.liveHelper.connect(
          remoteVideoElement,
          deviceName,
          isSSL,
          serviceIp,
          servicePort,
          serviceId,
          servicePassword,
          `${channel}-${mode}`,
          {
            iceServers: [
              {
                urls: this.getIceServers(),
              },
            ],
          },
          (message) => {
            this.connectionMessage = ' : ' + message;
          },
        );
      });
    },
    /** 回放 */
    loadPlayback() {
      this.$nextTick(() => {
        if (!this.playbackHelper) {
          this.playbackHelper = new VideoPlaybackHelper();
        }

        const {
          mode,
          deviceName,
          deviceId,
          channel,
          isSSL,
          serviceIp,
          servicePort,
          serviceId,
          servicePassword,
          dateRange,
        } = this.playConfig;

        const videoElement = this.getPlaybackVideoRef();
        this.playbackHelper.connect(
          videoElement,
          deviceName,
          isSSL,
          serviceIp,
          servicePort,
          serviceId,
          servicePassword,
          `${channel}-${mode}`,
          dateRange,
        );
      });
    },
    /** 释放所有资源占用 */
    destroyAll(reload = false) {
      // 释放
      if (!reload) {
        // 实时
        this.destroyLive();
        // 回放
        this.destroyBack();
        return;
      }

      // 重新加载
      return new Promise<void>((res, rej) => {
        // 实时
        this.destroyLive();
        // 回放
        this.destroyBack();
        // res();
        //video展示
        this.showVideo = false;
        setTimeout(() => {
          this.showVideo = true;
          res();
        }, 500);
      });
    },
    /** 释放实时视频 */
    destroyLive() {
      this.connectionTitle = '';
      this.connectionMessage = '';
      if (this.liveHelper) {
        this.liveHelper.disconnect();
      }
      this.liveHelper = null;
    },
    /** 释放回放视频 */
    destroyBack() {
      this.connectionTitle = '';
      this.connectionMessage = '';
      if (this.playbackHelper) {
        this.playbackHelper.disconnect();
      }
      this.playbackHelper = null;
    },
    /** 实时播放节点 */
    getLiveVideoRef() {
      return this.$refs.liveVideoRef as HTMLVideoElement;
    },
    /** 回放节点 */
    getPlaybackVideoRef() {
      return this.$refs.playbackVideoRef as HTMLVideoElement;
    },
    /** 处理全屏 */
    toggleFullscreen() {
      const elem = this.$refs.fullscreenContainer as any;

      // 全屏
      if (!this.isFullscreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
        this.isFullscreen = true;
        return;
      }

      // 取消全屏
      const doc = document as any;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        /* Safari */
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        /* IE11 */
        doc.msExitFullscreen();
      }
      this.isFullscreen = false;
    },
    /** 缩放 */
    toggleZoom() {
      if (!this.isToggleZoom) {
        return;
      }
      // 缩小
      if (this.isZoomed) {
        const colEl = (this.$refs.fullscreenContainer as any).parentElement as HTMLDivElement;
        const rowEl = colEl.parentElement as HTMLDivElement;
        // 行高设置100%
        rowEl.classList.remove('camera-row-h-100');
        // 列宽设置100%
        colEl.classList.remove('camera-col-w-100');

        // 隐藏除当前项以外的所有节点
        const cols = document.querySelectorAll('.camera-col');
        cols.forEach((item) => {
          if (item !== colEl) {
            item.classList.remove('camera-col-hide');
          }
        });
        this.isZoomed = false;
        if (this.playbackHelper) {
          this.playbackHelper.resize();
        }
        return;
      } else {
        // 放大
        const colEl = (this.$refs.fullscreenContainer as any).parentElement as HTMLDivElement;
        const rowEl = colEl.parentElement as HTMLDivElement;
        // 行高设置100%
        rowEl.classList.add('camera-row-h-100');
        // 列宽设置100%
        colEl.classList.add('camera-col-w-100');

        // 隐藏除当前项以外的所有节点
        const cols = document.querySelectorAll('.camera-col');
        cols.forEach((item) => {
          if (item !== colEl) {
            item.classList.add('camera-col-hide');
          }
        });

        this.isZoomed = true;
        if (this.playbackHelper) {
          this.playbackHelper.resize();
        }
      }
    },
    /** 获取ice server */
    getIceServers() {
      // const val = abp.setting.get('AMS:IceServers');
      // if (!val || val === '') {
      //   abp.log.warn(
      //     'camera ice server is default! stun:stun1.l.google.com:19302,stun:stun2.l.google.com:19305',
      //   );
      //   return ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19305'];
      // }
      const val = 'stun:stun1.l.google.com:19302,stun:stun2.l.google.com:19305';
      return val.split(',');
    },
  },
});
