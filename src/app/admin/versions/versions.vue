<template>
  <f-dynamic-table
    ref="table"
    type="versions"
    :show-filter="true"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Versions from './versions';

  export default defineComponent({
    name: 'Versions',
    mixins: [Versions],
  });
</script>

<style lang="less" scoped>
  @import './versions.less';
</style>
