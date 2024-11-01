<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-position"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Position from './position';

  export default defineComponent({
    name: 'PacsPosition',
    mixins: [Position],
  });
</script>

<style lang="less" scoped></style>
