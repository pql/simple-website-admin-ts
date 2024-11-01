<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="device-brand"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceBrand from './device-brand';

  export default defineComponent({
    name: 'SiteConfigurationDeviceBrand',
    mixins: [DeviceBrand],
  });
</script>

<style lang="less" scoped></style>
