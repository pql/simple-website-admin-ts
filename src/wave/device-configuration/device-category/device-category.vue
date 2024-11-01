<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="device-category"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
      @fetch-success="handleFetchSuccess"
    >
      <template #bodyCell="{ column, record }">
        <!-- DeviceCategory Name -->
        <template v-if="column.key === 'deviceCategoryName'">
          {{ record.deviceCategoryName }}
          <a-tag v-if="record.isDefault" style="margin-left: 8px" color="#2db7f5">{{
            l('Unified.texts.Default')
          }}</a-tag>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceCategory from './device-category';

  export default defineComponent({
    name: 'SiteConfigurationDeviceCategory',
    mixins: [DeviceCategory],
  });
</script>

<style lang="less" scoped></style>
