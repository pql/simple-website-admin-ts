<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="passport-kiosk-message-panel"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PassportKioskMessagePanel from './passport-kiosk-message-panel';

  export default defineComponent({
    name: 'PassportKioskMessagePanel',
    mixins: [PassportKioskMessagePanel],
  });
</script>

<style lang="less" scoped></style>
