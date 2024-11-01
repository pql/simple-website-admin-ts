<template>
  <f-dynamic-table
    ref="table"
    type="openIddictScopes"
    :show-filter="true"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ScopesMixin from './scopes';

  export default defineComponent({
    name: 'Scopes',
    mixins: [ScopesMixin],
  });
</script>
<style lang="less" scoped></style>
