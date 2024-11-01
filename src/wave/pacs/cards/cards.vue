<template>
  <f-dynamic-table
    ref="table"
    type="pacs-card"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Cards from './cards';

  export default defineComponent({
    name: 'PacsCards',
    mixins: [Cards],
  });
</script>

<style lang="less" scoped></style>
