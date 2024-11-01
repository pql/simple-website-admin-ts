<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-card-holder-status"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardHolderStatus from './card-holder-status';

  export default defineComponent({
    name: 'PacsCardHolderStatus',
    mixins: [CardHolderStatus],
  });
</script>

<style lang="less" scoped></style>
