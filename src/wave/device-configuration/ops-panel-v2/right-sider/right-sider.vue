<template>
  <div class="right-sider-wrapper">
    <DeviceTabs ref="deviceTabsRef" class="device-tabs" />
    <AlertList ref="alertListRef" class="alert-list" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import RightSider from './right-sider';

  export default defineComponent({
    name: 'OpsPanelRightSider',
    mixins: [RightSider],
  });
</script>

<style lang="less" scoped>
  @import './right-sider.less';
</style>
