// import { localizationService } from '@firebytes/basic-module-vue';
import { useI18n } from '@/hooks/web/useI18n';
const { t: localizationService } = useI18n();
const errors = {
  ConnectionError: 'VideoServerConnectionError',
  ConnectionDisconnect: 'VideoServerConnectionDisconnect',
  ProcessError: 'VideoServerProcessError',
  ProcessErrorItem: 'VideoServerProcessErrorItem',
};

function trace(str: any) {
  // abp.log.debug(str);
}

import { WebRtcPlayback } from './webrtc-playback';
export { WebRtcPlayback as VideoLiveHelper2 };

/** 播放器 */
export class VideoLiveHelper {
  constructor() {
    this.websocket = null as unknown as WebSocket; // 类型断言
    // 初始化其他属性
    this.rtcConfiguration = { iceServers: [] };
    this.myId = -1;
    this.otherPeers = {};
    this.rtcPeerConnection = null as unknown as RTCPeerConnection;
    this.pingInterval = null as unknown as NodeJS.Timer;
    this.connected = false;
    this.videoElement = null as unknown as HTMLVideoElement;
    this.onChange = () => { };
    this.livePlayFunc = () => { };
    this.livePauseFunc = () => { };
  }

  /** 实时连接配置 */
  rtcConfiguration: RTCConfiguration;

  /** 网络连接 */
  websocket: WebSocket | null;

  /** id */
  myId = -1;

  /** ？ */
  otherPeers: { [key: string]: any };

  /** rtc连接 */
  rtcPeerConnection: RTCPeerConnection;

  /** ping计时器 */
  pingInterval: NodeJS.Timer;

  /** 是否已连接 */
  connected: boolean;

  /** 视频元素 */
  videoElement: HTMLVideoElement;

  /** 异常回调 */
  onChange?: ((e: any) => void);
  livePlayFunc?: ((e) => void);
  livePauseFunc?: ((e) => void);

  /**
   * 连接视频服务器
   * @param videoElement 播放的元素
   * @param connectionName 连接名称
   * @param isSSL 是否为ssl
   * @param serviceIp 视频服务器ip
   * @param servicePort 视频服务器端口
   * @param serviceId 视频服务器账号
   * @param servicePassword 视频服务器密码
   * @param channel 连接的通道
   * @param rtcConfiguration 连接的配置
   * @param onChange 发生改变
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
    rtcConfiguration: RTCConfiguration,
    onChange: (message: string) => void,
  ): void {
    this.otherPeers = {};

    this.videoElement = videoElement;
    this.rtcConfiguration = rtcConfiguration;

    this.registerPlayerEvents();

    // 事件回调
    this.onChange = onChange;

    // 连接地址
    const url = this.getConnectionUrl(
      isSSL,
      serviceIp,
      servicePort,
      serviceId,
      servicePassword,
      channel,
    );

    // 连接
    this.signIn(url);
  }

  /** 断开连接 */
  disconnect() {
    if (!this.connected) {
      return;
    }
    this.connected = false;

    // 移除事件监听
    if (this.livePlayFunc) {
      this.videoElement.removeEventListener('play', this.livePlayFunc);
      // this.livePlayFunc = null;
    }

    if (this.livePauseFunc) {
      this.videoElement.removeEventListener('pause', this.livePauseFunc);
      // this.livePauseFunc = null;
    }

    // 重置正在播放标记;
    if (!!this.videoElement) {
      (this.videoElement as any).isPlay = false;
      if (!!this.videoElement.srcObject) {
        this.videoElement.srcObject = null;
      }
    }

    // 移除心跳消息
    if (this.pingInterval != null) {
      clearInterval(this.pingInterval);
      // this.pingInterval = null;
    }

    // 断开rtc连接
    if (!!this.rtcPeerConnection) {
      this.rtcPeerConnection.close();
      // this.rtcPeerConnection = null;
    }

    // 断开连接
    if (this.websocket) {
      if (this.websocket.isClosed !== true) {
        this.websocket.close();
      }

      this.websocket = null;
    }

    // 重置标记
    this.myId = -1;
  }

  /** 注册播放器事件 */
  protected registerPlayerEvents() {
    const self = this;
    // 播放标记
    this.livePlayFunc = function () {
      //播放开始执行的函数
      console.log('开始播放');
      // 设置当前正在播放的标记
      (self.videoElement as any).isPlay = true;
    };
    this.videoElement.addEventListener('play', this.livePlayFunc);

    // 禁止暂停
    this.livePauseFunc = function () {
      // 暂停开始执行的函数
      console.log('暂停播放');
      // 如果当前正在播放，那么继续播放
      if (!!self.videoElement["isPlay"]) {
        try {
          self.videoElement.play();
        } catch (error) {
          console.warn('livePauseFunc videoElement.play() error!', error);
        }
      }
    };
    this.videoElement.addEventListener('pause', this.livePauseFunc);
  }

  protected signIn(url: string) {
    const videoElement = this.videoElement;
    videoElement.play();

    trace('called videoElement.play()');

    this.websocket = new WebSocket(url);
    const websocket = this.websocket;
    websocket.onopen = (e) => {
      this.connected = true;
      trace('Signalling server connected');
    };
    websocket.onclose = (e) => {
      trace('Signalling server disconnected. Code: ' + e.code + ', reason: ' + e.reason);
      if (!!this.websocket) {
        (this.websocket as any).isClosed = true;

        if (this.websocket?.hasError) {
          this.onChange && this.onChange(localizationService(errors.ConnectionError));
        } else {
          this.onChange && this.onChange(localizationService(errors.ConnectionDisconnect));
        }
        this.disconnect();
      }
    };
    websocket.onmessage = (e: any) => {
      try {
        this.handlePeerMessage(e.data);
      } catch (error) {
        this.onChange && this.onChange(localizationService(errors.ProcessError));
      }
    };
    websocket.onerror = (e: any) => {
      // 连接出现错误，不需要触发重连，需要打出提示
      this.websocket.hasError = true;
      trace('signIn websocket.onerror: ' + e.data);
    };
  }

  protected handlePeerMessage(data: string) {
    const self = this;
    let dataJson = JSON.parse(data);
    if (dataJson == null) {
      return;
    }

    const peer_id = parseInt(dataJson.from);
    const str = "Message from |||'" + this.otherPeers[peer_id] + "'||| : " + data;

    if (dataJson['data-type'] == 'peer-list') {
      this.myId = parseInt(dataJson.data[0].id);
      trace('My id: ' + this.myId);
      for (let i = 1; i < dataJson.data.length; i++) {
        trace('Peer ' + i + ': id ' + dataJson.data[i].id + ', name: ' + dataJson.data[i].name);
        this.otherPeers[parseInt(dataJson.data[i].id)] = dataJson.data[i].name;
      }

      this.pingInterval = setInterval(() => {
        this.sendToPeer('ping', 1, null);
      }, 10000);
    } else if (dataJson['data-type'] == 'message') {
      dataJson = dataJson.data;
      if (dataJson != null && dataJson.type != null && dataJson.type == 'offer') {
        trace(str);
        trace('Received SDP offer, preparing answer...');
        this.createPeerConnection(peer_id);
        const pc = this.rtcPeerConnection as any;
        pc.setRemoteDescription(
          new RTCSessionDescription(dataJson),
          this.onRemoteSdpSucces,
          this.onRemoteSdpError,
        );
        pc.createAnswer(
          function (sessionDescription) {
            if (sessionDescription == null) {
              trace('Sending SDP answer (callback): undefined SDP');
            } else {
              pc.setLocalDescription(
                sessionDescription,
                self.onSetLocalSdpSuccess,
                self.onSetLocalSdpError,
              );
              const data = JSON.stringify(sessionDescription);
              trace('Prepared SDP answer (callback): ' + data);
              self.sendToPeer('message', peer_id, data);
            }
          },
          function (error) {
            // error
            trace('Create answer error: ' + error);
            self.onChange && self.onChange(localizationService(errors.ProcessErrorItem, 'Answer'));
          },
        )
          .then(function (sessionDescription) {
            if (sessionDescription == null) {
              trace('Sending SDP answer (then): undefined SDP');
            } else {
              pc.setLocalDescription(
                sessionDescription,
                self.onSetLocalSdpSuccess,
                self.onSetLocalSdpError,
              );
              const data = JSON.stringify(sessionDescription);
              trace('Prepared SDP answer (then): ' + data);
              self.sendToPeer('message', peer_id, data);
            }
          })
          .catch((error) => {
            trace('Create SDP answer error: ' + error);
          });
      } else if (dataJson != null && dataJson.candidate != null) {
        trace(str);
        trace('Adding ICE candidate ' + dataJson.candidate);
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: dataJson.sdpMLineIndex,
          candidate: dataJson.candidate,
        });
        const pc = this.rtcPeerConnection as any;
        pc.addIceCandidate(candidate, this.onAddIceCandidateSuccess, this.onAddIceCandidateError);
      } else {
        trace(str);
        trace('Unsupported message!');
      }
    } else {
      trace(str);
      trace('Unsupported message!');
    }
  }

  protected createPeerConnection(peer_id: any) {
    try {
      const rtcPeerConnection = new RTCPeerConnection(this.rtcConfiguration);
      this.rtcPeerConnection = rtcPeerConnection;
      const pc = rtcPeerConnection as any;
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const candidate = {
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            sdpMid: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          };
          this.sendToPeer('message', peer_id, JSON.stringify(candidate));
        } else {
          trace('End of candidates.');
        }
      };
      pc.onconnecting = (message) => {
        trace('Session connecting.');
      };
      pc.onopen = (message) => {
        trace('Session opened.');
      };
      pc.ontrack = (e) => {
        this.onRemoteStreamAdded(e);
      };
      pc.onremovestream = (event) => {
        trace('Remote stream removed.');
      };
      pc.onidpvalidationerror = function (ev) {
        trace('onidpvalidationerror');
      };
      pc.onidpassertionerror = function (ev) {
        alert('onidpassertionerror');
      };
      pc.onnegotiationneeded = function () {
        trace('onnegotiationneeded');
      };
      pc.onconnectionstatechange = (event) => {
        trace('Connection state changed to ' + pc.connectionState);
      };
      pc.oniceconnectionstatechange = (event) => {
        trace('ICE connection state changed to ' + pc.iceConnectionState);
      };
      pc.onicegatheringstatechange = function () {
        trace('ICE gathering state changed to ' + pc.iceGatheringState);
      };
      pc.onsignalingstatechange = (event) => {
        trace('Signaling state changed to ' + pc.signalingState);
      };
      trace('Created RTCPeerConnection with config: ' + JSON.stringify(this.rtcConfiguration));
    } catch (e) {
      trace('Failed to create PeerConnection, exception: ' + e);
      this.onChange && this.onChange(localizationService(errors.ProcessErrorItem, 'PeerConnection'));
    }
  }

  protected sendToPeer(dataType: string, peer_id: any, data: any) {
    try {
      let dataJson = '{"data-type":"' + dataType + '","from":' + this.myId + ',"to":' + peer_id;
      if (data != null) {
        dataJson += ',"data":' + data;
      }
      dataJson += '}';
      trace('Sending: ' + dataJson);
      this.websocket&&this.websocket.send(dataJson);
    } catch (e: any) {
      trace('send to peer error: ' + e.description);
    }
  }

  protected onRemoteStreamAdded(event: any) {
    trace('Got remote stream');
    try {
      const videoElement = this.videoElement;
      // 音频流，绑定到连接
      if (event.track.kind === 'audio') {
        this.rtcPeerConnection.customAudio = event.track;
        return;
      }
      // 视频流，追加音频流
      if (event.track.kind == 'video') {
        trace(
          'Can play H.264: ' +
          videoElement.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'),
        );
      }
      videoElement.srcObject = event.streams[0];
      trace('Remote stream added: ' + event.track.kind + ', active: ' + event.streams[0].active);
    } catch (e) {
      trace('Remote stream added exception: ' + e);
    }
  }

  protected onRemoteSdpSucces() {
    trace('onRemoteSdpSucces');
  }

  protected onRemoteSdpError(event) {
    trace('onRemoteSdpError: event.name: ' + event.name + ', event.message: ' + event.message);
    this.onChange && this.onChange(localizationService(errors.ProcessErrorItem, 'RemoteDescription'));
  }

  protected onSetLocalSdpSuccess() {
    trace('setLocalDescription success');
  }

  protected onSetLocalSdpError() {
    trace('setLocalDescription failed');
    this.onChange && this.onChange(localizationService(errors.ProcessErrorItem, 'LocalDescription'));
  }

  protected onAddIceCandidateSuccess() {
    trace('addIceCandidate success');
  }

  protected onAddIceCandidateError() {
    trace('addIceCandidate failed');
    this.onChange && this.onChange(localizationService(errors.ProcessErrorItem, 'IceCandidate'));
  }

  /** 获取连接地址 */
  protected getConnectionUrl(
    isSSL: boolean,
    serviceIp: string,
    servicePort: number,
    serviceId: string,
    servicePassword: string,
    channel: string,
  ) {
    // 协议
    let protocol = 'ws';

    if (!!isSSL) {
      protocol = 'wss';
    }

    // 地址
    let url = `${protocol}://${serviceIp}:${servicePort}/rtc/sign_in?`;

    // 设备信息
    if (!!channel && channel.trim() !== '') {
      url += `&channel=${channel}`.replace('-stitching', '');
    }

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
}
