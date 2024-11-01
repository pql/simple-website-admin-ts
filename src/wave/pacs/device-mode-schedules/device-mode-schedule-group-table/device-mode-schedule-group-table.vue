<template>
  <a-spin :spinning="loading" wrapperClassName="dynamic-table-wrapper">
    <div class="header-container" ref="headerContainer">
      <a-card :bordered="false">
        <!-- 工具条 -->
        <a-space class="mb-5">
          <a-button
            type="primary"
            @click="select"
            v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Create')"
          >
            <plus-outlined />
            <span>{{ l('Unified.texts.Create') }}</span>
          </a-button>

          <a-button
            type="primary"
            @click="copy"
            v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Create')"
          >
            <plus-outlined />
            <span>{{ l('Unified.texts.Copy') }}</span>
          </a-button>

          <a-button
            type="error"
            @click="batchDelete"
            v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.BatchDelete')"
          >
            <i class="iconfont icon-f-delete mr-2" style="font-size: 14px"></i>
            <span>{{ l('Unified.texts.Delete') }}</span>
          </a-button>
        </a-space>

        <a-form :layout="'vertical'" @submit.prevent="getPageData">
          <a-form-item class="mb-3.5">
            <a-input-search
              name="filterText"
              @search="getPageData"
              enterButton
              v-model:value="search"
            />
          </a-form-item>
        </a-form>
      </a-card>
      <div class="my-1.5 mx-1.5">
        <!-- 表格 -->
        <a-table
          ref="tables"
          class="customTable"
          :bordered="true"
          :scroll="{ y: `calc(100vh - 280px)` }"
          :pagination="false"
          rowKey="id"
          :dataSource="list"
          :columns="columns"
          :row-selection="rowSelection"
          :customRow="customRow"
        />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceModeScheduleGroupTable from './device-mode-schedule-group-table';

  export default defineComponent({
    name: 'DeviceModeScheduleGroupTable',
    mixins: [DeviceModeScheduleGroupTable],
  });
</script>

<style lang="less" scoped>
  :deep(.ant-card-body) {
    padding: 6px;
  }

  :deep(.ant-table-body) {
    width: 100%;
    height: calc(100vh - 280px);
  }
</style>
