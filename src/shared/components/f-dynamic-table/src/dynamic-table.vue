<template>
  <a-spin :spinning="loading" wrapperClassName="dynamic-table-wrapper">
    <div class="dynamic-table-layout">
      <!-- 工具条 -->
      <slot name="toolbar">
        <div class="toolbar-area" v-if="showTableBar && showToolbar">
          <page-toolbar
            ref="toolbarRef"
            :buttonConfig="toolbarConfig"
            :showButton="showToolbarButton"
            @ready="handleToolbarReady"
            @action-click="handleActionClick"
          />
        </div>
      </slot>

      <div class="dynamic-table-content">
        <!-- 搜索条件 -->
        <div class="search-area" v-if="showFilter">
          <page-filter
            ref="filterRef"
            v-model:value="filterValues"
            :filterConfig="filterConfig"
            :defaultValue="defaultFilterValue"
            @ready="handleFilterReady"
            @show-filters-change="handleShowFiltersChange($event)"
            @search="handleFilterClick($event)"
          />
        </div>

        <!-- 表格 -->
        <page-table
          ref="tableRef"
          class="body-area"
          v-model:pageIndex="tablePageIndex"
          :tableConfig="tableConfig"
          :tableData="tableData"
          :tableScrollY="tableScrollY"
          :rowCheckboxProps="tableRowCheckboxProps"
          :rowKey="rowKey"
          :showActionBtn="showActionBtn"
          @ready="handleTableReady"
          @row-click="rowClick"
          @action-click="handleActionClick"
          @table-change="handleTableChange"
          @page-info-change="handlePageInfoChange"
          @select-change="handleSelectChange"
        >
          <template #headerCell="{ column }">
            <slot name="headerCell" :column="column"></slot>
          </template>
          <template #bodyCell="{ column, record }">
            <slot name="bodyCell" :column="column" :record="record"></slot>
          </template>
        </page-table>

        <!-- 页配置 -->
        <page-config
          v-if="tableConfig && tableConfig.ifShowPersonalization"
          ref="pageConfigRef"
          class="bottom-toolbar-area"
          :type="type"
          :showButton="showPageConfigButton"
          @config-change="handlePageConfigChange"
          @action-click="handlePageConfigClick"
        />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DynamicTable from './dynamic-table';

  export default defineComponent({
    name: 'FDynamicTable',
    mixins: [DynamicTable],
  });
</script>

<style lang="less" scoped>
  @import './dynamic-table.less';
</style>
