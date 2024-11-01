<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-device-access-schedule-group"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    >
      <template #bodyCell="{ column, record }">
        <!-- accessScheduleName -->
        <template v-if="column.key === 'accessScheduleName'">
          {{ record.accessScheduleName }}
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
  import DeviceAccessScheduleGroup from './device-access-schedule-group';

  export default defineComponent({
    name: 'DeviceAccessScheduleGroup',
    mixins: [DeviceAccessScheduleGroup],
  });
</script>

<style lang="less" scoped></style>
