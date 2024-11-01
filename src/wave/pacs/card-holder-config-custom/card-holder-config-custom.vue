<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-card-holder-config-custom"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardHolderConfigCustom from './card-holder-config-custom';

  export default defineComponent({
    name: 'CardHolderConfigCustom',
    mixins: [CardHolderConfigCustom],
  });
</script>

<style lang="less" scoped></style>
