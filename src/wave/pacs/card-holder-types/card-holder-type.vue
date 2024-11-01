<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-card-holder-type"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardHolderType from './card-holder-type';

  export default defineComponent({
    name: 'PacsCardHolderType',
    mixins: [CardHolderType],
  });
</script>

<style lang="less" scoped></style>
