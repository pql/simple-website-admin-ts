<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-public-holiday"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PublicHoliday from './public-holiday';

  export default defineComponent({
    name: 'PublicHoliday',
    mixins: [PublicHoliday],
  });
</script>

<style lang="less" scoped></style>
