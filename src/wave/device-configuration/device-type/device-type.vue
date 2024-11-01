<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="device-type"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceType from './device-type';

  export default defineComponent({
    name: 'SiteConfigurationDeviceType',
    mixins: [DeviceType],
  });
</script>

<style lang="less" scoped></style>
