<template>
  <f-dynamic-table
    ref="table"
    type="auditlog"
    :show-filter="true"
    :extra-height="62"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <!-- 是否已激活 -->
      <template v-if="column.key === 'url'">
        <a-tag :color="STATUS_COLORS[record.httpStatusCode] || '#4fbf67'">{{
          record.httpStatusCode
        }}</a-tag>
        <a-tag :color="METHOD_COLORS[record.httpMethod] || '#4fbf67'">{{
          record.httpMethod
        }}</a-tag>
        <span class="tmepUrl">{{ record.url }}</span>
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Logs from './logs';

  export default defineComponent({
    name: 'Logs',
    mixins: [Logs],
  });
</script>

<style lang="less" scoped>
  @import './logs.less';
</style>
