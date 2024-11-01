<template>
  <f-dynamic-table
    ref="table"
    type="claimTypes"
    :show-filter="true"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import claimTypesMixin from './claimTypes';

  export default defineComponent({
    name: 'ClaimTypes',
    mixins: [claimTypesMixin],
  });
</script>
<style lang="less" scoped></style>
