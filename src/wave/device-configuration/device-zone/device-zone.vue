<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="device-zone"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceZone from './device-zone';

  export default defineComponent({
    name: 'SiteConfigurationDeviceZone',
    mixins: [DeviceZone],
  });
</script>

<style lang="less" scoped></style>
