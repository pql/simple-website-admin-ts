<template>
  <f-dynamic-table
    ref="table"
    type="building-floor-model"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BuildingFloorModel from './building-floor-model';

  export default defineComponent({
    name: 'SiteConfigurationDesignBuildingFloorModel',
    mixins: [BuildingFloorModel],
  });
</script>

<style lang="less" scoped></style>
