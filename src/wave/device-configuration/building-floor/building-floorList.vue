<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="building-floor"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BuildingFloorList from './building-floorList';

  export default defineComponent({
    name: 'SiteConfigurationPropertyBuildingFloor',
    mixins: [BuildingFloorList],
  });
</script>

<style lang="less" scoped></style>
