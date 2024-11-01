<template>
  <a-spin :spinning="loading">
    <div class="modal-header" style="margin: 0">
      <div class="modal-title">
        {{ deviceName }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body" style="text-align: center">
      <div
        v-for="deviceTypeFunction in deviceTypeFunctionData"
        style="margin: 15px; margin-bottom: 20px"
      >
        <!-- <a-button type="primary" @click="onUnlockClick()">
          <div style="display: inline-block;padding-left: 3px;">Unlock</div>
        </a-button> -->
        <!-- <div style="margin: 5px;text-align: left;">:</div> -->
        <a-button @click="onClick(deviceTypeFunction)" style="width: 100%">
          <div> {{ deviceTypeFunction.deviceFunction }}</div>
        </a-button>
      </div>
    </div>
  </a-spin>

  <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#yo-icon-xiugaimima3"></use>
          </svg> -->
</template>

<script lang="ts">
  import { CTRL_VIEW_DICT } from '../../component';
  // import DeviceDetail from '../device-detail/device-detail.vue'
  // import   IndoorTrackingUsers from '../indoor-tracking-people-nearby-user/indoor-tracking-people-nearby-user.vue'

  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  // import {
  //   ControlPanelServiceProxy,
  //   ExecuteDeviceTypeFunctionRequest,
  //   GetDeviceTypeFunctionByDeviceIdOutput
  // } from '/@/shared/service-proxies';
  export default defineComponent({
    mixins: [ModalComponentBase],
    // components:{DeviceDetail},
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
      /** 控制面板地点id */
      contorlPanelId: {
        type: String,
        default: '',
      },
      deviceTypeFunctionData: {
        type: Array,
        default: [] as GetDeviceTypeFunctionByDeviceIdOutput[],
      },
    },
    data() {
      return {
        ControlPanelServiceProxy: new ControlPanelServiceProxy(),
      };
    },
    mounted() {},
    methods: {
      onClick(deviceTypeFunction) {
        switch (deviceTypeFunction.buttonAction) {
          case 'Send Command':
            this.executeDeviceTypeFunctionRquest(deviceTypeFunction.deviceTypeFunctionId);
            break;
          case 'Camera View':
            this.cameraView();
            break;
          case 'Status View':
            this.statusView();
            break;
          case 'People Nearby View':
            this.peopleNearbyView();
            break;
          default:
            break;
        }
      },
      peopleNearbyView() {
        this.modalHelper
          .create(
            IndoorTrackingUsers,
            {
              deviceId: this.deviceId,
              showToolbar: false,
              contorlPanelId: this.contorlPanelId,
            },
            { width: 1300 },
          )
          .subscribe((res) => {
            if (!res) return;
          });
        this.success();
      },
      cameraView() {
        var deviceCtrlViewDef = CTRL_VIEW_DICT['camera'];
        this.modalHelper
          .create(
            deviceCtrlViewDef.component,
            {
              deviceId: this.deviceId,
              deviceName: this.deviceName,
            },
            { width: deviceCtrlViewDef.width },
          )
          .subscribe((res) => {
            if (!res) return;
          });
        this.success();
      },
      statusView() {
        this.modalHelper
          .create(
            DeviceDetail,
            {
              deviceId: this.deviceId,
            },
            { width: 1300 },
          )
          .subscribe((res) => {
            if (!res) return;
          });
        this.success();
      },
      executeDeviceTypeFunctionRquest(deviceTypeFunctionId) {
        var request = new ExecuteDeviceTypeFunctionRequest();
        request.deviceId = this.deviceId;
        request.deviceTypeFunctionId = deviceTypeFunctionId;
        this.loading = true;
        this.ControlPanelServiceProxy.executeDeviceTypeFunction(request)
          .finally(() => {})
          .then((res) => {
            this.loading = false;
            this.success(res);
          });
      },
    },
  });
</script>
