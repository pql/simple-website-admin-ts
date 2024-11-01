<template>
  <f-dynamic-table
    ref="table"
    type="accountSecurityLog"
    :show-toolbar="false"
    :show-filter="true"
    :fetch="fetchDataList"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import accountSecurityLogMixin from './accountSecurityLog';

  export default defineComponent({
    name: 'AccountSecurityLog',
    mixins: [accountSecurityLogMixin],
  });
</script>
<style lang="less" scoped></style>
