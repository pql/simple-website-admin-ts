<template>
  <f-dynamic-table
    ref="table"
    type="securityLog"
    :show-toolbar="false"
    :show-filter="true"
    :fetch="fetchDataList"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import securityLogMixin from './securityLog';

  export default defineComponent({
    name: 'SecurityLog',
    mixins: [securityLogMixin],
  });
</script>
<style lang="less" scoped></style>
