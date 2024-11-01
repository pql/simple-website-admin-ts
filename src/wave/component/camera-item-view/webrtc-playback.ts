function trace(str: any) {
  abp.log.debug(str);
}

/** 播放器 */
export class WebRtcPlayback {
  constructor() {}

  /** 网络连接 */
  websocket: WebSocket;

  /** 视频名称 */
  localName: string;

  /** 账号 */
  userName?: string;

  /** 密码 */
  passwrod?: string;

  /** 视频服务器 */
  server: string;

  /** id */
  myId = -1;

  /** ？ */
  otherPeers: { [key: string]: any };

  /** rtc连接 */
  pc: RTCPeerConnection;

  /** 实时连接配置 */
  pcConfig: RTCConfiguration;

  /** ping计时器 */
  pingInterval: NodeJS.Timer;

  /** 是否断开连接 */
  disconnecting: boolean;

  /** 视频元素 */
  videoElement: HTMLVideoElement;

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
  ) {
    this.videoElement = videoElement;
    this.pcConfig = rtcConfiguration;
    this.otherPeers = {};
    const url = this.getConnectionUrl(
      isSSL,
      serviceIp,
      servicePort,
      serviceId,
      servicePassword,
      channel,
    );
    this.signIn(url);
  }

  /** 连接 */
  connect2(options: any) {
    this.videoElement = options.videoElement;
    this.pcConfig = options.pcConfig;
    this.server = options.server;
    this.localName = options.localName;
    this.userName = options.userName;
    this.passwrod = options.passwrod;
    this.otherPeers = {};

    if (this.localName.length === 0) {
      abp.message.error('I need a name please.');
      return;
    }

    this.signIn2();
  }

  /** 断开连接 */
  disconnect() {
    this.disconnecting = true;

    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }

    if (this.pingInterval != null) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    this.myId = -1;
    this.disconnecting = false;
  }

  protected signIn(url: string) {
    try {
      const videoElement = this.videoElement;
      videoElement.play();
      trace('called videoElement.play()');

      // const url = this.getConnectionUrl();
      this.websocket = new WebSocket(url);
      const websocket = this.websocket;
      websocket.onopen = (e) => {
        trace('Signalling server connected');
      };
      websocket.onclose = (e) => {
        trace('Signalling server disconnected. Code: ' + e.code + ', reason: ' + e.reason);
        if (!this.disconnecting) {
          this.disconnect();
        }
      };
      websocket.onmessage = (e: any) => {
        this.handlePeerMessage(e.data);
      };
      websocket.onerror = (e: any) => {
        trace('signIn websocket.onerror: ' + e.data);
      };
    } catch (e: any) {
      trace('signIn error: ' + e.description);
    }
  }

  protected signIn2() {
    try {
      const videoElement = this.videoElement;
      videoElement.play();
      trace('called videoElement.play()');

      const url = this.getConnectionUrl2();
      this.websocket = new WebSocket(url);
      const websocket = this.websocket;
      websocket.onopen = (e) => {
        trace('Signalling server connected');
      };
      websocket.onclose = (e) => {
        trace('Signalling server disconnected. Code: ' + e.code + ', reason: ' + e.reason);
        if (!this.disconnecting) {
          this.disconnect();
        }
      };
      websocket.onmessage = (e: any) => {
        this.handlePeerMessage(e.data);
      };
      websocket.onerror = (e: any) => {
        trace('signIn websocket.onerror: ' + e.data);
      };
    } catch (e: any) {
      trace('signIn error: ' + e.description);
    }
  }

  protected handlePeerMessage(data: string) {
    const self = this;
    let dataJson = JSON.parse(data);
    if (dataJson == null) {
      return;
    }

    const peer_id = parseInt(dataJson.from);
    const str = "Message from '" + this.otherPeers[peer_id] + "': " + data;

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
        const pc = this.pc as any;
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
        const pc = this.pc as any;
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
      const pcInstace = new RTCPeerConnection(this.pcConfig);
      this.pc = pcInstace;
      const pc = pcInstace as any;
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
      trace('Created RTCPeerConnection with config: ' + JSON.stringify(this.pcConfig));
    } catch (e) {
      trace('Failed to create PeerConnection, exception: ' + e);
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
      this.websocket.send(dataJson);
    } catch (e: any) {
      trace('send to peer error: ' + e.description);
    }
  }

  protected onRemoteStreamAdded(event: any) {
    trace('Got remote stream');
    try {
      const videoElement = this.videoElement;
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
  }

  protected onSetLocalSdpSuccess() {
    trace('setLocalDescription success');
  }

  protected onSetLocalSdpError() {
    trace('setLocalDescription failed');
  }

  protected onAddIceCandidateSuccess() {
    trace('addIceCandidate success');
  }

  protected onAddIceCandidateError() {
    trace('addIceCandidate failed');
  }

  /** 获取连接地址 */
  protected getConnectionUrl2() {
    let url = this.server + '/sign_in?channel=' + this.localName;
    if (this.userName && this.userName.trim() !== '') {
      url += `&username=${this.userName}&password=${this.passwrod}`;
    }
    return url;
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
