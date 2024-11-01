<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ deviceName }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <div style="margin: 20px; text-align: center">
        <a-button type="primary" @click="onOnClick()">
          <!-- <i class="fa fa-lightbulb"></i> -->
          <!-- <div style="display: inline-block;padding-left: 3px;">On</div> -->
          <div>On</div>
        </a-button>
        <div style="display: inline-block; width: 30px"></div>
        <a-button danger @click="onOffClick()">
          <!-- <i class="fa fa-lightbulb"></i> -->
          <!-- <div style="display: inline-block;padding-left: 3px;">Off</div> -->
          <div>Off</div>
        </a-button>
      </div>
    </div>
  </a-spin>

  <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#yo-icon-xiugaimima3"></use>
          </svg> -->
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  export default defineComponent({
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
    methods: {
      /** 开启 */
      onOnClick() {
        this.loading = true;
        setTimeout(() => {
          this.notify.success(`Light   [${this.deviceName}] on success!`);
          this.loading = false;
          this.success(false);
        }, 1000);
      },
      /** 关闭 */
      onOffClick() {
        this.loading = true;
        setTimeout(() => {
          this.notify.success(`Light   [${this.deviceName}] off success!`);
          this.loading = false;
          this.success(true);
        }, 1000);
      },
    },
  });
</script>
