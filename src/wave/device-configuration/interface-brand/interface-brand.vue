<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="interface-brand"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import InterfaceBrand from './interface-brand';

  export default defineComponent({
    name: 'SiteConfigurationInterfaceBrand',
    mixins: [InterfaceBrand],
  });
</script>

<style lang="less" scoped></style>
