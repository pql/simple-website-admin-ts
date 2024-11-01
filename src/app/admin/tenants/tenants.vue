<template>
  <f-dynamic-table
    ref="table"
    type="tenant"
    :show-filter="true"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'activationState'">
        <template v-if="record.activationState == 0">
          {{ l('Unified.texts.Active') }}
        </template>
        <template v-if="record.activationState == 1">
          {{ l('Unified.texts.Tenant:ActivationStateName1') }}
        </template>
        <template v-if="record.activationState == 2">
          {{ l('Unified.texts.Tenant:ActivationStateName2') }}
        </template>
      </template>
      <template v-if="column.key === 'activationEndDate'">
        {{ fromUTCDateToLocalDate(record.activationEndDate) }}
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Tenants from './tenants';

  export default defineComponent({
    name: 'Tenants',
    mixins: [Tenants],
  });
</script>

<style lang="less" scoped>
  @import './tenants.less';
</style>
