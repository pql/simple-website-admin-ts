<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="buildings"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BuildingList from './buildingList';

  export default defineComponent({
    name: 'SiteConfigurationPropertyBuilding',
    mixins: [BuildingList],
  });
</script>

<style lang="less" scoped></style>
