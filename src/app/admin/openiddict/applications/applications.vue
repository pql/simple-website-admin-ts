<template>
  <f-dynamic-table
    ref="table"
    type="openIddictApp"
    :show-filter="true"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ApplicationsListMixin from './applications';

  export default defineComponent({
    name: 'ApplicationsList',
    mixins: [ApplicationsListMixin],
  });
</script>
<style lang="less" scoped></style>
