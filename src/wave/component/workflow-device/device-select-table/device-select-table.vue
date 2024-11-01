<template>
  <a-spin :spinning="loading">
    <div>
      <a-table class="customTable" :bordered="true" :scroll="{ y: 410 }" @change="onChange" :pagination="setPagination" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        // //onChange: onSelectChange ,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
        hideSelectAll: hideSelectAll,
      }" :columns="columns" :data-source="data" />
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SitePermissionTreeBase from './device-select-table';

export default defineComponent({
  name: 'device-select-table',
  mixins: [SitePermissionTreeBase],
});
</script>

<style scoped lang="less">
@import './device-select-table.less';
</style>
