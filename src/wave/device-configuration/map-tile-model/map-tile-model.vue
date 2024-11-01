<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="map-tile-model"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MapTileModel from './map-tile-model';

  export default defineComponent({
    name: 'SiteConfigurationDesignMapTileModel',
    mixins: [MapTileModel],
  });
</script>

<style lang="less" scoped></style>
