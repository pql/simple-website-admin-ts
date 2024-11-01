<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-contact-type"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ContactType from './contact-type';

  export default defineComponent({
    name: 'PacsContactType',
    mixins: [ContactType],
  });
</script>

<style lang="less" scoped></style>
