<template>
  <f-dynamic-table
    type="organization-unit-role"
    ref="table"
    class="dynamic-table"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
    :extraHeight="131"
    :showExport="true"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import OrganizationUnitRolePanel from './organization-unit-role-panel';

  export default defineComponent({
    name: 'OrganizationUnitRolePanel',
    mixins: [OrganizationUnitRolePanel],
  });
</script>

<style lang="less" scoped>
  @import './organization-unit-role-panel.less';
</style>
