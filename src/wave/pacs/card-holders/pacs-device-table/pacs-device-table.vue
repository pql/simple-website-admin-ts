<template>
  <a-spin :spinning="loading" wrapperClassName="dynamic-table-wrapper">
    <div class="dynamic-table-layout">
      <!-- 工具条 -->
      <f-btn
        class="mb-4"
        type="primary"
        :text="l('Unified.texts.Select')"
        icon="yo-icon-xinjian"
        @click="selectCards"
      />
      <f-btn
        class="mb-4 ml-4"
        ghost
        type="error"
        :text="l('AbpOpenIddict.texts.Permission:Delete')"
        icon="yo-icon-shanchu3"
        @click="batchDelete"
      />

      <div class="dynamic-table-content">
        <!-- 表格 -->
        <a-table
          ref="tables"
          size="small"
          rowKey="deviceId"
          class="customTable"
          :bordered="true"
          :scroll="{ y: `calc(100vh - 420px)` }"
          :dataSource="list"
          :columns="columns"
          :row-selection="rowSelection"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'pacsDeviceAccessScheduleGroupId'">
              <f-select
                style="width: 100%"
                name="accessScheduleGroup"
                v-model:value="record.pacsDeviceAccessScheduleGroupId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="deviceAccessGroupDataSource"
              />
            </template>
            <template v-if="column.key === 'startDateTime'">
              <f-date-picker
                show-time
                class="w-full"
                name="dateOfBirth"
                v-model:value="record.startDateTime"
              />
            </template>
            <template v-if="column.key === 'endDateTime'">
              <f-date-picker
                show-time
                class="w-full"
                name="dateOfBirth"
                v-model:value="record.endDateTime"
              />
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PacsDeviceTable from './pacs-device-table';

  export default defineComponent({
    name: 'PacsDeviceTable',
    mixins: [PacsDeviceTable],
  });
</script>

<style lang="less" scoped></style>
