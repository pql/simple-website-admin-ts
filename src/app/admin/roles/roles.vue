<template>
  <f-dynamic-table
    ref="table"
    type="roles"
    :show-filter="true"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
        <template v-if="record.isDefault">
          <a-divider type="vertical" />
          <a-tag color="#ff9f38">{{ l('AbpIdentity.texts.DisplayName:IsDefault') }}</a-tag>
        </template>
        <template v-if="record.isPublic">
          <a-divider type="vertical" />
          <a-tag color="#4fbf67">{{ l('AbpIdentity.texts.DisplayName:IsPublic') }}</a-tag>
        </template>
        <span v-else></span>
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Roles from './roles';

  export default defineComponent({
    name: 'Roles',
    mixins: [Roles],
  });
</script>

<style lang="less" scoped>
  @import './roles.less';
</style>
