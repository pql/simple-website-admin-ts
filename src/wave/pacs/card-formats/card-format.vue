<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-card-format"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardFormat from './card-format';

  export default defineComponent({
    name: 'CardFormat',
    mixins: [CardFormat],
  });
</script>

<style lang="less" scoped></style>
