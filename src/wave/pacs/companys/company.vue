<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-company"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Company from './company';

  export default defineComponent({
    name: 'PacsCompany',
    mixins: [Company],
  });
</script>

<style lang="less" scoped></style>
