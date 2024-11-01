<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="interface-service"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import InterfaceService from './interface-service';

  export default defineComponent({
    name: 'SiteConfigurationInterfaceService',
    mixins: [InterfaceService],
  });
</script>

<style lang="less" scoped></style>
