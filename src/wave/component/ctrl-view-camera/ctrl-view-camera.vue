<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ deviceName }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- <a-row>
        <a-col :span="18" style="text-align: left">
          <f-range-picker show-time :allow-clear="false" v-model:value="dateRange" />
          <div style="display: inline-block; padding-left: 3px">
            <a-button type="primary" @click="onGetPlaybackClick()">
              <div>Get Playback</div>
            </a-button>
          </div>
        </a-col>
        <a-col :span="6" style="text-align: right">
          <a-button type="primary" @click="onGetLiveClick()">
            <div>Get Live</div>
          </a-button>
        </a-col>
      </a-row> -->

      <!-- 播放器 -->
      <!-- <br /> -->
      <div style="width: 100%; height: 28vw">
        <camera-item-view v-if="cameraPlayOption" :config="cameraPlayOption" class="camera-item" />
      </div>
      <br />
      <div style="font-weight: 500">
        Current Mode:
        {{ liveMode ? 'Live' : 'Playback' }}
      </div>
      <br />
    </div>
  </a-spin>

  <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#yo-icon-xiugaimima3"></use>
          </svg> -->
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    DeviceService,
    FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto as CameraViewerGetDeviceConfig,
  } from '@/apis';
  import { ICameraPlayOptions } from '/@/wave/component';
  import CameraItemView from '/@/wave/component/camera-item-view/camera-item-view.vue';

  // import { cameraDateTimeService } from '../../shared';
  import idHelper from '@/utils/helper/id-helper';

  export default defineComponent({
    components: { CameraItemView },
    mixins: [ModalComponentBase],
    props: {
      /** 设备id */
      deviceId: {
        type: String,
        default: '',
      },
      /** 设备名称 */
      deviceName: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        liveMode: true,
        // dateRange: cameraDateTimeService.getDefaultDateRange(),
        dateRange: [],
        deviceConfig: {} as CameraViewerGetDeviceConfig,
        cameraPlayOption: null as any,
      };
    },
    mounted() {
      this.getDeviceInfo();
    },
    methods: {
      getDeviceInfo() {
        // this.deviceConfig = {
        //   mode: 'live',
        //   deviceName: 'willaim-Camera',
        //   deviceId: 'e4798a94-a0a5-46ac-baab-6101c173e069',
        //   channel: 'e4798a94-a0a5-46ac-baab-6101c173e069',
        //   serviceIp: 'streamingserver.hk.com.sg',
        //   servicePort: 80,
        //   serviceId: 'admin',
        //   servicePassword: 'admin',
        //   isSSL: false,
        // };
        // this.onGetLiveClick();
        // return;
        DeviceService.postApiAppDeviceCameraViewerGetDeviceServiceConfig({
          input: this.deviceId,
        }).then((deviceConfig: CameraViewerGetDeviceConfig) => {
          if (deviceConfig.serviceIp == null) {
            this.message.error('There is no online video server');
            return;
          }

          this.deviceConfig = deviceConfig;
          this.onGetLiveClick();
        });
      },
      /** 创建播放器配置 */
      createCameraPlayOptions(deviceConfig: CameraViewerGetDeviceConfig = {}) {
        // 根据option中deviceid获取deviceConfig
        const options: ICameraPlayOptions = {
          id: idHelper.getId(),
          mode: this.liveMode ? 'live' : 'playback',
          deviceId: deviceConfig.id ?? '',
          deviceName: deviceConfig.deviceName ?? '',
          channel: deviceConfig.deviceId ?? '',
          serviceIp: deviceConfig.serviceIp ?? '',
          servicePort: deviceConfig.servicePort,
          serviceId: deviceConfig.serviceId ?? '',
          servicePassword: deviceConfig.servicePassword ?? '',
          dateRange: [...this.dateRange],
          isSSL: deviceConfig.isEnableSSL,
        };
        return options;
      },

      /** 实时数据 */
      onGetLiveClick() {
        this.liveMode = true;
        this.cameraPlayOption = this.createCameraPlayOptions(this.deviceConfig);
      },
      /** 回放 */
      onGetPlaybackClick() {
        this.liveMode = false;
        this.cameraPlayOption = this.createCameraPlayOptions(this.deviceConfig);
      },
    },
  });
</script>

<!-- <style lang="less">
  @import '../../../../node_modules/video.js/dist/video-js.css';
</style> -->
