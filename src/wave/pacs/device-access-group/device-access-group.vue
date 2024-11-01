<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-device-access-group"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    >
      <template #bodyCell="{ column, record }"> </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceAccessGroup from './device-access-group';

  export default defineComponent({
    name: 'DeviceAccessGroup',
    mixins: [DeviceAccessGroup],
  });
</script>

<style lang="less" scoped></style>
