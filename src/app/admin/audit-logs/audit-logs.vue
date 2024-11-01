<template>
  <a-tabs class="pl-2" v-model:activeKey="activeKey">
    <a-tab-pane key="1" :tab="l('AbpAuditLogging.texts.AuditLogs')">
      <Logs :activeKey="activeKey" />
    </a-tab-pane>
    <a-tab-pane key="2" :tab="l('AbpAuditLogging.texts.EntityChanges')">
      <Entities />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AuditLogs from './audit-logs';

  export default defineComponent({
    name: 'AuditLogs',
    mixins: [AuditLogs],
  });
</script>

<style lang="less" scoped>
  @import './audit-logs.less';
</style>
