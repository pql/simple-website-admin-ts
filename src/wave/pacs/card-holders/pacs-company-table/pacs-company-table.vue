<template>
  <a-spin :spinning="loading" wrapperClassName="dynamic-table-wrapper">
    <div class="dynamic-table-layout">
      <!-- 工具条 -->
      <a-button class="mb-4" type="primary" @click="selectCards">
        <plus-outlined />
        <span>{{ l('Create') }}</span>
      </a-button>
      <a-button class="mb-4 ml-4" type="error" @click="batchDelete"> 
        <i class="iconfont icon-f-delete mr-2" style="font-size: 14px;" />
        <span>{{ l('AbpOpenIddict.texts.Permission:Delete') }}</span>
      </a-button>


      <div class="dynamic-table-content">
        <!-- 表格 -->
        <a-table ref="tables" rowKey="id" size="small" class="customTable" :bordered="true" :scroll="{ y: '230x' }"
          :dataSource="list" :columns="columns" :row-selection="rowSelection" />
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PacsCompanyTable from './pacs-company-table';

export default defineComponent({
  name: 'PacsCompanyTable',
  mixins: [PacsCompanyTable],
});
</script>

<style lang="less" scoped></style>
