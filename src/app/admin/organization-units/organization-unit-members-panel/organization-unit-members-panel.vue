<template>
  <f-dynamic-table
    type="organization-unit-members"
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
  import OrganizationUnitMembersPanel from './organization-unit-members-panel';

  export default defineComponent({
    name: 'OrganizationUnitMembersPanel',
    mixins: [OrganizationUnitMembersPanel],
  });
</script>

<style scoped lang="less">
  @import './organization-unit-members-panel.less';
</style>
