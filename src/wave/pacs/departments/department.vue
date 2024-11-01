<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-department"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Department from './department';

  export default defineComponent({
    name: 'PacsDepartment',
    mixins: [Department],
  });
</script>

<style lang="less" scoped></style>
