<template>
  <a-cascader
    :placeholder="placeholder"
    v-model:value="location"
    :options="options"
    change-on-select
    @change="selectedChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ProvinceCityArea from './province-city-area';

  export default defineComponent({
    name: 'FProvinceCityArea',
    mixins: [ProvinceCityArea],
  });
</script>

<style lang="less" scoped>
  @import './province-city-area.less';
</style>
