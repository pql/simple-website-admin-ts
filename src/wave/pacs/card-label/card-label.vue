<template>
  <f-dynamic-table
    ref="table"
    type="pacs-card-label"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardLabel from './card-label';

  export default defineComponent({
    name: 'CardLabel',
    mixins: [CardLabel],
  });
</script>

<style lang="less" scoped></style>
